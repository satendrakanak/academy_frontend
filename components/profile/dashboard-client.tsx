"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CourseCard } from "../courses/course-card";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Course } from "@/types/course";
import { DashboardStats, WeeklyProgress } from "@/types/user";

interface DashboardClientProps {
  stats: DashboardStats;
  courses: Course[];
  weeklyProgress: WeeklyProgress[];
}

export default function DashboardClient({
  stats,
  courses,
  weeklyProgress,
}: DashboardClientProps) {
  const ProgressChart = dynamic(
    () => import("@/components/profile/progress-chart"),
    { ssr: false },
  );
  return (
    <>
      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Courses" value={stats.courses} />
        <StatCard title="Completed" value={stats.completed} />
        <StatCard title="Progress" value={`${stats.progress}%`} />
      </div>

      {/* 📈 Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-4">Weekly Progress</h3>

          <div className="h-48">
            <ProgressChart weeklyProgress={weeklyProgress} />
          </div>
        </CardContent>
      </Card>

      {/* 🎓 Continue Learning */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow p-10 border border-dashed">
            <div className="text-5xl mb-4">📚</div>

            <h3 className="text-xl font-semibold mb-2">No courses yet</h3>

            <p className="text-gray-500 mb-6 max-w-md">
              You haven’t enrolled in any courses yet. Start learning something
              new today 🚀
            </p>

            <Link
              href="/courses"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
