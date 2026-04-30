import Link from "next/link";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/types/testimonial";
import { TestimonialCard } from "./testimonial-card";

export const FeaturedTestimonialsSection = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  if (!testimonials.length) return null;

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklab,var(--brand-100)_60%,white)_0%,_transparent_30%),linear-gradient(180deg,var(--brand-50)_0%,#ffffff_48%,color-mix(in_oklab,var(--brand-50)_70%,white)_100%)] py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--brand-200)_35%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--brand-200)_35%,transparent)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <Container>
        <div className="relative z-10">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-700)]">
                Client Testimonials
              </p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Real transformations, not generic praise.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                Explore a mix of written stories and video experiences from
                learners who trusted Unitus with their growth.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-[var(--brand-200)] bg-white/80 px-6 text-[var(--brand-800)] hover:bg-[var(--brand-50)]"
            >
              <Link href="/client-testimonials">View All Testimonials</Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                variant="featured"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
