import { apiServer } from "@/lib/api/server";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export const getSession = async (): Promise<User | null> => {
  try {
    const data = await apiServer.get<ApiResponse<User>>("/auth/profile");
    return data.data;
  } catch {
    return null;
  }
};
