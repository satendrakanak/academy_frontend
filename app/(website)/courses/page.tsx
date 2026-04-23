import { CourseCard } from "@/components/courses/course-card";
import { CoursesBanner } from "@/components/layout/courses-banner";
import { courses } from "@/data/courses";
import { courseServerService } from "@/services/courses/course.server";
import { Course } from "@/types/course";

export default async function CoursesPage() {
  let courses: Course[] = [];
  try {
    const response = await courseServerService.getAll();
    courses = response.data.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      {/* HERO */}
      <CoursesBanner />

      {/* COURSES GRID */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
