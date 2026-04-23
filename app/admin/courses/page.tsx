import { DataTable } from "@/components/admin/data-table/data-table";
import { courseColumns } from "@/components/admin/data-table/columns";
import { courseServerService } from "@/services/courses/course.server";
import { Course } from "@/types/course";
const CoursesPage = async () => {
  let courses: Course[] = [];
  try {
    const response = await courseServerService.getAll();
    courses = response.data.data;
    console.log("Courses", courses);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <DataTable data={courses} columns={courseColumns} />
    </div>
  );
};

export default CoursesPage;
