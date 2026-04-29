"use client";

import * as z from "zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { testimonialSchema } from "@/schemas/testimonial";
import { testimonialClientService } from "@/services/testimonials/testimonial.client";
import { Testimonial } from "@/types/testimonial";
import { FileType } from "@/types/file";
import { getErrorMessage } from "@/lib/error-handler";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileUpload } from "@/components/media/file-upload";
import { SubmitButton } from "@/components/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateTestimonialFormProps {
  testimonial?: Testimonial;
  onSuccess?: () => void;
}

export const CreateTestimonialForm = ({
  testimonial,
  onSuccess,
}: CreateTestimonialFormProps) => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<FileType | null>(
    testimonial?.avatar || null,
  );
  const [avatarAlt, setAvatarAlt] = useState(testimonial?.avatarAlt || "");
  const [selectedVideo, setSelectedVideo] = useState<FileType | null>(
    testimonial?.video || null,
  );

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    mode: "onChange",
    defaultValues: {
      type: testimonial?.type || "TEXT",
      name: testimonial?.name || "",
      designation: testimonial?.designation || "",
      company: testimonial?.company || "",
      message: testimonial?.message || "",
      rating: testimonial?.rating || 5,
      isActive: testimonial?.isActive ?? true,
    },
  });

  const { isValid, isSubmitting } = form.formState;
  const testimonialType = useWatch({
    control: form.control,
    name: "type",
  });

  const onSubmit = async (data: z.infer<typeof testimonialSchema>) => {
    try {
      if (data.type === "VIDEO" && !selectedVideo?.id) {
        toast.error("Please upload a video testimonial");
        return;
      }

      const payload = {
        type: data.type,
        name: data.name,
        designation: data.designation?.trim() || undefined,
        company: data.company?.trim() || undefined,
        message: data.type === "TEXT" ? data.message?.trim() : undefined,
        rating: data.rating,
        avatarId: selectedAvatar?.id,
        avatarAlt: avatarAlt.trim() || data.name,
        videoId: data.type === "VIDEO" ? selectedVideo?.id : undefined,
        isActive: data.isActive,
      };

      if (testimonial?.id) {
        await testimonialClientService.update(testimonial.id, payload);
        toast.success("Testimonial updated successfully");
      } else {
        await testimonialClientService.create(payload);
        toast.success("Testimonial created successfully");
        form.reset({
          type: "TEXT",
          name: "",
          designation: "",
          company: "",
          message: "",
          rating: 5,
          isActive: true,
        });
        setSelectedAvatar(null);
        setAvatarAlt("");
        setSelectedVideo(null);
      }

      router.refresh();
      onSuccess?.();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleAvatarUpload = async (file: FileType, alt: string) => {
    setSelectedAvatar(file);
    setAvatarAlt(alt);
  };

  const handleVideoUpload = async (file: FileType) => {
    setSelectedVideo(file);
  };

  return (
    <div className="w-full max-w-none">
      <div>
        <h4 className="text-sm font-semibold">
          {testimonial?.id ? "Edit Testimonial" : "Create Testimonial"}
        </h4>
        <p className="text-xs text-muted-foreground">
          Add student or customer feedback for the website.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
        <FieldGroup>
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Testimonial Type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Select testimonial type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEXT">Text Testimonial</SelectItem>
                    <SelectItem value="VIDEO">Video Testimonial</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  placeholder="e.g. Priya Sharma"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              name="designation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Designation</FieldLabel>
                  <Input
                    {...field}
                    placeholder="e.g. Nutrition Student"
                    className="h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Company / Institute</FieldLabel>
                  <Input
                    {...field}
                    placeholder="e.g. Unitus Academy"
                    className="h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="rating"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Rating</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  min={1}
                  max={5}
                  placeholder="5"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FileUpload
            label="Avatar"
            previewType="image"
            value={selectedAvatar}
            onUpload={handleAvatarUpload}
            className="h-40"
          />

          {testimonialType === "TEXT" ? (
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Testimonial Text</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Write the testimonial content here..."
                    className="min-h-36"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ) : (
            <FileUpload
              label="Testimonial Video"
              previewType="video"
              value={selectedVideo}
              onUpload={handleVideoUpload}
              className="h-40"
            />
          )}

          <Controller
            name="isActive"
            control={form.control}
            render={({ field }) => (
              <Field
                orientation="horizontal"
                className="items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <FieldLabel>Active status</FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    Only active testimonials should be shown on the website.
                  </p>
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <SubmitButton
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
            className="w-auto px-6"
          >
            {testimonial?.id ? "Update" : "Create"}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
