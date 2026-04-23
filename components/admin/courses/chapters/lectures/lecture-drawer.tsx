"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "sonner";
import { FileUpload } from "@/components/media/file-upload";
import { FileType } from "@/types/file";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/helper/handle-api-error";
import { Switch } from "@/components/ui/switch";
import { lectureSchema } from "@/schemas/courses";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { CheckCircle, Download, Loader, RotateCcw, Trash2 } from "lucide-react";
import { Lecture } from "@/types/lecture";
import { lectureClientService } from "@/services/lectures/lecture.client";
import { Textarea } from "@/components/ui/textarea";
import { attachmentClientService } from "@/services/attachments/attachment.client";
import { Attachment } from "@/types/attachment";
import Link from "next/link";

interface LectureDrawerProps {
  lecture: Lecture;
  index: number;
  activeId: number | null;
  chapterId: number;
  setActiveId: (id: number) => void;
  onTooglePublish: (id: number, isPublished: boolean) => void;
  onDelete: (id: number) => void;
  dragHandle?: {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap;
  };
}

export default function LectureDrawer({
  lecture,
  activeId,
  setActiveId,
  chapterId,
  index,
  onTooglePublish,
  onDelete,
  dragHandle,
}: LectureDrawerProps) {
  const [selectedVideo, setSelectedVideo] = useState<FileType | null>();
  const [selectedFiles, setSelectedFiles] = useState<Attachment[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const router = useRouter();

  const form = useForm<z.input<typeof lectureSchema>>({
    resolver: zodResolver(lectureSchema),
    mode: "onChange",
    defaultValues: {
      title: lecture.title || "",
      description: lecture.description || "",
      isFree: lecture.isFree || false,
    },
  });
  useEffect(() => {
    form.reset({
      title: lecture.title || "",
      description: lecture.description || "",
      isFree: lecture.isFree || false,
    });

    setSelectedVideo(lecture.video || null);
    if (lecture?.attachments) {
      setSelectedFiles(lecture.attachments);
    }
  }, [lecture]);
  const handleVideoFileUpload = async (file: FileType) => {
    try {
      setSelectedVideo(file);
      toast.success("Video uploaded");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleAttachmentFileUpload = async (file: FileType) => {
    try {
      const isPersisted = !lecture?.isTemp;

      let createdAttachment = null;

      // ✅ Only if lecture DB me hai
      if (isPersisted) {
        createdAttachment = await attachmentClientService.create({
          lectureId: lecture.id,
          fileId: file.id,
          name: file.name,
        });
      }

      // 🔥 UI always update
      setSelectedFiles((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: file.name,
          file,
          isTemp: !isPersisted,
        } as any,
      ]);

      if (isPersisted) {
        router.refresh();
      }

      toast.success("Attachment added");
    } catch (err) {
      handleApiError(err);
    }
  };
  const handleRemoveAttachment = async (id: number) => {
    try {
      setLoadingId(id);

      // 🔥 UI se turant hata (optimistic)
      setSelectedFiles((prev) => prev.filter((f) => f.id !== id));

      // 🔥 check karo ye existing attachment hai ya new
      const existingAttachment = lecture.attachments?.find((a) => a.id === id);

      if (existingAttachment) {
        await attachmentClientService.delete(id);
      }

      toast.success("Attachment removed");
      router.refresh();
    } catch (error) {
      handleApiError(error);

      // ❗ rollback (optional but pro level)
      // setSelectedFiles(prev => [...prev, removedFile]);
    } finally {
      setLoadingId(null);
    }
  };

  const isTemp = lecture.isTemp;

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: z.input<typeof lectureSchema>) => {
    try {
      const { isPublished, ...rest } = data;
      const payload = {
        ...rest,
        chapterId,
        videoId: selectedVideo?.id,
      };

      let response;

      if (!isTemp) {
        // UPDATE
        response = await lectureClientService.update(lecture.id, payload);
        toast.success("Chapter updated");
      } else {
        // CREATE
        response = await lectureClientService.create(payload);
        toast.success("Chapter created");
      }

      const existingAttachments = lecture.attachments || [];
      const selected = selectedFiles || [];

      // ✅ Separate temp & persisted
      const tempFiles = selected.filter((f) => f.isTemp);
      const persistedSelected = selected.filter((f) => !f.isTemp);

      // ✅ Compare ONLY persisted ones
      const existingFileIds = existingAttachments.map((a) => a.id);
      const persistedFileIds = persistedSelected.map((f) => f.file.id);

      const newFiles = [
        ...tempFiles,
        ...persistedSelected.filter(
          (f) => !existingFileIds.includes(f.file.id),
        ),
      ];

      const removedFiles = existingAttachments.filter(
        (a) => !persistedFileIds.includes(a.id),
      );

      console.log("New files", newFiles);
      console.log("Removed files", removedFiles);
      console.log("Lecture", lecture.id);

      // ✅ CREATE (only if needed)
      if (newFiles.length > 0) {
        await Promise.all(
          newFiles.map((file) =>
            attachmentClientService.create({
              lectureId: response.data.id || lecture.id,
              fileId: file.file.id,
              name: file.file.name,
            }),
          ),
        );
      }

      // ✅ DELETE (only if needed)
      if (removedFiles.length > 0) {
        await Promise.all(
          removedFiles.map((file) => attachmentClientService.delete(file.id)),
        );
      }
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Drawer key={lecture.id} direction="right">
      <div
        className={`p-2 rounded border text-xs flex items-center justify-between transition-colors ${
          lecture.isPublished
            ? activeId === lecture.id
              ? "bg-green-100 border-green-400"
              : "bg-green-50 border-green-300"
            : activeId === lecture.id
              ? "bg-muted border-primary"
              : "hover:bg-muted border-border"
        }`}
      >
        {/* 🔥 DRAG HANDLE */}
        {dragHandle && (
          <div className="flex items-center justify-start gap-2 mr-1">
            <span
              {...dragHandle.attributes}
              {...dragHandle.listeners}
              onClick={(e) => e.stopPropagation()}
              className="cursor-grab text-muted-foreground text-sm leading-none flex items-center"
            >
              ☰
            </span>
          </div>
        )}
        {/* LEFT → Title (click = open drawer) */}
        <DrawerTrigger asChild>
          <div
            onClick={() => setActiveId(lecture.id)}
            className="flex-1 cursor-pointer text-xs font-medium text-foreground truncate flex items-center h-full"
          >
            {lecture.title || `Untitled ${index + 1}`}
          </div>
        </DrawerTrigger>

        {/* RIGHT → Actions */}
        <div className="flex items-center shrink-0">
          {/* 🟢 Published LIST → only Unpublish */}
          {lecture.isPublished && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTooglePublish(lecture.id, false);
              }}
              className="p-1 rounded hover:bg-red-50 text-red-600 transition cursor-pointer"
              title="Unpublish"
            >
              <RotateCcw className="size-3" />
            </button>
          )}

          {/* ⚪ Normal LIST */}
          {!lecture.isPublished && (
            <>
              {/* Publish */}
              {!lecture.isPublished && !isTemp && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTooglePublish(lecture.id, true);
                  }}
                  className="p-1 rounded hover:bg-green-50 text-green-600 transition cursor-pointer"
                  title="Publish"
                >
                  <CheckCircle className="size-3" />
                </button>
              )}

              {/* Delete */}
              {!lecture.isPublished && !isTemp && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(lecture.id);
                  }}
                  className="p-1 rounded hover:bg-red-50 text-red-500 transition cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="size-3" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <DrawerContent className="ml-auto h-full w-100 max-w-4xl! sm:max-w-4xl flex flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <DrawerHeader className="border-b pb-4">
            <div className="flex items-center justify-between w-full gap-4">
              {/* LEFT */}
              <div className="min-w-0">
                <DrawerTitle className="font-semibold">
                  {isTemp ? "Add New" : "Edit"} Lecture
                </DrawerTitle>
                <DrawerDescription>
                  Manage chapters lecture details
                </DrawerDescription>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3 shrink-0">
                <Controller
                  name="isFree"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        You want to make this lecture free?
                      </span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="cursor-pointer"
                      />
                    </div>
                  )}
                />

                <SubmitButton
                  type="submit"
                  disabled={!isValid}
                  loading={isSubmitting}
                  className="w-auto shrink-0 px-4"
                >
                  {!isTemp ? "Update" : "Create"}
                </SubmitButton>
              </div>
            </div>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <FieldGroup>
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder="e.g. Introduction of the course"
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="e.g. What you will learn in this chapter"
                    className="h-24"
                  />
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FileUpload
                  label="Lecture Video"
                  previewType="video"
                  value={selectedVideo || lecture.video}
                  onUpload={handleVideoFileUpload}
                  className="aspect-video w-full"
                />
                <div className="space-y-3">
                  <FileUpload
                    label="Lecture Attachments"
                    previewType="file"
                    onUpload={(file) => handleAttachmentFileUpload(file)}
                    className="w-full"
                  />

                  {/* 🔥 Attachment List */}
                  {selectedFiles.length > 0 ? (
                    <div className="space-y-2">
                      {selectedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-3 p-2 border rounded-md bg-muted/30 hover:bg-muted/50 transition"
                        >
                          {/* ICON */}
                          <div className="text-sm">
                            {file.file?.mime?.startsWith("image") && "🖼️"}
                            {file.file?.mime?.startsWith("video") && "🎥"}
                            {file.file?.mime?.includes("pdf") && "📄"}
                            {!file.file?.mime && "📎"}
                          </div>

                          {/* NAME */}
                          <div className="flex-1 text-xs truncate font-medium">
                            {file.name}
                          </div>

                          {/* ACTIONS */}
                          <div className="flex items-center gap-2">
                            {/* DOWNLOAD */}
                            {file.file?.path && (
                              <Link
                                href={file.file.path}
                                target="_blank"
                                className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-1 rounded transition"
                                title="Download"
                              >
                                <Download className="size-3" />
                              </Link>
                            )}

                            {/* REMOVE */}
                            <button
                              type="button"
                              onClick={() => handleRemoveAttachment(file.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 rounded transition"
                              title="Remove"
                            >
                              {loadingId === file.id ? (
                                <Loader className="size-3 animate-spin" />
                              ) : (
                                <Trash2 className="size-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 🔥 EMPTY STATE
                    <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-6 text-center bg-muted/20">
                      <div className="text-3xl mb-2">📎</div>
                      <p className="text-sm font-medium text-muted-foreground">
                        No attachments added yet
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Upload files to support your lecture
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </FieldGroup>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
