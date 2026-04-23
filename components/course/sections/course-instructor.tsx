"use client";

import Image from "next/image";
import { Star, Users, BookOpen } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export const CourseInstructor = () => {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">Instructor</h2>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* IMAGE */}
        <div className="w-40 h-40 relative shrink-0">
          <Image
            src="/assets/faculty-4.jpg"
            alt="Instructor"
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          {/* NAME */}
          <h3 className="text-xl font-semibold text-gray-900">Fred Guer</h3>

          {/* ROLE */}
          <p className="text-sm text-gray-500 mb-3">Course Instructor</p>

          {/* STATS */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>215,475 Reviews</span>
            </div>

            <div className="px-2 py-0.5 bg-gray-100 rounded text-xs">
              4.8 Rating
            </div>

            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>616,029 Students</span>
            </div>

            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>15 Courses</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Fred Guer is a brilliant educator, whose life was spent for computer
            science and love of nature.
          </p>

          {/* SOCIAL */}
          <div className="flex items-center gap-3">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary/10 transition cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-gray-600 hover:text-primary" />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
