"use client";

import * as z from "zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { SlugField } from "../slug-field";
import { toast } from "sonner";
import { courseClientService } from "@/services/courses/course.client";

const schema = z.object({
  title: z.string().min(3, "Title required"),
  slug: z.string().min(3, "Slug required"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSuccess?: (courseId: string) => void;
}

export const CreateCourseForm = ({ onSuccess }: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const title = form.watch("title");
  const slug = form.watch("slug");

  // 🔥 auto slug (initial only)
  useEffect(() => {
    if (!slug) {
      const generated = title
        ?.toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");

      form.setValue("slug", generated, { shouldValidate: true });
    }
  }, [title]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await courseClientService.create(data);
      onSuccess?.(response.data.id);
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
    <div className="w-full max-w-none">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Create Course</h2>
        <p className="text-sm text-muted-foreground">
          Start by giving your course a name
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">
        <FieldGroup>
          {/* Title */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  placeholder="e.g. React Mastery"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {title.length > 0 && (
            <SlugField
              title={title}
              value={slug}
              onChange={(val) =>
                form.setValue("slug", val, { shouldValidate: true })
              }
            />
          )}
        </FieldGroup>

        {/* Footer */}
        <div className="flex justify-end">
          <SubmitButton
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
            className="w-auto px-6"
          >
            Create & Continue
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
