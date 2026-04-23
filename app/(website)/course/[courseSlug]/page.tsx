import Container from "@/components/container";
import { CourseHero } from "@/components/course/course-hero";
import { CourseSidebarCard } from "@/components/course/course-sidebar-card";
import { CourseTabs } from "@/components/course/course-tabs";
import { RelatedCourses } from "@/components/course/related-courses";
import { courseServerService } from "@/services/courses/course.server";
import { Course } from "@/types/course";
import { notFound, redirect } from "next/navigation";

export default async function CourseSlugPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
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

  let relatedCourses: Course[] = [];
  try {
    const response = await courseServerService.getAll();
    relatedCourses = response.data.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="relative bg-gray-100">
      {/* HERO */}
      <CourseHero course={course} />

      <Container>
        <div className="flex gap-10 items-start">
          {/* LEFT */}
          <div className="flex-1 max-w-4xl mt-10">
            <CourseTabs course={course} />
          </div>

          {/* RIGHT */}
          <div className="sticky top-30 w-100 -mt-120 z-50">
            <CourseSidebarCard course={course} />
          </div>
        </div>
      </Container>

      <Container>
        <RelatedCourses courses={relatedCourses} />
      </Container>
    </div>
  );
}
