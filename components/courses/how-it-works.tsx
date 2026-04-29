"use client";

import { BookOpen, UserPlus, Video, Brain, Award } from "lucide-react";

const steps = [
  {
    icon: <BookOpen size={20} />,
    title: "Pick a Course",
    desc: "Choose a course that fits your goals.",
  },
  {
    icon: <UserPlus size={20} />,
    title: "Register",
    desc: "Complete registration easily.",
  },
  {
    icon: <Video size={20} />,
    title: "Attend Classes",
    desc: "Join live sessions & learn.",
  },
  {
    icon: <Brain size={20} />,
    title: "Practice",
    desc: "Work on assignments.",
  },
  {
    icon: <Award size={20} />,
    title: "Get Certified",
    desc: "Earn your certificate.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[linear-gradient(180deg,var(--brand-50)_0%,#fff_100%)] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-600)]">
            Simple Process
          </p>

          <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Follow these simple steps to start your learning journey.
          </p>
        </div>

        {/* FLOW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* STEP */}
              <div className="flex flex-col items-center text-center max-w-[140px] group">
                {/* ICON CIRCLE */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-100)] text-[var(--brand-700)] transition group-hover:bg-[var(--brand-500)] group-hover:text-white">
                  {step.icon}
                </div>

                {/* TITLE */}
                <h3 className="mt-4 font-semibold text-gray-900 text-sm">
                  {step.title}
                </h3>

                {/* DESC */}
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
              </div>

              {/* ARROW */}
              {index !== steps.length - 1 && (
                <div className="hidden md:flex items-center mx-4">
                  <div className="h-[2px] w-10 bg-[var(--brand-200)]" />
                  <div className="-ml-1 h-2 w-2 rotate-45 border-t-2 border-r-2 border-[var(--brand-300)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
