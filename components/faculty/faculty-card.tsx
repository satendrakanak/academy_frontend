// components/faculty/faculty-card.tsx

"use client";

import Image from "next/image";
import { User } from "@/types/user";

export function FacultyCard({ faculty }: { faculty: User }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 group">
      {/* IMAGE */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
        <Image
          src={faculty.avatar?.path || "/assets/placeholder.jpg"}
          alt={faculty.firstName}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* NAME */}
      <h3 className="text-lg font-semibold text-gray-900">
        {faculty.firstName}
      </h3>

      {/* ROLE */}
      <p className="text-sm text-blue-600 font-medium mt-1">
        {faculty.facultyProfile.designation}
      </p>

      {/* BIO */}
      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
        {faculty.profile.bio ||
          "Experienced professional in health and wellness."}
      </p>

      {/* EXPERIENCE */}
      {faculty.facultyProfile.experience && (
        <p className="text-xs text-gray-400 mt-3">
          {faculty.facultyProfile.experience} years experience
        </p>
      )}
    </div>
  );
}
