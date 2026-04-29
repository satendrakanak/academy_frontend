"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";

interface SubMenuItemProps {
  label: string;
  href: string;
}

interface MenuItemProps {
  label: string;
  href: string;
  subItems?: SubMenuItemProps[];
}

const MenuItem = ({ label, href, subItems }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const handleSubMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {subItems && subItems.length > 0 ? (
        <div>
          <div
            className={cn(
              "flex items-center gap-x-2 py-3 text-sm font-[500] pl-6 transition-all text-webprimary hover:bg-sky-500/10 hover:text-sky-700 border-b border-slate-200",
              isActive &&
                "bg-webprimary text-white hover:bg-webtertary hover:text-white"
            )}
            onClick={subItems ? handleSubMenuToggle : undefined}
          >
            <span>{label}</span>
            {subItems && (
              <IoIosArrowForward
                className={`ml-auto transform transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </div>
          {subItems && isOpen && (
            <ul className="pl-6">
              {subItems.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-x-2 py-3 text-sm font-[500] pl-6 transition-all text-webprimary hover:bg-sky-500/10 hover:text-sky-700 border-b border-slate-200",
                        isActive &&
                          "bg-webprimary text-white hover:bg-webtertary hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <SheetClose asChild>
            <Link
              href={href}
              className={cn(
                "flex items-center py-3 gap-x-2 text-sm font-[500] pl-6 transition-all text-webprimary hover:bg-webprimary/10 hover:text-webprimary border-b border-slate-200",
                isActive &&
                  "bg-webprimary text-white hover:bg-webtertary hover:text-white"
              )}
            >
              {label}
            </Link>
          </SheetClose>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
