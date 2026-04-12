import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { CreateTagPayload, Tag } from "@/types/tag";
export const tagClientService = {
  getAll: () =>
    withAuthRetry(() => apiClient.get<Promise<{ data: Tag[] }>>("/api/tags/")),

  create: (data: CreateTagPayload) =>
    withAuthRetry(() => apiClient.post<ApiResponse<Tag>>("/api/tags", data)),
  bulkCreate: (names: string[]) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<Tag[]>>("/api/tags/bulk", {
        names,
      }),
    ),
};
