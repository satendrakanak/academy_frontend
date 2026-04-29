import { apiServer } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { Category } from "@/types/category";

export const categoryServerService = {
  getAll: () => apiServer.get<ApiResponse<{ data: Category[] }>>("/categories"),
  getById: (id: string) =>
    apiServer.get<ApiResponse<Category>>(`/categories/${id}`),
};
