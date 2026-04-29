import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import {
  ChangePasswordPayload,
  CreateUserPayload,
  Role,
  UpdateFacultyProfilePayload,
  UpdateProfilePayload,
  UpdateUserPayload,
  User,
} from "@/types/user";
export const userClientService = {
  create: (data: CreateUserPayload) =>
    withAuthRetry(() => apiClient.post<ApiResponse<User>>("/api/users", data)),

  update: (id: number, data: UpdateUserPayload) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<User>>(`/api/users/update/${id}`, data),
    ),
  updateProfile: (id: number, data: UpdateProfilePayload) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<User>>(
        `/api/users/update-profile/${id}`,
        data,
      ),
    ),

  updateFacultyProfile: (id: number, data: UpdateFacultyProfilePayload) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<User>>(
        `/api/users/faculty-profile/${id}`,
        data,
      ),
    ),
  updateUser: (data: UpdateUserPayload) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<User>>(`/api/users/me`, data),
    ),

  changePassword: (data: ChangePasswordPayload) =>
    withAuthRetry(() =>
      apiClient.patch<ApiResponse<User>>(`/api/users/change-password`, data),
    ),

  getAllRoles: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<Role[]>>(`/api/roles-permissions`),
    ),

  delete: (id: number) =>
    withAuthRetry(() =>
      apiClient.delete<ApiResponse<{ message: string }>>(`/api/users/${id}`),
    ),

  getAllFaculties: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<User[]>>(`/api/users/all-faculty`),
    ),
};
