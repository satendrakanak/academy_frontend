import { Course } from "@/types/course";

export const getCourseMeta = (course: Course) => {
  const totalLectures = course.chapters?.filter((c) => c.video).length || 0;

  const approxMinutes = totalLectures * 5;

  const hours = Math.floor(approxMinutes / 60);
  const minutes = approxMinutes % 60;

  const totalDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return {
    totalLectures,
    totalDuration,
  };
};
