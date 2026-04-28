"use client";

import Link from "next/link";
import { Home, BookOpen, User, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-5 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">LMS</h2>

        <nav className="space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <Home size={18} /> Dashboard
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <BookOpen size={18} /> My Courses
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <User size={18} /> Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="font-semibold text-lg">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gray-300" />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
