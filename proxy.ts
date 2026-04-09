import { NextRequest, NextResponse } from "next/server";
import { publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";

// 🔥 helper → prefix match
const matchRoute = (routes: string[], pathname: string) => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  const token = request.cookies.get("accessToken")?.value;

  // ✅ Route checks (improved)
  const isPublicRoute = matchRoute(publicRoutes, pathname);
  const isAuthRoute = matchRoute(authRoutes, pathname);

  // =========================
  // 🟢 1. Public routes → allow
  // =========================
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // =========================
  // 🔐 2. Auth routes (login/signup)
  // =========================
  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url),
      );
    }
    return NextResponse.next();
  }

  // =========================
  // 🚫 3. Private routes → no token
  // =========================
  if (!token) {
    const loginUrl = new URL("/auth/sign-in", request.url);

    // 🔥 redirect back after login
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // =========================
  // ✅ 4. Allow
  // =========================
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
