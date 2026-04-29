import { apiServer } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { Course } from "@/types/course";
import { DashboardStats, User, WeeklyProgress } from "@/types/user";

export const userServerService = {
  getAll: () => apiServer.get<ApiResponse<{ data: User[] }>>("/users"),
  getById: (userId: number) =>
    apiServer.get<ApiResponse<User>>(`/users/${userId}`),
  getEnrolledCourses: (userId: number) =>
    apiServer.get<ApiResponse<Course[]>>(`/courses/enrolled/${userId}`),

  getDashboardStats: (userId: number) =>
    apiServer.get<ApiResponse<DashboardStats>>(
      `/users/dashboard-stats/${userId}`,
    ),

  getWeeklyProgress: (userId: number) =>
    apiServer.get<ApiResponse<WeeklyProgress[]>>(
      `/users/weekly-progress/${userId}`,
    ),

  getMe: () => apiServer.get<ApiResponse<User>>("/users/me"),

  getFaculties: () => apiServer.get<ApiResponse<User[]>>("/users/all-faculty"),
};
