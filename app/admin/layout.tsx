import { AppSidebar } from "@/components/admin/layout/app-sidebar";
import Navbar from "@/components/admin/layout/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-admin",
});
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={inter.className}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <main className="flex flex-1 flex-col gap-4 p-4 bg-zinc-100">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
