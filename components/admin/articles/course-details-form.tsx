"use client";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseDetailsSchema } from "@/schemas/courses";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { courseClientService } from "@/services/courses/course.client";
import { Course } from "@/types/course";
import { SubmitButton } from "@/components/submit-button";
import { getErrorMessage } from "@/lib/error-handler";

interface CourseDetailsFormProps {
  course: Course;
}

export const CourseDetailsForm = ({ course }: CourseDetailsFormProps) => {
  const router = useRouter();

  const form = useForm<z.input<typeof courseDetailsSchema>>({
    resolver: zodResolver(courseDetailsSchema),
    mode: "onChange",
    defaultValues: {
      duration: course.duration ?? "",
      mode: course.mode ?? "",
      experienceLevel: course.experienceLevel ?? "",
      language: course.language ?? "",
      certificate: course.certificate ?? "",
      exams: course.exams ?? "",
      studyMaterial: course.studyMaterial ?? "",
      additionalBook: course.additionalBook ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.input<typeof courseDetailsSchema>) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value?.trim() ? value : "",
        ]),
      );

      await courseClientService.update(course.id, payload);

      router.refresh();
      toast.success("Course details updated successfully");
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[rgba(11,18,32,0.98)]">
      <h3 className="text-sm font-semibold text-slate-950 dark:text-white">Course Details</h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Controller
            name="duration"
            control={form.control}
            render={({ field }) => (
              <Field label="Duration">
                <Input {...field} placeholder="Duration" />
              </Field>
            )}
          />

          <Controller
            name="mode"
            control={form.control}
            render={({ field }) => (
              <Field label="Mode">
                <Input {...field} placeholder="Mode" />
              </Field>
            )}
          />

          <Controller
            name="experienceLevel"
            control={form.control}
            render={({ field }) => (
              <Field label="Experience level">
                <Input {...field} placeholder="Experience level" />
              </Field>
            )}
          />

          <Controller
            name="language"
            control={form.control}
            render={({ field }) => (
              <Field label="Language">
                <Input {...field} placeholder="Language" />
              </Field>
            )}
          />

          <Controller
            name="certificate"
            control={form.control}
            render={({ field }) => (
              <Field label="Certificate">
                <Input {...field} placeholder="Certificate" />
              </Field>
            )}
          />

          <Controller
            name="exams"
            control={form.control}
            render={({ field }) => (
              <Field label="Exams">
                <Input {...field} placeholder="Exams" />
              </Field>
            )}
          />

          <Controller
            name="studyMaterial"
            control={form.control}
            render={({ field }) => (
              <Field label="Study material">
                <Input {...field} placeholder="Study material" />
              </Field>
            )}
          />

          <Controller
            name="additionalBook"
            control={form.control}
            render={({ field }) => (
              <Field label="Additional book">
                <Input {...field} placeholder="Additional book" />
              </Field>
            )}
          />
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-4 dark:border-white/10">
          <SubmitButton
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
            className="w-auto bg-[var(--brand-600)] px-6 text-white hover:bg-[var(--brand-700)]"
            loadingText="Updating..."
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
