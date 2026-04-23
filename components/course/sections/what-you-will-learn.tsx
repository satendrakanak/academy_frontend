"use client";

import { useState } from "react";
import { Course } from "@/types/course";

interface WhatYouWillLearnProps {
  course: Course;
}

export const WhatYouWillLearn = ({ course }: WhatYouWillLearnProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-5 border-b pb-3">
        What you'll learn
      </h2>

      {/* 🔥 Tiptap Content */}
      <div
        className={`
          prose max-w-none text-sm
          prose-p:text-gray-700
          prose-p:leading-relaxed
          prose-li:text-gray-800
          prose-li:marker:text-green-500
          prose-strong:text-black
          prose-headings:text-gray-900
          prose-a:text-primary
          ${expanded ? "" : "line-clamp-4"}
  `}
        dangerouslySetInnerHTML={{ __html: course.description ?? "" }}
      />

      {/* Show More */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-sm font-medium cursor-pointer text-primary hover:underline"
      >
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};
