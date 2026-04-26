import { Course } from "@/types/course";
import Container from "../container";
import CourseRatingDetails from "../courses/course-rating-details";
import CourseAuthor from "../courses/course-author";
import CourseUpdateDetails from "../courses/course-update-details";
import guestAuthor from "@/public/assets/guest-user.webp";
import { formatDate } from "@/utils/formate-date";

interface CourseHeroProps {
  course: Course;
}

export const CourseHero = ({ course }: CourseHeroProps) => {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* 🔥 TOP → BOTTOM GRADIENT (as you wanted) */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-indigo-500 to-red-500" />

      {/* ✨ LIGHT GLOSS (subtle shine, not overdone) */}
      <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-transparent" />

      {/* ✨ SOFT DEPTH GLOW */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-white/10 blur-[120px] rounded-full" />

      <Container>
        <div className="relative z-10 grid grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT (UNCHANGED) */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-2xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
              {course.title}
            </h1>

            {course.shortDescription && (
              <p className="text-white/80 text-center lg:text-left mb-4">
                {course.shortDescription}
              </p>
            )}

            <CourseRatingDetails
              rating={4.8}
              reviews={1560}
              enrolledStudentCount={2365}
            />

            <CourseAuthor
              authorName={`${course.createdBy.firstName} ${course.createdBy.lastName}`}
              authorPhoto={guestAuthor}
            />

            <div className="bg-white backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 inline-block mt-4">
              <CourseUpdateDetails
                lastUpdateDate={formatDate(course.updatedAt)}
                language={course.language || "English"}
                certificate="Certified Course"
              />
            </div>
          </div>

          {/* RIGHT EMPTY (UNCHANGED) */}
          <div className="hidden lg:block lg:col-span-5"></div>
        </div>
      </Container>
    </section>
  );
};
