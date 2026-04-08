import { config } from "./config";
import type { ApiErrorResponse } from "@/types/api";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  console.log("Response", response);

  if (!response.ok) {
    const error: ApiErrorResponse = await response.json();

    console.log("Error", error);

    let message = "Something went wrong";

    if (Array.isArray(error.message)) {
      message = error.message.join(", ");
    } else if (typeof error.message === "string") {
      message = error.message;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
