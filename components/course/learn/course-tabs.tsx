"use client";

import { Course } from "@/types/course";
import { getCourseMeta } from "@/helpers/course-meta";
import { useEffect, useState } from "react";

interface CourseTabsProps {
  course: Course;
}

export const CourseTabs = ({ course }: CourseTabsProps) => {
  const [meta, setMeta] = useState({
    totalLectures: 0,
    totalDuration: "0m",
  });
  useEffect(() => {
    const loadMeta = async () => {
      const data = await getCourseMeta(course);
      setMeta(data);
    };

    loadMeta();
  }, [course]);

  return (
    <div className="bg-white border-t">
      {/* 🔥 TAB HEADER */}
      <div className="px-6 pt-4 border-b">
        <span className="text-sm font-medium border-b-2 border-primary pb-2 inline-block">
          Overview
        </span>
      </div>

      {/* 🔥 CONTENT */}
      <div className="px-6 py-6 space-y-4 text-sm text-gray-700">
        <h1 className="text-2xl font-semibold ">{course.title}</h1>

        {/* 🚀 SHORT DESCRIPTION */}
        {course.shortDescription && (
          <div>
            <p className="text-base text-gray-900 leading-relaxed">
              {course.shortDescription}
            </p>
          </div>
        )}

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t pt-6">
          <div>
            <p className="text-gray-500 text-xs">Lectures</p>
            <p className="font-semibold">{meta.totalLectures}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Total Duration</p>
            <p className="font-semibold">{meta.totalDuration}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Language</p>
            <p className="font-semibold">{course.language || "English"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Level</p>
            <p className="font-semibold">All Level</p>
          </div>
        </div>

        {/* 🎓 CERTIFICATE */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-base mb-2">Certificate</h3>

          <p className="text-gray-600 mb-3">
            Get your certificate by completing the entire course.
          </p>

          <button className="border border-primary text-primary px-4 py-2 rounded-md text-sm hover:bg-primary/10 transition">
            Get Certificate
          </button>
        </div>

        {/* 📚 FULL DESCRIPTION */}
        {course.description && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-base mb-3">Description</h3>

            <div
              className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-p:leading-relaxed
                 prose-ul:list-disc prose-ul:ml-4
                 prose-ol:list-decimal prose-ol:ml-4"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
