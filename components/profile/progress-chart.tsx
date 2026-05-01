"use client";

import { WeeklyProgress } from "@/types/user";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProgressChartProps {
  weeklyProgress: WeeklyProgress[];
}

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const normalizeWeeklyProgress = (weeklyProgress: WeeklyProgress[]) => {
  const progressByDay = new Map(
    weeklyProgress.map((item) => [item.day.slice(0, 3), Number(item.progress) || 0]),
  );

  return WEEK_DAYS.map((day) => ({
    day,
    progress: progressByDay.get(day) ?? 0,
  }));
};

export default function ProgressChart({ weeklyProgress }: ProgressChartProps) {
  const chartData = normalizeWeeklyProgress(weeklyProgress);
  const highestValue = Math.max(...chartData.map((item) => item.progress), 0);
  const hasProgress = chartData.some((item) => item.progress > 0);
  const chartMax = Math.max(100, Math.ceil(highestValue / 10) * 10);

  return (
    <div className="h-full rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.24)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
            Weekly Progress
          </p>
          <h4 className="mt-2 text-lg font-semibold text-slate-950">
            Your learning rhythm
          </h4>
        </div>

        <div className="rounded-2xl bg-[var(--brand-50)] px-3 py-2 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
            Peak
          </p>
          <p className="text-lg font-semibold text-slate-950">{highestValue}%</p>
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="weekly-progress-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#335CFF" stopOpacity={0.35} />
                <stop offset="65%" stopColor="#4F74FF" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748B", fontWeight: 500 }}
            />

            <YAxis
              hide={!hasProgress}
              domain={[0, chartMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              cursor={{ stroke: "#CBD5E1", strokeDasharray: "4 4" }}
              contentStyle={{
                borderRadius: 18,
                border: "1px solid #E2E8F0",
                boxShadow: "0 20px 45px -28px rgba(15,23,42,0.35)",
                background: "#FFFFFF",
              }}
              formatter={(value: number) => [`${value}%`, "Progress"]}
              labelFormatter={(label) => `${label}`}
            />

            <Area
              type="monotone"
              dataKey="progress"
              stroke="#335CFF"
              strokeWidth={3}
              fill="url(#weekly-progress-fill)"
              dot={{
                r: 4,
                strokeWidth: 2,
                stroke: "#335CFF",
                fill: "#FFFFFF",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "#335CFF",
                fill: "#FFFFFF",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {!hasProgress ? (
        <p className="mt-4 text-sm text-slate-500">
          Start watching lessons this week and your progress trend will appear here.
        </p>
      ) : null}
    </div>
  );
}
