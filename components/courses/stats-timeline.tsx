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
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* LABEL */}
        <span className="inline-block px-5 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full mb-4">
          WHY CHOOSE US
        </span>

        {/* HEADING */}
        <h2 className="text-[44px] leading-tight font-bold text-gray-900 mb-24">
          Creating A Community Of <br /> Life Long Learners.
        </h2>

        {/* TIMELINE */}
        <div className="relative">
          {/* LINE */}
          <div className="absolute top-4.5 left-0 w-full h-[1.5px] bg-indigo-200" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {stats.map((item, index) => (
              <div
                key={index}
                className="relative flex mt-2 flex-col items-center"
              >
                {/* DOT */}
                <div className="w-5 h-5 rounded-full border-[3px] border-indigo-500 bg-white z-20" />

                {/* CONNECTOR */}
                <div className="w-0.5 h-15 bg-indigo-200 z-10" />

                {/* CARD */}
                <div className="relative w-full max-w-65 bg-white rounded-2xl pt-12 pb-8 px-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-visible border-b-4 border-indigo-500">
                  {/* ARC (FIXED PERFECT) */}

                  {/* ICON CIRCLE (MERGED FEEL) */}
                  <div className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center z-20 border border-gray-100">
                    <div className="text-indigo-500">{item.icon}</div>
                  </div>

                  {/* VALUE */}
                  <h3 className="text-3xl font-bold text-indigo-500 mt-2">
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
