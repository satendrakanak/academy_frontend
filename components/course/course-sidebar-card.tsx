"use client";

import { Course } from "@/types/course";
import Image from "next/image";
import { MdOutlineRotateLeft } from "react-icons/md";
import VideoPlayIcon from "../icons/video-play-icon";
import CourseFeatureItem from "./course-feature-item";
import { AddToCartButton } from "../cart/add-to-cart-button";

interface CourseSidebarcardProps {
  course: Course;
}

export const CourseSidebarCard = ({ course }: CourseSidebarcardProps) => {
  return (
    <div className="border bg-white border-indigo-200 rounded-xl p-5 shadow-md">
      <div className="mb-4">
        <div className="relative">
          <Image
            src={course.image?.path || "/placeholder.jpg"}
            alt={course.title || "Course Image"}
            width={950}
            height={600}
            className="rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <VideoPlayIcon
              videoUrl={course.chapters?.[0]?.video?.path || null}
              isFree={course.chapters?.[0]?.isFree}
              title={course.title}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            <span className="text-webprimary text-lg font-semibold ml-3 color-ping">
              Few Seats Left
            </span>
          </h3>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <AddToCartButton course={course} />
      </div>
      <p className="flex items-center justify-center text-muted-foreground text-md text-center ">
        <MdOutlineRotateLeft className="w-4 h-4 mr-1" />
        15 days money back guarantee
      </p>
      <CourseFeatureItem title="Duration" value={course.duration || "N/A"} />
      <CourseFeatureItem
        title="Certificate"
        value={
          course.certificate ||
          "Yes, Unitus academy will reward a course completion certificate"
        }
      />
      <CourseFeatureItem
        title="Exams"
        value={
          course.exams ||
          "Exam to be conducted after the completion of the course"
        }
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
  );
};
