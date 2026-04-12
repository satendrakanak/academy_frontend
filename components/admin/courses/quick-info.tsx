import { Course } from "@/types/course";
import { formatDate } from "@/utils/formate-date";

interface QuickInfoProps {
  course: Course;
}

export default function QuickInfo({ course }: QuickInfoProps) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm text-xs bg-white  text-muted-foreground space-y-1">
      <p>Course ID: #{course.id}</p>

      <p>Created At: {formatDate(course.createdAt)}</p>

      <p>Created By: {course.createdBy?.firstName || "—"}</p>

      <p>Last updated: {formatDate(course.updatedAt)}</p>

      <p>Updated By: {course.updatedBy?.firstName || "—"}</p>
    </div>
  );
}
