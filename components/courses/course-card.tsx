"use client";

import { Course } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourseMeta } from "@/helpers/course-meta";
import {
  getCourseProgress,
  mergeCourseProgress,
} from "@/helpers/course-progress";
import { userProgressClientService } from "@/services/user-progress/user-progress.client";
import { CourseProgressBar } from "./course-progress-bar";

interface CourseCardProps {
  course: Course & {
    isEnrolled?: boolean;
    progress?: {
      progress: number;
    };
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const isInCart = useCartStore((s) => s.isInCart);
  const [meta, setMeta] = useState({
    totalLectures: 0,
    totalDuration: "0m",
  });

  const router = useRouter();

  useEffect(() => {
    const loadMeta = async () => {
      const data = await getCourseMeta(course);
      setMeta(data);
    };

    loadMeta();
  }, [course]);

  // 🔥 hydration-safe (no function call)
  const alreadyAdded = useCartStore((s) =>
    s.cartItems.some((i) => i.id === course.id),
  );

  const isEnrolled = course.isEnrolled;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (alreadyAdded) return;

    addToCart({
      id: course.id,
      title: course.title,
      price: Number(course.priceInr),
      image: course.image?.path,
      instructor: course.createdBy?.firstName,
      totalDuration: meta.totalDuration,
      totalLectures: meta.totalLectures,
    });

    toast.success("Added to cart 🛒", {
      description: course.title,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* IMAGE */}
      <div className="relative h-48">
        <Link href={`/course/${course.slug}`}>
          <Image
            src={course.image?.path || "/assets/default.png"}
            alt={course.imageAlt || course.title}
            fill
            className="object-cover"
          />
        </Link>

        {/* BADGE */}
        {!isEnrolled ? (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Bestseller
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Enrolled
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/course/${course.slug}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* ⭐ dummy rating */}
        <div className="text-yellow-500 text-sm mb-3">
          ⭐⭐⭐⭐⭐ <span className="text-gray-400">(120)</span>
        </div>
        {/* 🔥 META INFO */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span>🎬 {meta.totalLectures} lectures</span>
          <span>⏱ {meta.totalDuration}</span>
          <span>📊 {course.experienceLevel || "All Levels"}</span>
        </div>

        {/* 🔥 ENROLLED FLOW */}
        {course.isEnrolled ? (
          <CourseProgressBar
            percent={course.progress.progress}
            slug={course.slug}
          />
        ) : (
          <div className="mt-auto flex items-center justify-between">
            {/* PRICE */}
            <p className="text-primary font-semibold text-base">
              ₹{new Intl.NumberFormat("en-IN").format(Number(course.priceInr))}
            </p>

            {/* 🔥 ICON CTA */}
            <button
              onClick={handleAdd}
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition ${
                alreadyAdded
                  ? "bg-green-600 text-white border-green-600"
                  : "hover:bg-gray-100"
              }`}
              title={alreadyAdded ? "View cart" : "Add to cart"}
            >
              {alreadyAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
