"use client";

import Link from "next/link";
import { ArrowRight, Clock3, Lock, Sparkles } from "lucide-react";
import { Course } from "@/types/course";
import { ExamHistoryRecord } from "@/types/exam";
import { ExamHistory } from "./exam-history";

interface ExamsViewProps {
  courses: Course[];
  examHistory: ExamHistoryRecord[];
}

export function ExamsView({ courses, examHistory }: ExamsViewProps) {
  const attemptedCourseIds = new Set(examHistory.map((item) => item.course.id));

  const upcomingExams = courses
    .filter((course) => course.exam?.isPublished)
    .map((course) => ({
      course,
      hasAttempted: attemptedCourseIds.has(course.id),
      progress: Math.round(course.progress?.progress || 0),
    }));

  return (
    <div className="space-y-8">
      <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_38%,#3457ff_100%)] p-6 text-white shadow-[0_34px_90px_-48px_rgba(15,23,42,0.55)] md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Exam Centre
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Review every final exam, result, and next milestone.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/80 md:text-base">
              See what is available now, what is still locked behind course
              completion, and how your final assessments are progressing.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <HeroMetric
              label="Exam courses"
              value={String(upcomingExams.length)}
            />
            <HeroMetric
              label="Attempts tracked"
              value={String(examHistory.reduce((sum, item) => sum + item.attemptsCount, 0))}
            />
            <HeroMetric
              label="Passed courses"
              value={String(examHistory.filter((item) => item.passed).length)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] md:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
              Upcoming Exams
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Courses with final assessments
            </h3>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-500">
            A final exam unlocks only after course completion. Open the course
            and continue learning to make an exam available.
          </p>
        </div>

        {upcomingExams.length === 0 ? (
          <div className="rounded-[26px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No published final exams are attached to your current enrollments.
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {upcomingExams.map(({ course, hasAttempted, progress }) => {
              const unlocked = progress >= 100;
              return (
                <div
                  key={course.id}
                  className="rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Final assessment
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-slate-950">
                        {course.title}
                      </h4>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        unlocked
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {unlocked ? <Sparkles className="size-3.5" /> : <Lock className="size-3.5" />}
                      {unlocked ? "Available now" : "Locked"}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-500),#7aa2ff)]"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    {unlocked
                      ? "All course lectures are complete, so you can now take the final exam."
                      : `${progress}% course progress completed. Finish all lessons to unlock the exam.`}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
                      <Clock3 className="size-3.5" />
                      {course.exam?.timeLimitMinutes
                        ? `${course.exam.timeLimitMinutes} mins`
                        : "No time limit"}
                    </span>
                    <span className="rounded-full bg-white px-3 py-2">
                      {course.exam?.maxAttempts} attempts
                    </span>
                    {hasAttempted ? (
                      <span className="rounded-full bg-[var(--brand-50)] px-3 py-2 text-[var(--brand-700)]">
                        Attempted before
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/course/${course.slug}/learn`}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-200)] bg-[var(--brand-50)] px-4 py-2 text-sm font-semibold text-[var(--brand-700)] transition hover:border-[var(--brand-400)] hover:bg-white"
                    >
                      Open learning screen
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] md:p-6">
        <ExamHistory records={examHistory} />
      </div>
    </div>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
