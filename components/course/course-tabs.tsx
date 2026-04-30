"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WhatYouWillLearn } from "./sections/what-you-will-learn";
import { CourseContent } from "./sections/course-content";
import { CourseInstructor } from "./sections/course-instructor";
import { CourseDetails } from "./sections/course-details";
import { CourseRequirements } from "./sections/course-requirements";
import { Course } from "@/types/course";
import { Testimonial } from "@/types/testimonial";
import { CourseReviews } from "./sections/course-reviews";
import { CourseRatingReviews } from "./sections/course-rating-reviews";

const baseTabs = [
  { id: "overview", label: "Overview" },
  { id: "content", label: "Course Content" },
  { id: "details", label: "Details" },
  { id: "requirements", label: "Requirements" },
  { id: "instructor", label: "Instructor" },
  { id: "reviews", label: "Reviews" },
  { id: "testimonials", label: "Testimonials" },
];

export const CourseTabs = ({
  course,
  testimonials,
}: {
  course: Course;
  testimonials: Testimonial[];
}) => {
  const [active, setActive] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);
  const tabs = useMemo(() => baseTabs, []);

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Scroll to section
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -110;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px",
      },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  // 🔥 Active tab logic (already correct)
  useEffect(() => {
    const handleScrollActive = () => {
      let current = "overview";

      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 150) {
          current = tab.id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScrollActive);
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, [tabs]);

  return (
    <div>
      {/* 🔥 SENTINEL (invisible trigger point) */}
      <div ref={sentinelRef} />

      {/* 🔥 TABS */}
      <div
        ref={tabsRef}
        className={`z-40 mb-6 px-2 py-3 rounded-2xl transition-all duration-300 ${
          isSticky
            ? "sticky top-28 bg-primary/10 shadow-md backdrop-blur-sm"
            : "bg-white shadow-none"
        }`}
      >
        <div className="flex gap-3 overflow-x-auto px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleScroll(tab.id)}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition cursor-pointer ${
                active === tab.id
                  ? "bg-primary text-white"
                  : isSticky
                    ? "bg-white/70 text-primary hover:bg-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label.toLocaleUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 SECTIONS */}
      <div id="overview" className="mb-8 scroll-mt-32">
        <WhatYouWillLearn course={course} />
      </div>

      <div id="content" className="mb-8 scroll-mt-32">
        <CourseContent course={course} />
      </div>

      <div id="details" className="mb-8 scroll-mt-32">
        <CourseDetails course={course} />
      </div>

      <div id="requirements" className="mb-8 scroll-mt-32">
        <CourseRequirements course={course} />
      </div>

      <div id="instructor" className="mb-8 scroll-mt-32">
        <CourseInstructor course={course} />
      </div>

      <div id="reviews" className="mb-8 scroll-mt-32">
        <CourseRatingReviews course={course} />
      </div>

      <div id="testimonials" className="mb-8 scroll-mt-32">
        <CourseReviews testimonials={testimonials} />
      </div>
    </div>
  );
};
