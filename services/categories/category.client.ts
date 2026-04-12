import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { Category, CreateCategoryPayload } from "@/types/category";
export const categoryClientService = {
  getAllBy: (type: string) =>
    withAuthRetry(() =>
      apiClient.get<Promise<{ data: Category[] }>>(
        `/api/categories/by-type?type=${type}`,
      ),
    ),

  create: (data: CreateCategoryPayload) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<Category>>("/api/categories", data),
    ),
};
