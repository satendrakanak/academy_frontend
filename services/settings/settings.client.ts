import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";

export const settingsClientService = {
  getPaymentConfig: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<{ keyId: string }>>(
        "/api/settings/payment-config",
      ),
    ),
};
