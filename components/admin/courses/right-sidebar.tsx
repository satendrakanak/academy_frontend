"use client";

import { PricingForm } from "./pricing-form";
import { TagsForm } from "./tags-form";
import { CategoryForm } from "./category-form";
import ActionForm from "./action-form";
import QuickInfo from "./quick-info";
import { Course } from "@/types/course";
import { FeaturedImageForm } from "./featured-image-form";

interface RightSidebarProps {
  course: Course;
}

export const RightSidebar = ({ course }: RightSidebarProps) => {
  return (
    <div className="sticky top-24 space-y-4">
      {/* 🔥 Publish Card */}
      <ActionForm />

      {/* 🔥 Featured Image */}
      <FeaturedImageForm course={course} />
      {/* 🔥 Category */}
      <CategoryForm course={course} />

      {/* 🔥 Tags */}
      <TagsForm course={course} />

      {/* 🔥 Pricing */}
      <PricingForm course={course} />
      {/* 🔥 Quick Info */}
      <QuickInfo course={course} />
    </div>
  );
};
