import { Testimonial } from "@/types/testimonial";
import { TestimonialCard } from "./testimonial-card";

export const CourseTestimonialsSection = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
          Testimonials
        </p>
        <h3 className="text-2xl font-bold text-slate-900">
          Learners from this course share what changed for them.
        </h3>
        <p className="mt-3 text-slate-600">
          Browse real feedback from students who completed or are actively
          learning in this program.
        </p>
      </div>

      {testimonials.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              variant="compact"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          Course testimonials will appear here as soon as approved feedback is
          available.
        </div>
      )}
    </section>
  );
};
