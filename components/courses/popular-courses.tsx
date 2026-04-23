import { CourseCard } from "./course-card";
import { Course } from "@/types/course";

interface PopularCoursesProps {
  courses: Course[];
}

export default function PopularCourses({ courses }: PopularCoursesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Popular Courses</p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose Your Favorite Course
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Explore our most popular courses designed to help you grow your
            skills and career.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
