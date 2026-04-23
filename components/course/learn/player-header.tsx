"use client";

import Logo from "@/components/logo";
import { useRouter } from "next/navigation";

export const PlayerHeader = ({ course }: any) => {
  const router = useRouter();

  return (
    <div
      className="h-14 bg-linear-to-r from-[#0f172a] via-[#020617] to-[#0f172a]
                 text-white flex items-center justify-between px-6 py-8
                 border-b border-white/10 backdrop-blur-md"
    >
      {/* 🔥 LEFT: Logo + Title */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center"
        >
          <Logo /> {/* 👈 reuse */}
        </div>

        <div className="h-4 w-px bg-white/20" />

        <h2 className="text-sm font-medium text-gray-200 truncate max-w-75">
          {course.title}
        </h2>
      </div>

      {/* 🔥 RIGHT: Progress */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">12% completed</span>

        <div className="w-36 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="w-[30%] h-full bg-linear-to-r from-green-400 to-emerald-500 rounded-full" />
        </div>
      </div>
    </div>
  );
};
