"use client";

import Image from "next/image";
import { Star, Users, BookOpen } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Course } from "@/types/course";

interface CourseInstructorProps {
  course: Course;
}

export const CourseInstructor = ({ course }: CourseInstructorProps) => {
  const faculties = course.faculties || [];

  if (faculties.length === 0) {
    return (
      <div className="bg-white border rounded-2xl p-6 shadow-sm ">
        <h2 className="text-xl font-semibold mb-4 border-b pb-3">Instructor</h2>

        <div className="flex flex-col items-center justify-center py-10">
          <div className="text-4xl mb-3">👨‍🏫</div>

          <p className="text-sm text-gray-600 font-medium">
            No instructor assigned yet
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Instructor details will appear here once assigned
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">
        Instructor{faculties.length > 1 ? "s" : ""}
      </h2>

      <div className="space-y-8">
        {faculties.map((instructor) => {
          const profile = instructor.facultyProfile;

          const name = `${instructor.firstName || ""} ${
            instructor.lastName || ""
          }`;

          const avatar = instructor.avatar?.path || "";

          return (
            <div
              key={instructor.id}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              {/* IMAGE */}
              <div className="w-32 h-32 relative shrink-0">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                {/* NAME */}
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

                {/* ROLE */}
                <p className="text-sm text-gray-500 mb-1">
                  {profile?.designation || "Course Instructor"}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {instructor.profile?.bio
                    ? instructor.profile.bio.length > 200
                      ? instructor.profile.bio.slice(0, 200) + "..."
                      : instructor.profile.bio
                    : "No bio available"}
                </p>

                {/* STATS (future ready) */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span>-- Reviews</span>
                  </div>

                  <div className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    -- Rating
                  </div>

                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>-- Students</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>-- Courses</span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {profile?.expertise ||
                    "This instructor has not added details yet."}
                </p>

                {/* SOCIAL */}
                <div className="flex items-center gap-3">
                  {profile?.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary/10 transition"
                    >
                      <FaLinkedinIn className="w-4 h-4 text-gray-600 hover:text-primary" />
                    </a>
                  )}

                  {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 opacity-50"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
