"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

export function AdminLogo() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu className="bg-white">
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className={`transition-all duration-200 ${
            isCollapsed ? "justify-center px-2" : ""
          }`}
        >
          <Link
            href="/admin/dashboard"
            className="flex items-center w-full gap-2"
          >
            {/* Icon */}
            <div
              className={`flex items-center justify-center rounded-xl shadow-sm ${
                isCollapsed ? "size-10 mx-auto" : "size-10"
              } bg-sidebar-primary text-sidebar-primary-foreground`}
            >
              <GraduationCap className="size-5" />
            </div>

            {/* Text */}
            {!isCollapsed && (
              <div className="flex flex-col text-left leading-tight">
                <span className="font-semibold text-xl tracking-tight">
                  Unitus
                </span>
                <span className="text-xs text-muted-foreground">
                  Admin Panel
                </span>
              </div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
