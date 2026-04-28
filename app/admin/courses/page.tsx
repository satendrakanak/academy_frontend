import { CoursesList } from "@/components/admin/courses/courses-list";
import { getErrorMessage } from "@/lib/error-handler";
import { courseServerService } from "@/services/courses/course.server";
import { Course } from "@/types/course";
const CoursesPage = async () => {
  let courses: Course[] = [];
  try {
    const response = await courseServerService.getAllCourses();
    courses = response.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div>
      <CoursesList courses={courses} />
    </div>
  );
};

export default CoursesPage;
