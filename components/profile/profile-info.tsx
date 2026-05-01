"use client";

import { DashboardStats } from "@/types/user";

interface ProfileInfoProps {
  name: string;
  email?: string;
  stats?: DashboardStats;
}

export function ProfileInfo({ name, email, stats }: ProfileInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
          Learner Profile
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          {name}
        </h1>
        {email ? (
          <p className="mt-2 text-sm text-slate-500 md:text-base">{email}</p>
        ) : null}
      </div>

      {stats && (
        <div className="flex flex-wrap gap-3">
          <div className="min-w-[132px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-lg font-semibold text-slate-950">
              {stats.completed || 0}/{stats.courses || 0}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
              Courses Completed
            </p>
          </div>

          <div className="min-w-[112px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-lg font-semibold text-slate-950">
              {stats.examsTaken || 0}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
              Exam Attempts
            </p>
          </div>

          <div className="min-w-[112px] rounded-2xl border border-[var(--brand-100)] bg-[var(--brand-50)] px-4 py-3 shadow-sm">
            <p className="text-lg font-semibold text-slate-950">
              {stats.progress || 0}%
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--brand-700)]">
              Progress
            </p>
          </div>

          <div className="min-w-[112px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-lg font-semibold text-slate-950">
              {stats.certificatesEarned || 0}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
              Certificates
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
