"use client";

import { DashboardStats } from "@/types/user";

interface ProfileInfoProps {
  name: string;
  email?: string;
  stats?: DashboardStats;
}

export function ProfileInfo({ name, email, stats }: ProfileInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* 🔥 NAME */}
      <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-md">
        {name}
      </h1>

      {email && <p className="text-sm text-black drop-shadow-sm">{email}</p>}

      {/* 📊 STATS */}
      {stats && (
        <div className="flex gap-6 mt-2">
          <div className="flex flex-col items-center justify-center">
            <p className=" font-semibold text-lg">{stats.courses || 0}</p>
            <p className="text-xs ">Courses</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-semibold text-lg">{stats.completed || 0}</p>
            <p className="text-xs ">Completed</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-semibold text-lg">{stats.progress || 0}%</p>
            <p className="text-xs ">Progress</p>
          </div>
        </div>
      )}
    </div>
  );
}
