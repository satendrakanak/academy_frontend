"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";

import { couponClientService } from "@/services/coupons/coupon.client";
import { CouponMap } from "@/types/coupon";
import { Course } from "@/types/course";

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
          courses: courses.map((course) => ({
            id: course.id,
            price: Number(course.priceInr),
          })),
        });

        setCouponMap(res.data?.data || {});
      } catch {
        setCouponMap({});
      }
    };

    run();
  }, [courses]);

  const visibleCourses = courses.slice(0, 5);

  return (
    <section className="academy-hero relative overflow-hidden text-white">
      <div className="academy-hero-grid absolute inset-0 opacity-18" />
      <div className="academy-hero-light absolute left-0 top-0" />

      <div className="relative z-10 mx-auto flex min-h-[42rem] max-w-[1520px] flex-col px-6 pb-0 pt-12 lg:min-h-[46rem] lg:flex-row lg:items-center lg:px-10 lg:pt-16 xl:px-14">
        <div className="z-20 max-w-[36rem] text-center lg:text-left">
          <p className="mb-5 inline-flex rounded-full border border-white/18 bg-white/12 px-4 py-2 text-sm font-medium text-white/92 backdrop-blur-sm">
            Trusted learning for modern wellness careers
          </p>

          <h1 className="text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl xl:text-[5.2rem]">
            Learn with
            <br />
            clarity, apply
            <br />
            with
            <br />
            confidence,
            <br />
            grow for the
            <br />
            long term.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/78 lg:mx-0 lg:text-lg">
            Unitus blends practical nutrition education, expert-led teaching,
            and career-focused learning into one clear path.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/courses"
              className="inline-flex h-13 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-slate-950 transition hover:bg-white/92"
            >
              Explore courses
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/16"
            >
              Speak with our team
            </Link>
          </div>
        </div>

        <div className="relative mt-10 flex w-full flex-col items-center pb-0 lg:mt-0 lg:min-h-[40rem] lg:flex-1">
          <div className="absolute bottom-0 left-1/2 z-20 hidden w-[29rem] -translate-x-1/2 lg:block xl:w-[33rem]">
            <div className="relative h-[33rem] w-full xl:h-[38rem]">
              <Image
                src="/assets/courses/banner-01.webp"
                alt="Learner hero"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>
          </div>

          <div className="relative z-30 w-full max-w-[22rem] lg:absolute lg:right-0 lg:top-1/2 lg:max-w-[24rem] lg:-translate-y-1/2 xl:max-w-[27rem]">
            <Swiper
              modules={[Pagination, EffectCards, Autoplay]}
              effect="cards"
              loop={visibleCourses.length > 1}
              autoplay={{ delay: 3200 }}
              pagination={{ clickable: true }}
              className="pb-8"
            >
              {visibleCourses.map((course) => {
                const coupon = couponMap[course.id];
                const discount = coupon?.discount ?? 0;
                const finalPrice =
                  coupon?.finalAmount ?? Number(course.priceInr);

                return (
                  <SwiperSlide key={course.id}>
                    <div className="rounded-[30px] bg-white p-4 text-left shadow-[0_36px_90px_-50px_rgba(15,23,42,0.62)] ring-1 ring-black/6">
                      <div className="relative overflow-hidden rounded-[22px]">
                        <Image
                          alt={course.title}
                          src={course.image?.path || "/placeholder.jpg"}
                          className="h-48 w-full object-cover xl:h-56"
                          width={950}
                          height={600}
                        />

                        {discount > 0 ? (
                          <span className="absolute right-3 top-3 rounded-full bg-[var(--brand-600)] px-2.5 py-1 text-[11px] font-semibold text-white shadow-md">
                            -
                            {Math.round(
                              (discount / Number(course.priceInr)) * 100,
                            )}
                            %
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <h3 className="line-clamp-2 text-xl font-semibold text-slate-950">
                          {course.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-500">
                          {course.shortDescription}
                        </p>

                        <div className="mt-3 text-sm text-amber-500">
                          ★★★★★ <span className="text-slate-400">(15)</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-[var(--brand-700)]">
                            ₹
                            {new Intl.NumberFormat("en-IN").format(finalPrice)}
                          </p>
                          {discount > 0 ? (
                            <span className="text-sm text-slate-400 line-through">
                              ₹
                              {new Intl.NumberFormat("en-IN").format(
                                Number(course.priceInr),
                              )}
                            </span>
                          ) : null}
                        </div>

                        <Link
                          href={`/course/${course.slug}`}
                          className="inline-flex items-center text-sm font-semibold text-[var(--brand-700)] transition hover:text-[var(--brand-800)]"
                        >
                          Learn more
                          <ArrowRight className="ml-1 size-4" />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="relative mt-6 w-full max-w-[22rem] lg:hidden">
            <div className="relative h-[20rem] w-full">
              <Image
                src="/assets/courses/banner-01.webp"
                alt="Learner hero"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-40 hidden w-full lg:block">
        <svg
          viewBox="0 0 1440 120"
          className="h-20 w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--surface-0)"
            d="M0,64L60,69.3C120,75,240,85,360,85.3C480,85,600,75,720,64C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64V120H0Z"
          />
        </svg>
      </div>
    </section>
  );
}
