"use client";

import { Course } from "@/types/course";
import { useState } from "react";

interface CourseTabsProps {
  course: Course;
}

export const CourseTabs = ({ course }: CourseTabsProps) => {
  const [tab, setTab] = useState("overview");

  return (
    <div className="bg-white border-t p-4">
      <div className="flex gap-6 border-b text-sm">
        <button onClick={() => setTab("overview")}>Overview</button>
        <button onClick={() => setTab("notes")}>Notes</button>
        <button onClick={() => setTab("qa")}>Q&A</button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        {tab === "overview" && <p>{course.shortDescription}</p>}
        {tab === "notes" && <p>No notes yet</p>}
        {tab === "qa" && <p>No questions yet</p>}
      </div>
    </div>
  );
};
