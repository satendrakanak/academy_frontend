import { TestimonialsList } from "@/components/admin/testimonials/testimonials-list";
import { getErrorMessage } from "@/lib/error-handler";
import { testimonialServerService } from "@/services/testimonials/testimonial.server";
import { Testimonial } from "@/types/testimonial";

const TestimonialsPage = async () => {
  let testimonials: Testimonial[] = [];

  try {
    const response = await testimonialServerService.getAll();
    testimonials = response.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div>
      <TestimonialsList testimonials={testimonials} />
    </div>
  );
};

export default TestimonialsPage;
