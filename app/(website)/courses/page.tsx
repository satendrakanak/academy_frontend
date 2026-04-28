import Container from "@/components/container";
import { CouponBulkClient } from "@/components/coupon/coupon-bulk-client";
import { CourseCard } from "@/components/courses/course-card";
import { CoursesBanner } from "@/components/layout/courses-banner";
import { getErrorMessage } from "@/lib/error-handler";
import { courseServerService } from "@/services/courses/course.server";
import { Course } from "@/types/course";

export default async function CoursesPage() {
  let courses: Course[] = [];

  try {
    const response = await courseServerService.getPopularCourses();
    courses = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
  return (
    <div>
      {/* HERO */}
      <CoursesBanner />

      {/* COURSES GRID */}
      <section className="py-20 bg-gray-50">
        <Container>
          <CouponBulkClient courses={courses} />
        </Container>
      </section>
    </div>
  );
}
