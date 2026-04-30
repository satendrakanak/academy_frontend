// components/faculty/faculty-card.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@/types/user";

export function FacultyCard({ faculty }: { faculty: User }) {
  return (
    <Link
      href={`/our-faculty/${faculty.id}`}
      className="group block rounded-[28px] border border-[var(--brand-100)] bg-white p-5 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-200)] hover:shadow-[0_28px_70px_-34px_rgba(15,23,42,0.35)]"
    >
      {/* IMAGE */}
      <div className="relative mb-5 h-64 w-full overflow-hidden rounded-[24px] bg-[var(--brand-50)]">
        <Image
          src={faculty.avatar?.path || "/assets/default.png"}
          alt={faculty.firstName}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* NAME */}
      <h3 className="text-lg font-semibold text-gray-900">
        {faculty.firstName} {faculty.lastName || ""}
      </h3>

      {/* ROLE */}
      <p className="mt-1 text-sm font-medium text-[var(--brand-700)]">
        {faculty.facultyProfile?.designation || "Faculty Mentor"}
      </p>

      {/* BIO */}
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
        {faculty.profile?.bio ||
          faculty.facultyProfile?.expertise ||
          "Experienced professional in health and wellness."}
      </p>

      {/* EXPERIENCE */}
      {faculty.facultyProfile?.experience && (
        <p className="mt-4 inline-flex rounded-full bg-[var(--brand-50)] px-3 py-1 text-xs font-medium text-[var(--brand-700)]">
          {faculty.facultyProfile.experience} years experience
        </p>
      )}
    </Link>
  );
}
