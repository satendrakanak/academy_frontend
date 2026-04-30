"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@/types/user";

export default function Faculty({ faculties }: { faculties: User[] }) {
  if (!faculties?.length) return null;

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-600)]">
              Our Experts
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              Meet the faculty shaping thoughtful practitioners.
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Learn from specialists who combine academic depth, industry
              practice, and mentorship that actually guides students forward.
            </p>
          </div>

          <Link
            href="/our-faculty"
            className="inline-flex items-center justify-center rounded-full border border-[var(--brand-200)] bg-[var(--brand-50)] px-5 py-3 text-sm font-semibold text-[var(--brand-700)] transition hover:bg-[var(--brand-100)]"
          >
            View All Faculty
          </Link>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {faculties.slice(0, 4).map((item) => (
            <div key={item.id} className="group">
              {/* IMAGE */}
              <div className="relative mb-4 h-72 w-full overflow-hidden rounded-[28px] border border-[var(--brand-100)] bg-[var(--brand-50)]">
                <Image
                  src={item.avatar?.path || "/assets/default.png"}
                  alt={`${item.firstName} ${item.lastName || ""}`}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-900)]/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              {/* NAME */}
              <h3 className="text-lg font-semibold text-gray-900">
                {item.firstName} {item.lastName || ""}
              </h3>

              {/* ROLE */}
              <p className="mt-1 text-sm font-medium text-[var(--brand-700)]">
                {item.facultyProfile?.designation || "Faculty Mentor"}
              </p>

              <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                {item.profile?.bio ||
                  item.facultyProfile?.expertise ||
                  "Guiding learners with practical insight and subject depth."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
