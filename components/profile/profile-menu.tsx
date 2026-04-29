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
    { label: "Certificates", key: "certificates" },
    { label: "Profile", key: "profile" },
    ...(isOwner ? [{ label: "Settings", key: "settings" }] : []),
  ];

  return (
    <div className="mt-8 border-b">
      <div className="flex gap-8 overflow-x-auto">
        {menu.map((item) => {
          const isActive = pathname.includes(item.key);

          return (
            <Link
              key={item.key}
              href={`/${item.key}`}
              className={`pb-3 whitespace-nowrap ${
                isActive
                  ? "border-b-2 border-primary font-semibold"
                  : "text-gray-500"
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
