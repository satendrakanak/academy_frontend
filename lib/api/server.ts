import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/config";

export const apiServer = async (url: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  let cookieHeader = cookieStore.toString();

  // 🔹 Step 1: request
  let res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  // 🔹 Step 2: if unauthorized → refresh
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-tokens`, {
      method: "POST",
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });

    if (!refreshRes.ok) return null;

    const setCookie = refreshRes.headers.get("set-cookie");
    if (setCookie) cookieHeader = setCookie;

    // 🔁 retry original request
    res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        cookie: cookieHeader,
      },
      cache: "no-store",
    });
  }

  if (!res.ok) return null;

  return res.json();
};
