import { apiServer } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { Course } from "@/types/course";

export const courseServerService = {
  getAll: () => apiServer.get<ApiResponse<{ data: Course[] }>>("/courses"),
  getById: (id: string) => apiServer.get<ApiResponse<Course>>(`/courses/${id}`),
  getBySlug: (slug: string) =>
    apiServer.get<ApiResponse<Course>>(`/courses/slug/${slug}`),
};
