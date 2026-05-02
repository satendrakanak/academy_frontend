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

        setCouponMap(res.data?.data || {});
      } catch {
        setCouponMap({});
      }
    };

    run();
  }, [courses]);
  return (
    <section className="academy-hero relative overflow-hidden text-white">
      <div className="academy-hero-grid absolute inset-0 opacity-20" />
      <div className="academy-hero-light absolute top-0 left-0" />

      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12 xl:px-16 pt-12 lg:py-20 flex flex-col lg:flex-row lg:items-center min-h-190 lg:min-h-162.5">
        {/* LEFT CONTENT */}
        <div className="max-w-130 z-20 text-center lg:text-left">
          <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm">
            🏆 The Leader in Online Learning
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Build The Skills <br /> To Drive Your <br />
            Career
          </h1>

          <p className="mt-5 text-white/80 max-w-md text-sm">
            Amet minim mollit non deserunt ullamco <br />
            est sit aliqua dolor do amet sint.
          </p>

          <Link href="/courses">
            <button className="mt-8 bg-white text-black px-6 py-3 rounded-md font-semibold cursor-pointer">
              View Course →
            </button>
          </Link>
        </div>

        {/* GIRL */}
        <div className="absolute bottom-0 left-[48%] -translate-x-1/2 z-30 hidden lg:block">
          <div className="relative w-130 h-155">
            <Image
              src="/assets/courses/banner-01.webp"
              alt="hero"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden lg:block w-105">
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
                  <div className="bg-white rounded-2xl p-5 shadow-xl">
                    <div className="relative">
                      <Image
                        alt={course.title}
                        src={course.image?.path || "/placeholder.jpg"}
                        className="w-full h-50 object-cover rounded-lg"
                        width={950}
                        height={600}
                      />

                      {discount > 0 && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
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

        {/* MOBILE */}

        <div className="lg:hidden relative w-full flex flex-col items-center mt-8 pb-0">
          {/* MOBILE COURSE CARD */}
          <div className="relative z-40 w-full max-w-85">
            <Swiper
              modules={[Pagination, Autoplay]}
              loop={courses.length > 1}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              className="pb-8"
            >
              {courses.map((course, index) => {
                const coupon = couponMap[course.id];

                const discount = coupon?.discount ?? 0;
                const finalPrice =
                  coupon?.finalAmount ?? Number(course.priceInr);

                return (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-xl p-3 shadow-xl text-left">
                      <div className="relative">
                        <Image
                          alt={course.title}
                          src={course.image?.path || "/placeholder.jpg"}
                          className="w-full h-36 object-cover rounded-lg"
                          width={950}
                          height={600}
                        />

                        {discount > 0 && (
                          <span className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full">
                            -
                            {Math.round(
                              (discount / Number(course.priceInr)) * 100,
                            )}
                            %
                          </span>
                        )}
                      </div>

                      <div className="mt-3">
                        <h3 className="font-semibold text-sm text-black line-clamp-2">
                          {course.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {course.shortDescription}
                        </p>

                        <div className="text-yellow-500 text-xs mt-2">
                          ⭐⭐⭐⭐⭐ <span className="text-gray-400">(15)</span>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-2">
                            <p className="text-primary font-bold text-sm">
                              ₹
                              {new Intl.NumberFormat("en-IN").format(
                                finalPrice,
                              )}
                            </p>

                            {discount > 0 && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹
                                {new Intl.NumberFormat("en-IN").format(
                                  Number(course.priceInr),
                                )}
                              </span>
                            )}
                          </div>

                          <Link href={`/course/${course.slug}`}>
                            <span className="text-xs text-primary whitespace-nowrap">
                              Learn →
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

          {/* MOBILE GIRL - BOTTOM STICK */}
          <div className="relative z-20 w-full h-82.5 mt-2">
            <Image
              src="/assets/courses/banner-01.webp"
              alt="hero"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* WAVE */}
      <div className="absolute bottom-0 left-0 w-full z-40 hidden lg:block">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20"
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
