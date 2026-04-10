import type { ApiErrorResponse } from "@/types/api";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(
  endpoint: string,
  method: Method,
  body?: unknown,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(endpoint, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...options,
  });

  // 🔴 Error handling (same tera wala)
  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const error: ApiErrorResponse = await response.json();

      if (Array.isArray(error.message)) {
        message = error.message.join(", ");
      } else if (typeof error.message === "string") {
        message = error.message;
      }
    } catch {
      message = response.statusText;
    }

    throw new Error(message);
  }

  // ✅ Handle no-content responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, "GET", undefined, options),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, "POST", body, options),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, "PATCH", body, options),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, "DELETE", undefined, options),
};

export const withAuthRetry = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("unauthorized")
    ) {
      console.log("⚠️ Token expired → refreshing...");

      try {
        await apiClient.post("/api/auth/refresh-tokens");
        console.log("✅ Token refreshed");

        return await fn(); // 🔥 retry same request
      } catch (refreshError) {
        console.log("❌ Refresh failed");

        throw refreshError;
      }
    }

    throw error;
  }
};
