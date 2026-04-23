import { Header } from "@/components/header/header";
import MobileMenu from "@/components/header/mobile-menu";
import Topbar from "@/components/header/top-bar";
import Footer from "@/components/layout/footer";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <Header />
      <MobileMenu />
      <main className="pt-[105px] md:pt-[115px] lg:pt-[115px] h-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
