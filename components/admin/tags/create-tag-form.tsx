"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { tagsSchema } from "@/schemas/courses";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify";
import { useEffect } from "react";
import { Tag } from "@/types/tag";
import { tagClientService } from "@/services/tags/tag.client";
import { getErrorMessage } from "@/lib/error-handler";

interface CreateTagFormProps {
  tag?: Tag;
}

export const CreateTagForm = ({ tag }: CreateTagFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof tagsSchema>>({
    resolver: zodResolver(tagsSchema),
    mode: "onChange",
    defaultValues: {
      name: tag?.name || "",
      description: tag?.description || "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // 🔥 reset on category change
  useEffect(() => {
    form.reset({
      name: tag?.name || "",
      description: tag?.description || "",
    });
  }, [tag]);

  // 🔥 MAIN LOGIC
  const onSubmit = async (data: z.infer<typeof tagsSchema>) => {
    try {
      const payload = {
        name: data.name,
        slug: slugify(data.name),
        description: data.description,
      };

      if (tag?.id) {
        // 🔥 UPDATE
        await tagClientService.update(tag.id, payload);
        toast.success("Tag updated successfully");
      } else {
        // 🔥 CREATE
        await tagClientService.create(payload);
        toast.success("Tag created successfully");
        form.reset();
      }

      router.refresh();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <FieldGroup>
        {/* 🔥 TITLE */}
        <h3 className="text-sm font-semibold">Tag Name</h3>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} placeholder="Tag name" className="h-10" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* 🔥 DESCRIPTION */}
        <h3 className="text-sm font-semibold">Tag Description</h3>
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                placeholder="Tag description"
                className="min-h-28"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* 🔥 FOOTER */}
      <div className="flex items-center justify-end">
        <SubmitButton
          type="submit"
          disabled={!isValid}
          loading={isSubmitting}
          className="px-6"
        >
          {tag?.id ? "Update" : "Create"}
        </SubmitButton>
      </div>
    </form>
  );
};
