"use client";

import { useState } from "react";
import { Course } from "@/types/course";
import {
  Monitor,
  Award,
  ClipboardList,
  Clock,
  BarChart,
  BookOpen,
  Book,
  Languages,
} from "lucide-react";

interface CourseDetailsProps {
  course: Course;
}

export const CourseDetails = ({ course }: CourseDetailsProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const items = [
    {
      label: "Course Type",
      value: "100% Online Courses",
      icon: Monitor,
    },
    {
      label: "Certificate",
      value: course.certificate || "Course completion certificate provided",
      icon: Award,
    },
    {
      label: "Exams",
      value: course.exams || "Exam conducted after course completion",
      icon: ClipboardList,
    },
    {
      label: "Duration",
      value: course.duration || "N/A",
      icon: Clock,
    },
    {
      label: "Experience Level",
      value: course.experienceLevel || "No prior experience required",
      icon: BarChart,
    },
    {
      label: "Study Material",
      value: "Included in the course",
      icon: BookOpen,
    },
    {
      label: "Additional Book",
      value: "Everyday Ayurveda : Daily Habits That Can Change Your Life",
      icon: Book,
    },
    {
      label: "Language",
      value: course.language || "English - Hindi",
      icon: Languages,
    },
  ];

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-5 border-b pb-3">
        Course Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isExpanded = expandedIndex === index;
          const isLong = item.value.length > 80;

          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition"
            >
              {/* ICON */}
              <div className="min-w-11 h-11 flex items-center justify-center rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary stroke-2" />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>

                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {isExpanded
                    ? item.value
                    : isLong
                      ? item.value.slice(0, 80) + "..."
                      : item.value}
                </p>

                {/* SHOW MORE */}
                {isLong && (
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="text-xs text-primary mt-1 hover:underline cursor-pointer"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
