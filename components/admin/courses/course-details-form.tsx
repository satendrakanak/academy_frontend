"use client";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseDetailsSchema } from "@/schemas/courses";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { courseClientService } from "@/services/courses/course.client";
import { Course } from "@/types/course";
import { Input } from "@base-ui/react";
import { SubmitButton } from "@/components/submit-button";

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
          value?.trim() ? value : undefined,
        ]),
      );

      await courseClientService.update(course.id, payload);

      router.refresh();
      toast.success("Course details updated successfully");
    } catch (error: unknown) {
      let message = "Something went wrong";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-5 space-y-4">
      <h3 className="text-sm font-semibold">Course Details</h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Duration */}
          <Controller
            name="duration"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Duration"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />

          {/* Mode */}
          <Controller
            name="mode"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Mode"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />

          {/* Experience */}
          <Controller
            name="experienceLevel"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Experience Level"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />

          {/* Language */}
          <Controller
            name="language"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Language"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />

          {/* Certificate */}
          <Controller
            name="certificate"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Certificate"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />

          {/* Exams */}
          <Controller
            name="exams"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Exams"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />

          {/* Study Material */}
          <Controller
            name="studyMaterial"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Study Material"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />

          {/* Book */}
          <Controller
            name="additionalBook"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Additional Book"
                className="h-9 w-full border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
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
    </div>
  );
};
