"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CourseCard } from "../courses/course-card";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Course } from "@/types/course";
import { DashboardStats, WeeklyProgress } from "@/types/user";
import { Order } from "@/types/order";
import { OrderHistory } from "./order-history";
import { ExamHistoryRecord } from "@/types/exam";
import { ExamHistory } from "./exam-history";

interface DashboardClientProps {
  stats: DashboardStats;
  courses: Course[];
  weeklyProgress: WeeklyProgress[];
  orders: Order[];
  examHistory: ExamHistoryRecord[];
}

export default function DashboardClient({
  stats,
  courses,
  weeklyProgress,
  orders,
  examHistory,
}: DashboardClientProps) {
  const ProgressChart = dynamic(
    () => import("@/components/profile/progress-chart"),
    { ssr: false },
  );
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Courses Completed"
          value={`${stats.completed}/${stats.courses}`}
          description="Completed courses out of your total active enrollments."
        />
        <StatCard
          title="Average Progress"
          value={`${stats.progress}%`}
          description="Overall learning momentum across enrolled courses."
          highlight
        />
        <StatCard
          title="Exam Attempts"
          value={stats.examsTaken}
          description="Total final exam submissions across your courses."
        />
        <StatCard
          title="Exams Passed"
          value={stats.examsPassed}
          description="Final exams you have cleared successfully."
        />
        <StatCard
          title="Certificates"
          value={stats.certificatesEarned}
          description="Certificates unlocked after completion milestones."
        />
      </div>

      <div className="h-90">
        <ProgressChart weeklyProgress={weeklyProgress} />
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] md:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--brand-700)">
              Continue Learning
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Pick up where you left off
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Resume your latest courses, keep the streak alive, and move one step
            closer to completion.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[26px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <div className="text-5xl mb-4">📚</div>

            <h3 className="mb-2 text-xl font-semibold">No courses yet</h3>

            <p className="mb-6 max-w-md text-gray-500">
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
          <div className="grid gap-4 md:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] md:p-6">
        <OrderHistory
          orders={orders}
          enrolledCourses={courses}
          limit={2}
          showViewAll
        />
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] md:p-6">
        <ExamHistory records={examHistory} />
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
  description,
  highlight = false,
}: {
  title: string;
  value: string | number;
  description: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={`overflow-hidden rounded-[28px] border shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] ${
        highlight
          ? "border-(--brand-100) bg-[linear-gradient(135deg,var(--brand-50),#ffffff)]"
          : "border-slate-200 bg-white"
      }`}
    >
      <CardContent className="p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          {title}
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          {value}
        </p>
        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
