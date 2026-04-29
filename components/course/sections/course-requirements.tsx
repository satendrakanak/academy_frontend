"use client";

import { Course } from "@/types/course";
import { Check } from "lucide-react";

interface CourseRequirementsProps {
  course: Course;
}

// 🔥 helper → string to array
const parseToArray = (value?: string): string[] => {
  if (!value) return [];

  return value
    .split("#")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const CourseRequirements = ({ course }: CourseRequirementsProps) => {
  const sections = [
    {
      title: "Technology Requirement",
      items: parseToArray(course.technologyRequirements!) || [
        "Laptop and high speed internet.",
      ],
    },
    {
      title: "Eligibility Requirements",
      items: parseToArray(course.eligibilityRequirements!) || [
        "Anybody with a zeal for healthy nutrition.",
      ],
    },
    {
      title: "Disclaimer",
      items: parseToArray(course.disclaimer!) || ["Not for clinical practice."],
    },
  ];

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">
        Course Requirements
      </h2>
      {sections.map((section, index) => (
        <div key={index}>
          {/* TITLE */}
          <h3 className="text-base font-semibold text-gray-800 mb-3">
            {section.title}
          </h3>

          {/* ITEMS */}
          <div className="space-y-3">
            {section.items.length > 0 ? (
              section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  {/* ICON */}
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100">
                    <Check className="w-4 h-4 text-green-600 stroke-3" />
                  </div>

                  {/* TEXT */}
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No data available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
