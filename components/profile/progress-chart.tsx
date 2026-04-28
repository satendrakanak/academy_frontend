"use client";

import { WeeklyProgress } from "@/types/user";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
} from "recharts";

interface ProgressChartProps {
  weeklyProgress: WeeklyProgress[];
}

export default function ProgressChart({ weeklyProgress }: ProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={weeklyProgress}>
        {/* 🔥 Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>

          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        {/* X Axis */}
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />

        {/* Tooltip */}
        <Tooltip />

        {/* 🔥 Area (background fill) */}
        <Area
          type="monotone"
          dataKey="progress"
          stroke="none"
          fill="url(#areaGradient)"
          tooltipType="none"
        />

        {/* 🔥 Gradient Line */}
        <Line
          type="monotone"
          dataKey="progress"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
