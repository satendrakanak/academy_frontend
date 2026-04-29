import { apiServer } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { Gateway } from "@/types/settings";

export const settingsServerService = {
  getGatewaysInfo: () =>
    apiServer.get<ApiResponse<Gateway[]>>("/settings/gateways/active"),
};
