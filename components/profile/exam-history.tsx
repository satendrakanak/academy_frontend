"use client";

import Link from "next/link";
import { BadgeCheck, ClipboardCheck, MoveRight } from "lucide-react";
import { ExamHistoryRecord } from "@/types/exam";

export function ExamHistory({ records }: { records: ExamHistoryRecord[] }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
            Final Exam History
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
            Track every exam you have attempted
          </h3>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">
          Review your latest exam scores, attempt counts, and cleared courses
          in one place.
        </p>
      </div>

      {records.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--brand-50)] text-[var(--brand-700)] dark:bg-white/10 dark:text-[var(--brand-200)]">
            <ClipboardCheck className="size-6" />
          </div>
          <h4 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
            No final exam attempts yet
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
            Complete your course lessons and take the final exam when it
            unlocks. Your results will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {records.map((record) => (
            <article
              key={record.course.id}
              className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,rgba(248,250,252,0.92))] p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.92),rgba(16,26,46,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {record.attemptsCount} attempt
                    {record.attemptsCount > 1 ? "s" : ""}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                    {record.course.title}
                  </h4>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    record.passed
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {record.passed ? (
                    <BadgeCheck className="size-3.5" />
                  ) : (
                    <ClipboardCheck className="size-3.5" />
                  )}
                  {record.passed ? "Passed" : "In Progress"}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Metric
                  label="Latest Score"
                  value={`${record.latestScore}/${record.latestMaxScore}`}
                />
                <Metric
                  label="Latest %"
                  value={`${record.latestPercentage}%`}
                />
                <Metric
                  label="Best Score"
                  value={`${record.bestScore}%`}
                />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Last attempted
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {new Date(record.lastAttemptedAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <Link
                  href={`/course/${record.course.slug}/learn`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-200)] bg-[var(--brand-50)] px-4 py-2 text-sm font-semibold text-[var(--brand-700)] transition hover:border-[var(--brand-400)] hover:bg-white dark:border-[var(--brand-900)] dark:bg-[rgba(59,88,191,0.2)] dark:text-[var(--brand-200)] dark:hover:bg-white/8"
                >
                  Open course
                  <MoveRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
