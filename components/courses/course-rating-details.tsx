"use client";

import { useState, useEffect } from "react";
import RatingStars from "@/components/courses/rating-star";
import { Award } from "lucide-react";

interface CourseRatingDetailsProps {
  rating: number;
  reviews: number;
  enrolledStudentCount: number;
}

const CourseRatingDetails = ({
  rating,
  reviews,
  enrolledStudentCount,
}: CourseRatingDetailsProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center md:my-5">
      <div className="md:mr-4">
        <div className="bg-linear-to-r from-blue-200 to-cyan-200 inline-flex items-center p-4 border border-white rounded-full text-lg text-gray-600">
          <Award className="w-6 h-6" />
          <span className="ml-3">Bestseller</span>
        </div>
      </div>
      <div className="text-sm text-gray-700 flex items-center  my-4 ">
        <p className="mr-1 text-lg">{rating}</p>
        <RatingStars rating={rating} />
      </div>
      <div className="text-sm text-gray-700 flex items-center md:grow my-4 ">
        <p className="ml-2 md:text-md bg-gray-200/20 hover:bg-gray-200/60 transition duration-300 cursor-pointer p-2 rounded-md md:ml-4">
          {reviews.toLocaleString()} ratings
        </p>
        <p className="ml-2 text-lg text-black md:ml-4">
          {enrolledStudentCount.toLocaleString()} students
        </p>
      </div>
    </div>
  );
};

export default CourseRatingDetails;
