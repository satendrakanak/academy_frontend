"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Course } from "@/types/course";

export const TestimonialsFilterBar = ({
  courses,
}: {
  courses: Course[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = (next: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}${params.toString() ? `?${params}` : ""}`);
    });
  };

  return (
    <div className="rounded-[28px] border border-[var(--brand-100)] bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Filter testimonials
          </p>
          <p className="text-sm text-slate-500">
            Browse written reviews or watch video stories course-wise.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <NativeSelect
            aria-label="Filter by testimonial type"
            className="w-full sm:w-52"
            value={searchParams.get("type") || "all"}
            onChange={(e) => updateFilters({ type: e.target.value })}
          >
            <NativeSelectOption value="all">All Types</NativeSelectOption>
            <NativeSelectOption value="TEXT">Text Testimonials</NativeSelectOption>
            <NativeSelectOption value="VIDEO">Video Testimonials</NativeSelectOption>
          </NativeSelect>

          <NativeSelect
            aria-label="Filter by course"
            className="w-full sm:w-72"
            value={searchParams.get("courseId") || "all"}
            onChange={(e) => updateFilters({ courseId: e.target.value })}
          >
            <NativeSelectOption value="all">All Courses</NativeSelectOption>
            {courses.map((course) => (
              <NativeSelectOption key={course.id} value={String(course.id)}>
                {course.title}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() =>
              startTransition(() => {
                router.push(pathname);
              })
            }
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
