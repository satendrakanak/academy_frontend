"use client";
import Link from "next/link";
import { useSiteSettings } from "@/context/site-settings-context";

const Logo = ({ footer = false }: { footer?: boolean }) => {
  const { site } = useSiteSettings();
  const src = footer
    ? site.footerLogoUrl || site.logoUrl || "/assets/unitus-logo.png"
    : site.logoUrl || "/assets/unitus-logo.png";

  return (
    <Link href="/" className="flex items-center justify-start">
      <div className="relative w-45 h-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={site.siteName || "logo"}
          src={src}
          width={250}
          height={60}
          className="h-16 w-auto object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
