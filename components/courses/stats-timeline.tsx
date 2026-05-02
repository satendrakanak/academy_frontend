"use client";

import { GraduationCap, BookOpen, Award, Users } from "lucide-react";

const stats = [
  {
    icon: <GraduationCap size={18} />,
    value: "500+",
    label: "Learners & counting",
  },
  {
    icon: <BookOpen size={18} />,
    value: "800+",
    label: "Courses & Video",
  },
  {
    icon: <Award size={18} />,
    value: "1000+",
    label: "Certified Students",
  },
  {
    icon: <Users size={18} />,
    value: "100+",
    label: "Registered Enrolls",
  },
];

export default function StatsTimeline() {
  return (
    <section className="pt-6 pb-14">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* LABEL */}
        <span className="mb-4 inline-block rounded-full bg-(--brand-100) px-5 py-1 text-xs font-semibold tracking-[0.22em] text-(--brand-700)">
          WHY CHOOSE US
        </span>

        {/* HEADING */}
        <h2 className="text-3xl lg:text-5xl leading-tight font-bold text-gray-900 mb-8">
          Creating A Community Of <br /> Life Long Learners.
        </h2>

        {/* TIMELINE */}
        <div className="relative">
          {/* LINE */}
          <div className="absolute top-4.5 left-0 h-[1.5px] w-full bg-(--brand-200)" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {stats.map((item, index) => (
              <div
                key={index}
                className="relative flex mt-2 flex-col items-center"
              >
                {/* DOT */}
                <div className="z-20 h-5 w-5 rounded-full border-[3px] border-(--brand-500) bg-white" />

                {/* CONNECTOR */}
                <div className="z-10 h-15 w-0.5 bg-(--brand-200)" />

                {/* CARD */}
                <div className="relative w-full max-w-65 overflow-visible rounded-[26px] border border-(--brand-100) border-b-4 border-b-(--brand-500) bg-white px-6 pt-12 pb-8 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)]">
                  {/* ARC (FIXED PERFECT) */}

                  {/* ICON CIRCLE (MERGED FEEL) */}
                  <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center z-20 border border-gray-100">
                    <div className="text-(--brand-600)">{item.icon}</div>
                  </div>

                  {/* VALUE */}
                  <h3 className="mt-2 text-3xl font-bold text-(--brand-700)">
                    {item.value}
                  </h3>

                  {/* LABEL */}
                  <p className="text-gray-500 text-sm mt-2">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
