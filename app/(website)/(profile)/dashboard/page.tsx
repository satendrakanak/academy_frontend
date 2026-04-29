import { userServerService } from "@/services/users/user.server";
import { courseServerService } from "@/services/courses/course.server";
import { getSession } from "@/lib/auth";
import { Course } from "@/types/course";
import DashboardClient from "@/components/profile/dashboard-client";
import { WeeklyProgress } from "@/types/user";
import { getErrorMessage } from "@/lib/error-handler";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;
  let stats = { courses: 0, completed: 0, progress: 0 };
  let courses: Course[] = [];
  let weeklyProgress: WeeklyProgress[] = [];

  try {
    const [statsRes, coursesRes, weeklyProgressRes] = await Promise.all([
      userServerService.getDashboardStats(session.id),
      userServerService.getEnrolledCourses(session.id),
      userServerService.getWeeklyProgress(session.id),
    ]);

    stats = statsRes.data;
    courses = coursesRes.data;
    weeklyProgress = weeklyProgressRes.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back 👋</h2>
        <p className="text-gray-500 text-sm">
          Keep learning and track your progress
        </p>
      </div>

      {/* 👇 client widget */}
      <DashboardClient
        stats={stats}
        courses={courses}
        weeklyProgress={weeklyProgress}
      />
    </div>
  );
}
