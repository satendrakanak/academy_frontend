"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type { User } from "@/types/user";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type SessionContextType = User | null;

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: React.ReactNode;
  session: SessionContextType;
  hasSession: boolean;
}

// ✅ Provider
export const SessionProvider = ({
  children,
  session,
  hasSession,
}: SessionProviderProps) => {
  const router = useRouter();
  const hasTriedRefresh = useRef(false);
  useEffect(() => {
    const tryRefresh = async () => {
      // 👇 only if session null, hasSession AND not already tried
      if (hasSession && !session && !hasTriedRefresh.current) {
        hasTriedRefresh.current = true;
        try {
          await authService.refreshToken();
          router.refresh();
        } catch {
          console.log("❌ Refresh failed");
        }
      }
    };

    tryRefresh();
  }, [session]);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

// ✅ Hook
export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within SessionProvider");
  }

  return context;
};
