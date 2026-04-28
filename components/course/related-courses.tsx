"use client";

import { Course } from "@/types/course";
import { CourseCard } from "../courses/course-card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { CouponMap } from "@/types/coupon";
import { couponClientService } from "@/services/coupons/coupon.client";

interface RelatedCoursesProps {
  courses: Course[];
}

export const RelatedCourses = ({ courses }: RelatedCoursesProps) => {
  const [couponMap, setCouponMap] = useState<CouponMap>({});

  useEffect(() => {
    if (!courses?.length) return;

    const run = async () => {
      try {
        const res = await couponClientService.autoApplyBulk({
          courses: courses.map((c) => ({
            id: c.id,
            price: Number(c.priceInr),
          })),
        });

        console.log("🔥 RELATED BULK:", res.data);

        setCouponMap(res.data?.data || {});
      } catch (e) {
        console.error("❌ RELATED BULK FAILED", e);
      }
    };

    run();
  }, [courses]);
  if (!courses?.length) return null;

  return (
    <section className="py-16">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Related Courses
          </h2>
          <p className="text-gray-500 mt-2">
            Explore more courses similar to this one
          </p>
        </div>
      </div>

      {/* 🔥 SLIDER */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {courses.map((course, index) => (
          <SwiperSlide key={course.id || index}>
            <div className="h-full">
              <CourseCard
                course={course}
                coupon={couponMap[course.id] || null}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
