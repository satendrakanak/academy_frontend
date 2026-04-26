"use client";

import { LogOut, User, Settings, LayoutDashboard, Loader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-context";
import { apiClient } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";

export const WebsiteNavUser = () => {
  const { user } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await apiClient.post("/api/auth/sign-out");

      router.refresh();
      router.push("/auth/sign-in");
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      {/* 🔥 TRIGGER */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center
          outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
          <Avatar className="h-9 w-9">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.firstName} />
            ) : null}
            <AvatarFallback>{initials || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {/* 🔥 CONTENT */}
      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl shadow-md p-2"
      >
        <div className="flex py-2 gap-x-2">
          <Avatar className="h-9 w-9">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.firstName} />
            ) : null}
            <AvatarFallback>{initials || "U"}</AvatarFallback>
          </Avatar>
          {/* USER INFO */}
          <div className="">
            <p className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* MENU */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="w-4 h-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push("/settings")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* LOGOUT */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-red-600"
        >
          {loading ? (
            <Loader className="animate-spin w-4 h-4" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          {loading ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
