"use client";

import { createContext, useContext } from "react";
import type { User } from "@/types/user";

type SessionContextType = User | null;

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: React.ReactNode;
  session: SessionContextType;
}

// ✅ Provider
export const SessionProvider = ({
  children,
  session,
}: SessionProviderProps) => {
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
