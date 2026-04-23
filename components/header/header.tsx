"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Container from "@/components/container";
import MobileMenuIcon from "@/components/header/mobile-menu-icon";
import { Navbar } from "@/components/header/navbar";
import { cn } from "@/lib/utils";

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
        "fixed left-0 w-full z-50 duration-300 transition-all ease-in-out",
        scrolled ? "top-0" : "top-10",
        headerClass,
      )}
    >
      <div className="py-3">
        <Container>
          <div className="flex flex-col gap-3">
            {/* ==== Top Row ==== */}
            <div className="relative flex flex-row items-center justify-between gap-3">
              {/* Left: Mobile menu icon (visible only on mobile) */}
              <div className="block md:hidden">
                <MobileMenuIcon />
              </div>

              {/* Center: Logo (absolutely centered on mobile) */}
              <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 mx-auto md:mx-0">
                <Logo />
              </div>

              {/* Right: CTA + Icons */}
              <div className="flex items-center gap-4"></div>
            </div>

            {/* ==== Second Row: Navbar for Tablet only ==== */}
            <div className="hidden md:flex lg:hidden justify-center border-t border-[#e0cfc1] pt-2 force-tablet-navbar">
              <Navbar />
            </div>

            {/* ==== Navbar for Desktop (inline, top row) ==== */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 force-desktop-navbar">
              <Navbar />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};
