import Container from "@/components/container";
import { TestimonialsFilterBar } from "@/components/testimonials/testimonials-filter-bar";
import { TestimonialsPagination } from "@/components/testimonials/testimonials-pagination";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { getErrorMessage } from "@/lib/error-handler";
import { courseServerService } from "@/services/courses/course.server";
import { testimonialServerService } from "@/services/testimonials/testimonial.server";
import { Course } from "@/types/course";
import { Testimonial, TestimonialType } from "@/types/testimonial";

const buildPageHref = (
  current: Record<string, string | undefined>,
  page: number,
) => {
  const params = new URLSearchParams();

  if (current.type) params.set("type", current.type);
  if (current.courseId) params.set("courseId", current.courseId);
  if (page > 1) params.set("page", String(page));

  return `/client-testimonials${params.toString() ? `?${params}` : ""}`;
};

export default async function ClientTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    courseId?: string;
    page?: string;
  }>;
}) {
  const { type, courseId, page } = await searchParams;

  const selectedType =
    type === "TEXT" || type === "VIDEO" ? (type as TestimonialType) : undefined;
  const selectedCourseId = courseId ? Number(courseId) : undefined;
  const currentPage = page ? Math.max(Number(page), 1) : 1;

  let testimonials: Testimonial[] = [];
  let totalPages = 1;

  try {
    const response = await testimonialServerService.getPublic({
      type: selectedType,
      courseId: Number.isNaN(selectedCourseId) ? undefined : selectedCourseId,
      page: currentPage,
      limit: 9,
    });
    testimonials = response.data.data;
    totalPages = response.data.meta.totalPages || 1;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  let courses: Course[] = [];
  try {
    const response = await courseServerService.getAll();
    courses = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_36%,#eff6ff_100%)] py-20">
      <Container>
        <section className="mb-10 rounded-[32px] bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_30%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#38bdf8_100%)] px-6 py-14 text-white md:px-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Client Testimonials
          </p>
          <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">
            Stories from learners who trusted the process and saw results.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
            Explore featured written reviews and video testimonials, then drill
            down by course to see exactly how learners experienced Unitus.
          </p>
        </section>

        <div className="space-y-8">
          <TestimonialsFilterBar courses={courses} />

          {testimonials.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  variant="featured"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              No testimonials found for the selected filters.
            </div>
          )}

          <TestimonialsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildHref={(nextPage) =>
              buildPageHref(
                {
                  type: selectedType,
                  courseId: courseId,
                },
                nextPage,
              )
            }
          />
        </div>
      </Container>
    </div>
  );
}
