"use client";

import NavbarItem from "@/components/header/navbar-item";
import { navbarItems } from "@/data/menu";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center relative">
      <div className="flex gap-x-2">
        {navbarItems.map((item) => (
          <NavbarItem key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
};
