"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileMenuProps {
  isOwner?: boolean;
}

export function ProfileMenu({ isOwner }: ProfileMenuProps) {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", key: "dashboard" },
    { label: "My Courses", key: "my-courses" },
    { label: "Exams", key: "exams" },
    { label: "Orders", key: "orders" },
    { label: "Certificates", key: "certificates" },
    { label: "Profile", key: "profile" },
    ...(isOwner ? [{ label: "Settings", key: "settings" }] : []),
  ];

  return (
    <div className="mt-8">
      <div className="flex gap-3 overflow-x-auto rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_20px_45px_-38px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[rgba(11,18,32,0.86)] dark:shadow-[0_28px_70px_-40px_rgba(0,0,0,0.65)]">
        {menu.map((item) => {
          const isActive = pathname.includes(item.key);

          return (
            <Link
              key={item.key}
              href={`/${item.key}`}
              className={`whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[var(--brand-600)] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
