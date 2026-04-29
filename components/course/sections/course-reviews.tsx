import { CourseTestimonialsSection } from "@/components/testimonials/course-testimonials-section";
import { Testimonial } from "@/types/testimonial";

export const CourseReviews = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  return <CourseTestimonialsSection testimonials={testimonials} />;
};
