"use client";

import { ArrowRight, Clock3, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { useSiteSettings } from "@/context/site-settings-context";
import Link from "next/link";

export function ContactInfo() {
  const { site } = useSiteSettings();

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-[var(--brand-100)] bg-[linear-gradient(160deg,#ffffff_0%,#f9fbff_48%,#eef4ff_100%)] p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(11,18,32,0.98),rgba(16,25,44,0.98))] dark:shadow-[0_32px_80px_-42px_rgba(0,0,0,0.62)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
          Get in touch
        </p>
        <h3 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
          Let&apos;s help with the right next step.
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
          Reach out for course guidance, support, admissions help, or faculty
          questions. We usually respond within one working day.
        </p>

        <div className="mt-8 grid gap-4">
          <InfoRow
            icon={Mail}
            label="Email"
            value={site.supportEmail || "info@academy.com"}
          />
          <InfoRow
            icon={Phone}
            label="Phone"
            value={site.supportPhone || "+91-9809-XXXXXX"}
          />
          <InfoRow
            icon={MapPin}
            label="Address"
            value={site.supportAddress || "India"}
          />
          <InfoRow
            icon={Clock3}
            label="Support hours"
            value="Monday to Saturday, 10:00 AM to 6:00 PM"
          />
        </div>
      </div>

      <div className="rounded-[28px] border border-[var(--brand-100)] bg-white p-6 shadow-[0_18px_48px_-36px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(11,18,32,0.94),rgba(17,27,46,0.94))] dark:shadow-[0_28px_80px_-42px_rgba(0,0,0,0.58)]">
        <h4 className="text-lg font-semibold text-slate-950 dark:text-white">
          Prefer exploring first?
        </h4>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Browse the latest programs, testimonials, and faculty stories before
          talking to the team.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-600)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)]"
          >
            Explore Courses
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/client-testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-200)] px-4 py-2 text-sm font-semibold text-[var(--brand-700)] transition hover:bg-[var(--brand-50)] dark:border-white/15 dark:text-slate-100 dark:hover:bg-white/8"
          >
            View Testimonials
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 dark:border-white/10 dark:bg-white/6">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)] dark:bg-white/10 dark:text-[var(--brand-200)]">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-950 dark:text-white">{label}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{value}</p>
      </div>
    </div>
  );
}
