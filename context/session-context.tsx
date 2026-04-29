"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { User } from "@/types/user";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type SessionContextType = {
  user: User | null;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: React.ReactNode;
  session: User | null;
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
  const [user, setUser] = useState<User | null>(session);
  const [isLoading, setIsLoading] = useState(!session && hasSession);
  useEffect(() => {
    setUser(session);
  }, [session]);
  useEffect(() => {
    const tryRefresh = async () => {
      // 👇 only if session null, hasSession AND not already tried
      if (hasSession && !session && !hasTriedRefresh.current) {
        hasTriedRefresh.current = true;
        try {
          setIsLoading(true);
          await authService.refreshToken();
          router.refresh();
        } catch {
          console.log("❌ Refresh failed");
        } finally {
          setIsLoading(false);
        }
      }
    };

    tryRefresh();
  }, [hasSession, user, router]);
  return (
    <SessionContext.Provider value={{ user, isLoading }}>
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
