import { apiServer } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { Gateway, PaymentGatewayAdmin } from "@/types/settings";

export const settingsServerService = {
  getGatewaysInfo: () =>
    apiServer.get<ApiResponse<Gateway[]>>("/settings/gateways/active"),

  getGateways: () =>
    apiServer.get<ApiResponse<PaymentGatewayAdmin[]>>("/settings/gateways"),
};
