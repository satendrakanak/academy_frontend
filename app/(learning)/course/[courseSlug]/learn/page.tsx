import { notFound, redirect } from "next/navigation";

import { Course } from "@/types/course";
import { courseServerService } from "@/services/courses/course.server";
import { LearnClient } from "@/components/course/learn/learn-client";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  // 🔥 future: fetch course from API
  const { courseSlug } = await params;

  if (!courseSlug) {
    notFound();
  }

  let course: Course;

  try {
    const response = await courseServerService.getBySlug(courseSlug);
    course = response.data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        redirect("/login");
      }

      if (error.message === "NOT_FOUND") {
        notFound();
      }
    }

    throw error;
  }

  return <LearnClient course={course} />;
}
