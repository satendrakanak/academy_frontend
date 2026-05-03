import { CourseCard } from "@/components/courses/course-card";
import { getSession } from "@/lib/auth";
import { getErrorMessage } from "@/lib/error-handler";
import { userServerService } from "@/services/users/user.server";
import { Course } from "@/types/course";
import Link from "next/link";

export default async function MyCoursesPage() {
  const session = await getSession();
  if (!session) return null;

  let enrolledCourses: Course[] = [];

  try {
    const response = await userServerService.getEnrolledCourses(session?.id);
    enrolledCourses = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div className="min-h-[60vh]">
      {/* 🔵 Title */}
      <h2 className="mb-6 text-2xl font-semibold dark:text-white">My Courses</h2>

      {/* ❌ EMPTY STATE */}
      {enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white p-10 text-center shadow dark:border-white/10 dark:bg-white/6 dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
          <div className="text-5xl mb-4">📚</div>

          <h3 className="mb-2 text-xl font-semibold dark:text-white">No courses yet</h3>

          <p className="mb-6 max-w-md text-gray-500 dark:text-slate-300">
            You haven’t enrolled in any courses yet. Start learning something
            new today 🚀
          </p>

          <Link
            href="/courses"
            className="rounded-lg bg-primary px-6 py-3 text-white transition hover:opacity-90"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        /* ✅ COURSE GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
