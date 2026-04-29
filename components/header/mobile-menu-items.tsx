"use client";

import MenuItem from "@/components/header/menu-item";
import { navbarItems } from "@/data/menu";
import Logo from "@/components/logo";
import { GetStartedNow } from "./get-started-now";

export const MobileMenuItems = () => {
  return (
    <nav className="flex flex-col h-full border-r shadow-sm overflow-y-auto ">
      <div className="border-b px-4 pt-6 pb-4 flex flex-col items-center gap-5">
        <Logo />
        <GetStartedNow className="bg-linear-to-r from-green-600 to-green-700" />
      </div>
      <div className="flex flex-col w-full">
        {navbarItems.map((item) => (
          <MenuItem key={item.label} label={item.label} href={item.href} />
        ))}
      </div>
    </nav>
  );
};
