import { CouponBulkClient } from "../coupon/coupon-bulk-client";
import { Course } from "@/types/course";

interface PopularCoursesProps {
  courses: Course[];
}

export default function PopularCourses({ courses }: PopularCoursesProps) {
  return (
    <section className="academy-section bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--brand-50)_50%,white)_100%)] dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-600)] dark:text-[var(--brand-300)]">
            Popular Courses
          </p>

          <h2 className="text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl">
            Choose a path that feels purposeful, not overwhelming.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-300">
            Explore our most loved programs, curated for practical learning and
            real momentum.
          </p>
        </div>

        {/* GRID */}
        <CouponBulkClient courses={courses} />
      </div>
    </section>
  );
}
