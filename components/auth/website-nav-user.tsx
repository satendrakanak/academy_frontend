"use client";

import {
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  Loader,
  BookOpen,
  Award,
} from "lucide-react";

import Link from "next/link";

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

      router.refresh(); // ✅ ye rehne de (server sync ke liye)
      router.push("/auth/sign-in"); // ✅ yahan allowed hai
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
  outline-none ring-0 border-0 focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0
  active:outline-none active:ring-0 active:border-0"
        >
          <Avatar className="h-9 w-9">
            {user.avatar ? (
              <AvatarImage src={user.avatar.path} alt={user.firstName} />
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
        {/* USER INFO */}
        <div className="flex py-2 gap-x-2">
          <Avatar className="h-9 w-9">
            {user.avatar ? (
              <AvatarImage src={user.avatar.path} alt={user.firstName} />
            ) : null}
            <AvatarFallback>{initials || "U"}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </p>

            <p title={user.email} className="text-xs text-gray-500 break-all">
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* MENU */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/my-courses"
              className="flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              My Courses
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/certificates"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              Certificates
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
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
