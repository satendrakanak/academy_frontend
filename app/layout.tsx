import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/context/session-context";
import { getSession } from "@/lib/auth";
import { Toaster } from "sonner";
import { headers } from "next/headers";
import { buildMetadata, siteConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-admin",
});

export const metadata: Metadata = {
  ...buildMetadata({}),
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const headerList = await headers();
  const hasSession = headerList.get("x-has-session") === "true";
  return (
    <SessionProvider session={session} hasSession={hasSession}>
      <html lang="en" className={`${inter.className}  h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
