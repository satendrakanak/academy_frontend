import { apiClient } from "@/lib/api-client";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  register: (data: RegisterPayload) =>
    apiClient<{ message: string }>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: LoginPayload) =>
    apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
