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
    <section className="academy-section bg-[linear-gradient(180deg,color-mix(in_oklab,var(--brand-50)_70%,white)_0%,transparent_100%)] dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-600)] dark:text-[var(--brand-300)]">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-semibold text-slate-950 dark:text-white">
            Why Join Our Courses?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-300">
            We provide a powerful learning experience to help you grow and
            succeed.
          </p>
        </div>

        {/* TOP ROW (3 cards) */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {features.slice(0, 3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="academy-card academy-hover-lift group p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand-100)] text-[var(--brand-700)] transition group-hover:bg-[var(--brand-500)] group-hover:text-white dark:bg-white/10 dark:text-[var(--brand-300)]">
                  <Icon size={24} />
                </div>

                <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-300">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ROW (2 cards CENTERED) */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.slice(3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="academy-card academy-hover-lift group w-full p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand-100)] text-[var(--brand-700)] transition group-hover:bg-[var(--brand-500)] group-hover:text-white dark:bg-white/10 dark:text-[var(--brand-300)]">
                  <Icon size={24} />
                </div>

                <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-300">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
