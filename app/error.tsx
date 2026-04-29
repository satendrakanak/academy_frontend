"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  const isAuthExpired = error.message === "AUTH_EXPIRED";

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-white to-red-100 px-4">
      <Card
        className="
          w-full max-w-md rounded-2xl shadow-xl border
          transform transition-all duration-500
          animate-in slide-in-from-top-6 fade-in zoom-in-95
        "
      >
        <CardContent className="flex flex-col items-center text-center p-6 space-y-5">
          {/* 🔥 Icon with subtle pulse */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          {/* 🔥 Title */}
          <h2 className="text-xl font-semibold tracking-tight">
            {isAuthExpired ? "Session expired 🔒" : "Something went wrong"}
          </h2>

          {/* 🔥 Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isAuthExpired
              ? "Your session has expired. Please refresh to continue."
              : error.message || "Unexpected error occurred. Please try again."}
          </p>

          {/* 🔥 Actions */}
          <div className="flex gap-3 w-full pt-3">
            <Button
              onClick={() => reset()}
              className="w-full flex items-center gap-2 bg-sidebar-primary hover:opacity-90 transition"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Button>

            {isAuthExpired ? (
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/login")}
                className="w-full flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="w-full"
              >
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
