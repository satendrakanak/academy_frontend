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
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 mb-2">
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
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
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
                  <div className="w-10 h-[2px] bg-gray-300" />
                  <div className="w-2 h-2 border-t-2 border-r-2 border-gray-400 rotate-45 -ml-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
