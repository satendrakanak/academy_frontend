import type { ApiErrorResponse } from "@/types/api";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // 🔴 Error handling
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
  return response.json() as Promise<T>;
}
