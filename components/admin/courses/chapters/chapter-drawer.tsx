import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Chapter } from "@/types/chapter";
import { SubmitButton } from "@/components/submit-button";
import RichEditor from "@/components/editor/rich-editor";
import { toast } from "sonner";
import { FileUpload } from "@/components/media/file-upload";
import { FileType } from "@/types/file";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/helper/handle-api-error";
const schema = z.object({
  title: z.string().min(3, "Title required"),
  description: z.string().optional(),
});

interface ChapterDrawerProps {
  chapter: Chapter;
  index: number; // 🔥 add this
  activeId: string | null;
  setActiveId: (id: string) => void;
  openModal: () => void;
}

export default function ChapterDrawer({
  chapter,
  activeId,
  setActiveId,
  openModal,
  index,
}: ChapterDrawerProps) {
  if (!chapter) return null;

  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  const router = useRouter();

  const form = useForm<z.input<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: chapter.title || "",
      description: chapter.description || "",
    },
  });

  const handleFileUpload = async (file: FileType) => {
    try {
      // await courseClientService.update(course.id, {
      //   imageId: file.id,
      //   imageAlt: file.name || "",
      // });

      setSelectedFile(file);
      toast.success("Image Updated");
      router.refresh();
    } catch (err) {
      handleApiError(err);
    }
  };

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: z.input<typeof schema>) => {
    try {
      //   const response = await courseClientService.create(data);
      //   onSuccess?.(response.data.id);
      form.reset();
    } catch (error: unknown) {
      let message = "Something went wrong";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <Drawer key={chapter.id} direction="right">
      <DrawerTrigger asChild>
        <div
          key={chapter.id}
          onClick={() => {
            setActiveId(chapter.id);
            // openDrawer();
          }}
          className={`p-2 rounded cursor-pointer text-xs border ${
            activeId === chapter.id
              ? "bg-primary/10 border-primary"
              : "hover:bg-muted"
          }`}
        >
          {chapter.title || `Untitled ${index + 1}`}
        </div>
      </DrawerTrigger>
      <DrawerContent className="ml-auto h-full w-200 max-w-5xl! sm:max-w-4xl flex flex-col">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle>Edit Chapter</DrawerTitle>
          <DrawerDescription>Manage course chapters details</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">
          <div className="no-scrollbar overflow-y-auto p-4">
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
                  <RichEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />

              <FileUpload
                label="Chapter Video"
                previewType="video"
                value={selectedFile}
                onUpload={handleFileUpload}
              />
            </FieldGroup>

            {/* Footer */}
            <div className="flex justify-end"></div>
          </div>
          <DrawerFooter className="flex-row justify-end gap-2 border-t pt-4">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>

            <SubmitButton
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
              className="w-auto px-6"
            >
              Update
            </SubmitButton>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
