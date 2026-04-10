import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import {
  Course,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "@/types/course";
export const courseClientService = {
  create: (data: CreateCoursePayload) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<Course>>("/api/courses", data),
    ),

  getById: (id: string) =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<Course>>(`/api/courses/${id}`),
    ),

  update: (id: string, data: UpdateCoursePayload) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<Course>>(`/api/courses/${id}`, data),
    ),
};
