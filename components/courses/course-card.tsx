import { Course } from "@/types/course";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] overflow-hidden group hover:scale-[1.02] transition duration-300">
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <Link href={`/course/${course.slug}`}>
          <Image
            src={course.image?.path || "/assets/default.png"}
            alt={course.imageAlt || course.title}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
        </Link>

        {/* BADGE */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          Bestseller
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col h-full">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* RATING */}
        <div className="text-yellow-500 text-sm mb-3">
          ⭐⭐⭐⭐⭐ <span className="text-gray-400">(120)</span>
        </div>

        {/* PRICE */}
        <div className="flex justify-between items-center mt-auto">
          <p className="text-blue-600 font-bold text-lg">{course.priceInr}</p>

          <button className="text-sm font-medium text-blue-600 hover:underline">
            Enroll →
          </button>
        </div>
      </div>
    </div>
  );
}
