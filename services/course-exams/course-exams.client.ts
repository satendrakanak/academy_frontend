import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { CourseExamLearnerPayload } from "@/types/course";

export const courseExamsClientService = {
  getForCourse: (courseId: number) =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<CourseExamLearnerPayload>>(
        `/api/course-exams/course/${courseId}`,
      ),
    ),
  submitAttempt: (
    courseId: number,
    answers: Array<{ questionId: string; selectedOptionIds: string[] }>,
  ) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<CourseExamLearnerPayload["latestAttempt"]>>(
        `/api/course-exams/course/${courseId}/attempts`,
        { answers },
      ),
    ),
};
