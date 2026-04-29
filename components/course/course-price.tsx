import { Course } from "@/types/course";
import React from "react";

interface CoursePriceProps {
  course: Course;
  discount: number | null;
  finalAmount: number | null;
  couponCode?: string;
}
export default function CoursePrice({
  course,
  discount,
  finalAmount,
  couponCode,
}: CoursePriceProps) {
  return (
    <div className="mt-4 space-y-1">
      {discount && discount > 0 ? (
        <>
          {/* 🔥 Final Price */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ₹{finalAmount}
            </span>

            <span className="text-lg line-through text-gray-400">
              ₹{course.priceInr}
            </span>
          </div>

          {/* 🔥 Coupon Info */}
          <p className="text-sm text-green-600 font-medium">
            🎉 {couponCode} applied
          </p>
        </>
      ) : (
        <span className="text-3xl font-bold text-gray-900">
          ₹{course.priceInr}
        </span>
      )}
    </div>
  );
}
