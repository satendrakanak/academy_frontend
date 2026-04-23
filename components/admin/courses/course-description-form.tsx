"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { courseDescriptionSchema } from "@/schemas/courses";
import { Course } from "@/types/course";
import { courseClientService } from "@/services/courses/course.client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/editor/rich-editor";

interface CourseDescriptionProps {
  course: Course;
}
export const CourseDescription = ({ course }: CourseDescriptionProps) => {
  const [error, setError] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof courseDescriptionSchema>>({
    resolver: zodResolver(courseDescriptionSchema),
    mode: "onChange",
    defaultValues: {
      description: course.description || "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof courseDescriptionSchema>) => {
    try {
      await courseClientService.update(course.id, data);
      router.refresh();
      toast.success("Course description updated successfully");
    } catch (error: unknown) {
      let message = "Something went wrong";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <Card className="rounded-2xl border bg-white shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold">Course Description</h3>
          <p className="text-sm text-muted-foreground">
            Update your course description
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RichEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {error ? (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
                {error}
              </div>
            ) : (
              <div />
            )}

            <SubmitButton
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
              className="w-auto px-6"
              loadingText="Updating..."
            >
              Update
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
