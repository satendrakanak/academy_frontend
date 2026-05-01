"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  UserPlus,
  Video,
} from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    eyebrow: "Step 01",
    title: "Choose the right program",
    desc: "Browse wellness, Ayurveda, and nutrition courses that match your level, schedule, and long-term career goals.",
  },
  {
    icon: UserPlus,
    eyebrow: "Step 02",
    title: "Create your learner account",
    desc: "Register quickly, verify your details, and unlock a clean dashboard where your courses and certificates stay organized.",
  },
  {
    icon: Video,
    eyebrow: "Step 03",
    title: "Start learning with structure",
    desc: "Watch lessons, join guided sessions, and move chapter by chapter with a clear, practical learning path.",
  },
  {
    icon: Brain,
    eyebrow: "Step 04",
    title: "Practice and apply concepts",
    desc: "Reinforce what you learn through notes, assignments, and repeat viewing so concepts actually stay with you.",
  },
  {
    icon: Award,
    eyebrow: "Step 05",
    title: "Complete and get certified",
    desc: "Finish the course journey, track your progress, and receive your downloadable certificate when you complete the program.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,var(--brand-50)_40%,#ffffff_100%)] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,32,72,0.08),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--brand-700)]">
              How It Works
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              A guided path from curiosity to certification.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              We keep the process straightforward, but the learning experience
              rich. From choosing a course to earning your certificate, every
              step is designed to feel organized, credible, and practical.
            </p>

            <div className="mt-8 rounded-[28px] border border-[var(--brand-100)] bg-white/90 p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.32)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-700)]">
                Learner Promise
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Clear onboarding, structured lessons, practical outcomes, and a
                completion flow that feels professional from start to finish.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="group relative">
                  {index !== steps.length - 1 ? (
                    <div className="absolute left-8 top-20 hidden h-[calc(100%-2rem)] w-px bg-[linear-gradient(180deg,var(--brand-200),transparent)] md:block" />
                  ) : null}

                  <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.24)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_34px_80px_-42px_rgba(15,23,42,0.3)] md:p-7">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      <div className="flex items-center gap-4 md:block">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--brand-50),#ffffff)] text-[var(--brand-700)] shadow-inner ring-1 ring-[var(--brand-100)]">
                          <Icon className="size-7" />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-700)]">
                              {step.eyebrow}
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                              {step.title}
                            </h3>
                          </div>

                          <div className="hidden rounded-full bg-slate-100 px-3 py-2 text-slate-400 md:flex">
                            <ArrowRight className="size-4" />
                          </div>
                        </div>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
