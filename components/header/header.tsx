"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Container from "@/components/container";
import MobileMenuIcon from "@/components/header/mobile-menu-icon";
import { Navbar } from "@/components/header/navbar";
import { cn } from "@/lib/utils";
import { WebsiteNavUser } from "../auth/website-nav-user";
import { CartIcon } from "./cart-icon";

interface HeaderProps {
  isHomePage?: boolean;
}

export const Header = ({ isHomePage }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = isHomePage
    ? scrolled
      ? "bg-white/80 backdrop-blur-md shadow-md border-b border-[#e0cfc1]"
      : "bg-transparent"
    : "bg-white/90 backdrop-blur-md shadow-sm border-b border-[#e0cfc1]";

  return (
    <header
      className={cn(
        "fixed left-0 w-full z-50 transition-all duration-300",
        "top-10",
        headerClass,
      )}
    >
      <div>
        <Container>
          {/* 🔥 SINGLE ROW CLEAN LAYOUT */}
          <div className="flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                <MobileMenuIcon />
              </div>
              <Logo />
            </div>

            {/* CENTER (Desktop Navbar) */}
            <div className="hidden lg:flex">
              <Navbar />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <CartIcon />

              <WebsiteNavUser />
            </div>
          </div>

          {/* Tablet Navbar */}
          <div className="hidden md:flex lg:hidden justify-center border-t border-[#e0cfc1] mt-3 pt-2">
            <Navbar />
          </div>
        </Container>
      </div>
    </header>
  );
};
