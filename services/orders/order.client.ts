import { apiClient, withAuthRetry } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import {
  CreateOrderPayload,
  CreateOrderResponse,
  Order,
  VerifyPaymentPayload,
} from "@/types/order";

export const orderClientService = {
  // 🔥 Create Order
  create: (data: CreateOrderPayload) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<CreateOrderResponse>>("/api/orders", data),
    ),
  retry: (orderId: number) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<CreateOrderResponse>>(
        `/api/orders/${orderId}/retry`,
      ),
    ),
  getPaymentConfig: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<{ keyId: string }>>(
        "/api/settings/payment-config",
      ),
    ),
  verifyPayment: (data: VerifyPaymentPayload) =>
    withAuthRetry(() =>
      apiClient.post<ApiResponse<Order>>("/api/orders/verify", data),
    ),

  getMyOrders: () =>
    withAuthRetry(() =>
      apiClient.get<ApiResponse<Order[]>>("/api/orders/my-orders"),
    ),
};
