"use client";

import { Course } from "@/types/course";
import Image from "next/image";
import { MdOutlineRotateLeft } from "react-icons/md";
import VideoPlayIcon from "../icons/video-play-icon";
import CourseFeatureItem from "./course-feature-item";
import { AddToCartButton } from "../cart/add-to-cart-button";
import { useEffect, useState } from "react";
import { getCourseMeta } from "@/helpers/course-meta";
import { Button } from "../ui/button";
import Link from "next/link";

interface CourseSidebarcardProps {
  course: Course;
}

export const CourseSidebarCard = ({ course }: CourseSidebarcardProps) => {
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
  const isEnrolled = course.isEnrolled;
  const percent = course.progress.progress;
  return (
    <div className="border bg-white border-primary/30 rounded-2xl p-5 shadow-lg">
      {/* IMAGE */}
      <div className="mb-4">
        <div className="relative">
          <Image
            src={course.image?.path || "/placeholder.jpg"}
            alt={course.title || "Course Image"}
            width={950}
            height={600}
            className="rounded-lg"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <VideoPlayIcon
              videoUrl={course.video?.path || null}
              isFree={course.chapters?.[0]?.isFree}
              title={course.title}
            />
          </div>
        </div>
      </div>

      {/* 🔥 STATUS */}
      {!isEnrolled ? (
        <p className="text-sm text-red-500 font-medium mb-3">
          ⚡ Few seats left
        </p>
      ) : (
        <p className="text-sm text-green-600 font-medium mb-3">
          ✅ You are enrolled
        </p>
      )}

      {/* 🔥 CTA SECTION */}
      <div className="mt-4 space-y-3">
        {!isEnrolled ? (
          <AddToCartButton course={course} />
        ) : (
          <>
            {/* 🔥 Progress */}
            <div>
              <div className="flex justify-between text-xs mb-1 text-gray-600">
                <span>Your Progress</span>
                <span>{percent}%</span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* 🔥 Continue Button */}
            <Link href={`/course/${course.slug}/learn`}>
              <Button className="w-full h-12 text-base font-semibold">
                {percent > 0 ? "Continue Learning" : "Start Learning"}
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* 🔥 Guarantee */}
      <p className="flex items-center justify-center text-muted-foreground text-sm text-center mt-4">
        <MdOutlineRotateLeft className="w-4 h-4 mr-1" />
        15 days money back guarantee
      </p>

      {/* 🔥 FEATURES */}
      <div className="mt-5 space-y-2">
        <CourseFeatureItem title="Duration" value={course.duration || "N/A"} />
        <CourseFeatureItem title="Lectures" value={meta.totalLectures} />
        <CourseFeatureItem
          title="Total Video Duration"
          value={meta.totalDuration}
        />
        <CourseFeatureItem
          title="Experience Level"
          value={course.experienceLevel || "No prior experience required"}
        />
        <CourseFeatureItem
          title="Language"
          value={course.language || "English - Hindi"}
        />
      </div>
    </div>
  );
};
