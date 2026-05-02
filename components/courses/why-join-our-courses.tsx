"use client";

import {
  BookOpen,
  Brain,
  GraduationCap,
  TrendingUp,
  HeartPulse,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Online Interactive Live Classes",
    desc: "Engage in real-time sessions with expert instructors.",
  },
  {
    icon: Brain,
    title: "Insights Based Learning",
    desc: "Understand concepts deeply with real-world insights.",
  },
  {
    icon: GraduationCap,
    title: "Practical Knowledge",
    desc: "Hands-on projects to build real skills.",
  },
  {
    icon: TrendingUp,
    title: "Upskill for Professionals",
    desc: "Industry-relevant skills for career growth.",
  },
  {
    icon: HeartPulse,
    title: "Impact on Health",
    desc: "Apply knowledge to improve your lifestyle.",
  },
];

export default function WhyJoinOurCourses() {
  return (
    <section className="py-14 bg-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-600)]">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold text-gray-900">
            Why Join Our Courses?
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            We provide a powerful learning experience to help you grow and
            succeed.
          </p>
        </div>

        {/* TOP ROW (3 cards) */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {features.slice(0, 3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-[24px] border border-[var(--brand-100)] bg-[linear-gradient(180deg,#fff_0%,var(--brand-50)_100%)] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-200)] hover:shadow-[0_20px_55px_-32px_rgba(15,23,42,0.35)]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand-100)] text-[var(--brand-700)] transition group-hover:bg-[var(--brand-500)] group-hover:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ROW (2 cards CENTERED) */}
        <div className="flex justify-center gap-6">
          {features.slice(3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group w-full max-w-sm rounded-[24px] border border-[var(--brand-100)] bg-[linear-gradient(180deg,#fff_0%,var(--brand-50)_100%)] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-200)] hover:shadow-[0_20px_55px_-32px_rgba(15,23,42,0.35)]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand-100)] text-[var(--brand-700)] transition group-hover:bg-[var(--brand-500)] group-hover:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
