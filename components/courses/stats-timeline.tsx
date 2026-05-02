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
    <section className="academy-section-tight overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* LABEL */}
        <span className="academy-badge mb-4">
          WHY CHOOSE US
        </span>

        {/* HEADING */}
        <h2 className="mb-8 text-3xl font-semibold leading-tight text-slate-950 dark:text-white lg:text-5xl">
          Creating A Community Of <br /> Life Long Learners.
        </h2>

        {/* TIMELINE */}
        <div className="relative">
          {/* LINE */}
          <div className="absolute left-0 top-4.5 hidden h-[1.5px] w-full bg-(--brand-200) md:block" />

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="academy-reveal relative mt-2 flex flex-col items-center"
              >
                {/* DOT */}
                <div className="z-20 h-5 w-5 rounded-full border-[3px] border-(--brand-500) bg-white dark:bg-slate-950" />

                {/* CONNECTOR */}
                <div className="z-10 h-12 w-0.5 bg-(--brand-200) md:h-15" />

                {/* CARD */}
                <div className="academy-card academy-hover-lift relative w-full max-w-72 overflow-visible border-(--brand-100) border-b-4 border-b-(--brand-500) px-6 pb-8 pt-12">
                  {/* ARC (FIXED PERFECT) */}

                  {/* ICON CIRCLE (MERGED FEEL) */}
                  <div className="absolute -top-7.5 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md dark:border-white/10 dark:bg-slate-900">
                    <div className="text-(--brand-600)">{item.icon}</div>
                  </div>

                  {/* VALUE */}
                  <h3 className="mt-2 text-3xl font-bold text-(--brand-700) dark:text-(--brand-300)">
                    {item.value}
                  </h3>

                  {/* LABEL */}
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
