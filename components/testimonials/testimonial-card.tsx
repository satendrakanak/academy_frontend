"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Quote } from "lucide-react";
import { useState } from "react";

import VideoPreviewModal from "@/components/modals/video-preview-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/types/testimonial";
import { TestimonialRating } from "./testimonial-rating";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "featured" | "compact";
}

export const TestimonialCard = ({
  testimonial,
  variant = "featured",
}: TestimonialCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const isVideo = testimonial.type === "VIDEO";
  const primaryCourse = testimonial.courses?.[0] || null;

  return (
    <>
      <article
        className={`group relative overflow-hidden rounded-[28px] border border-[var(--brand-100)] bg-white shadow-[0_18px_60px_-34px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-200)] hover:shadow-[0_28px_80px_-36px_rgba(120,53,15,0.35)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(11,18,32,0.96),rgba(15,23,40,0.98))] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.58)] dark:hover:border-[var(--brand-400)]/45 ${
          variant === "featured" ? "h-full" : ""
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-400)] via-[var(--brand-500)] to-[var(--brand-700)]" />

        <div className="flex h-full flex-col p-6 md:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 ring-4 ring-[var(--brand-100)] dark:bg-white/10 dark:ring-white/8">
                <Image
                  src={testimonial.avatar?.path || "/assets/default.png"}
                  alt={testimonial.avatarAlt || testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {[testimonial.designation, testimonial.company]
                    .filter(Boolean)
                    .join(" at ") || "Verified learner"}
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="rounded-full border-[var(--brand-200)] bg-[var(--brand-50)] px-3 py-1 text-[var(--brand-700)] dark:border-white/10 dark:bg-white/8 dark:text-[var(--brand-200)]"
            >
              {isVideo ? "Video Story" : "Written Review"}
            </Badge>
          </div>

          <div className="mb-4 flex items-center justify-between gap-3">
            <TestimonialRating rating={testimonial.rating} />

            {primaryCourse && (
              <Link
                href={`/course/${primaryCourse.slug}`}
                className="text-xs font-medium text-[var(--brand-700)] underline-offset-4 hover:underline dark:text-[var(--brand-200)]"
              >
                {primaryCourse.title}
              </Link>
            )}
          </div>

          {isVideo ? (
            <div className="relative mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-[var(--brand-950)]/80 to-[var(--brand-600)]/55" />
              <div className="relative flex aspect-video flex-col justify-between p-5 text-white">
                <div className="flex items-center justify-between">
                  <Quote className="size-8 text-[var(--brand-200)]" />
                  <span className="text-xs uppercase tracking-[0.28em] text-white/70">
                    Student Voice
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="max-w-xs text-sm leading-6 text-white/80">
                    Hear {testimonial.name}&apos;s experience in their own words.
                  </p>

                  <Button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="h-11 rounded-full bg-white text-[var(--brand-900)] hover:bg-[var(--brand-50)]"
                  >
                    <PlayCircle className="mr-2 size-4" />
                    Watch Testimonial
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative mb-5 flex-1 rounded-[24px] bg-[linear-gradient(180deg,#fff_0%,var(--brand-50)_100%)] p-5 dark:bg-[linear-gradient(180deg,rgba(27,41,72,0.84)_0%,rgba(18,28,50,0.96)_100%)]">
              <Quote className="mb-4 size-8 text-[var(--brand-500)]/70 dark:text-[var(--brand-300)]/80" />
              <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-200">
                {testimonial.message}
              </p>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
            <span>
              {new Date(testimonial.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {isVideo ? "Video testimonial" : "Text testimonial"}
            </span>
          </div>
        </div>
      </article>

      <VideoPreviewModal
        videoUrl={previewOpen ? testimonial.video?.path || null : null}
        title={`${testimonial.name} testimonial`}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
};
