import { AppSidebar } from "@/components/admin/layout/app-sidebar";
import { AdminAccessGate } from "@/components/admin/layout/admin-access-gate";
import Navbar from "@/components/admin/layout/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/access-control";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-admin",
});
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (session && !canAccessAdmin(session)) {
    redirect("/");
  }

  return (
    <div className={inter.className}>
      <AdminAccessGate>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Navbar />
            <main className="flex flex-1 flex-col gap-4 bg-zinc-100 p-4">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </AdminAccessGate>
    </div>
  );
}
