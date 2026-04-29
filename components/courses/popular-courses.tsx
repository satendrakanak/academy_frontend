import { CouponBulkClient } from "../coupon/coupon-bulk-client";
import { Course } from "@/types/course";

interface PopularCoursesProps {
  courses: Course[];
}

export default function PopularCourses({ courses }: PopularCoursesProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,var(--brand-50)_100%)] py-22">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-600)]">
            Popular Courses
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose a path that feels purposeful, not overwhelming.
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
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
