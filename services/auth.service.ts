import { apiClient } from "@/lib/api/client";
import {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";

export const authService = {
  register: (data: RegisterPayload) =>
    apiClient<{ message: string }>("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: LoginPayload) =>
    apiClient<AuthResponse>("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  verifyEmail: (token: string) =>
    apiClient<AuthResponse>(
      `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
      },
    ),
  forgotPassword: (data: ForgotPasswordPayload) =>
    apiClient<AuthResponse>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  resetPassword: (data: ResetPasswordPayload) =>
    apiClient<AuthResponse>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
