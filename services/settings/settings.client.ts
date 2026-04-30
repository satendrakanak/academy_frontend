import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import {
  PaymentGatewayAdmin,
  UpsertPaymentGatewayPayload,
} from "@/types/settings";

export const settingsClientService = {
  getPaymentConfig: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<{ keyId: string }>>(
        "/api/settings/payment-config",
      ),
    ),

  getGateways: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<PaymentGatewayAdmin[]>>(
        "/api/settings/gateways",
      ),
    ),

  upsertGateway: (data: UpsertPaymentGatewayPayload) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<PaymentGatewayAdmin>>(
        "/api/settings/gateway",
        data,
      ),
    ),
};
