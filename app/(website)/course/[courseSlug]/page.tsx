import Container from "@/components/container";
import { CourseHero } from "@/components/course/course-hero";
import { CourseSidebarCard } from "@/components/course/course-sidebar-card";
import { CourseTabs } from "@/components/course/course-tabs";
import { RelatedCourses } from "@/components/course/related-courses";
import { getErrorMessage } from "@/lib/error-handler";
import { courseServerService } from "@/services/courses/course.server";
import { testimonialServerService } from "@/services/testimonials/testimonial.server";
import { Course } from "@/types/course";
import { Testimonial } from "@/types/testimonial";
import { notFound } from "next/navigation";

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
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  let relatedCourses: Course[] = [];
  try {
    const response = await courseServerService.getRealtedCourses(course.id);
    relatedCourses = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  let testimonials: Testimonial[] = [];
  try {
    const response = await testimonialServerService.getPublic({
      courseId: course.id,
      limit: 6,
    });
    testimonials = response.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div className="relative bg-gray-100">
      {/* HERO */}
      <CourseHero course={course} />

      <Container>
        <div className="flex gap-10 items-start">
          {/* LEFT */}
          <div className="flex-1 max-w-4xl mt-10">
            <CourseTabs course={course} testimonials={testimonials} />
          </div>

          {/* RIGHT */}
          <div className="sticky top-30 w-100 -mt-120 z-40">
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
