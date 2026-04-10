import { apiServer } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { Course } from "@/types/course";

export const courseServerService = {
  getById: (id: string) => apiServer.get<ApiResponse<Course>>(`/courses/${id}`),
};
