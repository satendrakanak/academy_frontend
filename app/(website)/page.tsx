import ArticlesSection from "@/components/articles/articles-section";
import Faculty from "@/components/courses/faculty";
import HowItWorks from "@/components/courses/how-it-works";
import PopularCourses from "@/components/courses/popular-courses";
import StatsTimeline from "@/components/courses/stats-timeline";
import WhyJoinOurCourses from "@/components/courses/why-join-our-courses";
import Hero from "@/components/sliders/hero";
import { getErrorMessage } from "@/lib/error-handler";
import { articleServerService } from "@/services/articles/article.server";
import { courseServerService } from "@/services/courses/course.server";
import { testimonialServerService } from "@/services/testimonials/testimonial.server";
import { Article } from "@/types/article";
import { Course } from "@/types/course";
import { Testimonial } from "@/types/testimonial";
import { FeaturedTestimonialsSection } from "@/components/testimonials/featured-testimonials-section";

export default async function Home() {
  let courses: Course[] = [];
  try {
    const response = await courseServerService.getPopularCourses();
    courses = response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  let articles: Article[] = [];
  try {
    const response = await articleServerService.getFeaturedArticles();
    articles = response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  let testimonials: Testimonial[] = [];
  try {
    const response = await testimonialServerService.getFeatured(6);
    testimonials = response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
  return (
    <div>
      <Hero courses={courses} />
      <StatsTimeline />
      <PopularCourses courses={courses} />
      <FeaturedTestimonialsSection testimonials={testimonials} />
      <WhyJoinOurCourses />
      <Faculty />
      <HowItWorks />
      <ArticlesSection articles={articles} />
    </div>
  );
}
