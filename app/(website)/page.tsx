import ArticlesSection from "@/components/articles/articles-section";
import Faculty from "@/components/courses/faculty";
import HowItWorks from "@/components/courses/how-it-works";
import PopularCourses from "@/components/courses/popular-courses";
import StatsTimeline from "@/components/courses/stats-timeline";
import WhyJoinOurCourses from "@/components/courses/why-join-our-courses";
import Hero from "@/components/sliders/hero";
import { courseServerService } from "@/services/courses/course.server";
import { Course } from "@/types/course";

export default async function Home() {
  let courses: Course[] = [];
  try {
    const response = await courseServerService.getAll();
    courses = response.data;
    console.log("Courses", courses);
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <Hero courses={courses} />
      <StatsTimeline />
      <PopularCourses courses={courses} />
      <WhyJoinOurCourses />
      <Faculty />
      <HowItWorks />
      <ArticlesSection />
    </div>
  );
}
