"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavbarItemProps {
  item: {
    label: string;
    href: string;
    hasChild?: boolean;
    children?: {
      label: string;
      href: string;
    }[];
  };
}

const NavbarItem = ({ item }: NavbarItemProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === item.href || pathname?.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      className={cn(
        "relative inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-[var(--brand-600)] dark:text-slate-200 dark:hover:text-white xl:px-4",
        isActive &&
          "bg-[color-mix(in_oklab,var(--brand-50)_78%,white)] text-[var(--brand-700)] shadow-[0_10px_30px_-18px_rgba(37,99,235,0.45)] dark:bg-white/10 dark:text-white",
      )}
    >
      {item.label}
    </Link>
  );
};

export default NavbarItem;
