"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCards } from "swiper/modules";
import Image from "next/image";
import { Course } from "@/types/course";
import { CouponMap } from "@/types/coupon";
import { useEffect, useState } from "react";
import { couponClientService } from "@/services/coupons/coupon.client";
import Link from "next/link";

interface HeroProps {
  courses: Course[];
}

export default function Hero({ courses }: HeroProps) {
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
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-500 to-red-500 text-white">
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 grid md:grid-cols-3 gap-10 items-center">
        {/* LEFT */}
        <div className="z-10">
          <p className="bg-white/20 inline-block px-4 py-1 rounded-full text-sm mb-4">
            🏆 The Leader in Online Learning
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-4">
            Build The Skills <br /> To Drive Your Career
          </h1>

          <p className="text-white/80 mb-6">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-md font-semibold">
            View Course →
          </button>
        </div>

        {/* GIRL FIXED (NO BG ISSUE, NO SHOE) */}

        <div className="relative flex justify-center items-end ">
          <div className="relative w-full max-w-sm h-100 md:h-135">
            <Image
              src="/assets/courses/banner-01.webp"
              alt="hero"
              fill
              priority
              className="object-cover object-bottom scale-110 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative pb-22 z-10">
          <Swiper
            modules={[Pagination, EffectCards, Autoplay]}
            effect="cards"
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
          >
            {courses.map((course, index) => {
              const coupon = couponMap[course.id];

              const discount = coupon?.discount ?? 0;
              const finalPrice = coupon?.finalAmount ?? Number(course.priceInr);
              return (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-2xl p-5 shadow-xl min-h-85 flex flex-col">
                    {/* IMAGE */}
                    <div className="relative">
                      <Image
                        alt={course.title}
                        src={course.image?.path || "/placeholder.jpg"}
                        className="w-full h-50 object-cover rounded-lg"
                        width={950}
                        height={600}
                      />

                      {discount > 0 && (
                        <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          -
                          {Math.round(
                            (discount / Number(course.priceInr)) * 100,
                          )}
                          %
                        </span>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="mt-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg mb-2 text-black">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-500 mb-3">
                        {course.shortDescription}
                      </p>

                      <div className="text-yellow-500 text-sm mb-3">
                        ⭐⭐⭐⭐⭐ <span className="text-gray-400">(15)</span>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-2">
                          <p className="text-primary font-bold text-lg">
                            ₹{new Intl.NumberFormat("en-IN").format(finalPrice)}
                          </p>

                          {discount > 0 && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹
                              {new Intl.NumberFormat("en-IN").format(
                                Number(course.priceInr),
                              )}
                            </span>
                          )}
                        </div>

                        <Link href={`/course/${course.slug}`}>
                          <span className="text-sm text-primary">
                            Learn More →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* CLEAN WAVE (FIXED HEIGHT) */}
      <div className="absolute bottom-0 left-0 w-full leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-25"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,64L60,69.3C120,75,240,85,360,85.3C480,85,600,75,720,64C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64V120H0Z"
          />
        </svg>
      </div>
    </section>
  );
}
