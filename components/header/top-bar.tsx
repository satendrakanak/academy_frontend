"use client";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import Container from "@/components/container";
import { useSiteSettings } from "@/context/site-settings-context";
import { cn } from "@/lib/utils";

interface TopbarProps {
  hidden?: boolean;
}

const Topbar = ({ hidden }: TopbarProps) => {
  const { site } = useSiteSettings();

  const socialLinks = [
    {
      name: "Facebook",
      href: site.facebookUrl,
      icon: <FaFacebook className="size-4 text-blue-500" />,
    },
    {
      name: "Youtube",
      href: site.youtubeUrl,
      icon: <FaYoutube className="size-4 text-red-500" />,
    },
    {
      name: "Instagram",
      href: site.instagramUrl,
      icon: <FaInstagram className="size-4 text-pink-500" />,
    },
    {
      name: "Twitter",
      href: site.twitterUrl,
      icon: <FaTwitter className="size-4 text-blue-400" />,
    },
    {
      name: "LinkedIn",
      href: site.linkedinUrl,
      icon: <FaLinkedin className="size-4 text-blue-500" />,
    },
  ].filter((item) => item.href);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 w-full border-b border-white/8 bg-slate-900/95 py-1.5 text-white backdrop-blur-md transition-all duration-300 dark:border-white/6 dark:bg-[#081020]/90 md:py-2",
        hidden && "-translate-y-full opacity-0",
      )}
    >
      <Container>
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:justify-between sm:gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="rounded-full border border-white/10 bg-white/95 p-1.5 transition hover:-translate-y-0.5 hover:bg-white"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] leading-none text-white/85 md:text-sm">
            {site.supportPhone && (
              <a
                href={`tel:${site.supportPhone}`}
                className="flex items-center gap-1 transition hover:text-white"
              >
                <FaPhoneVolume className="w-3 h-3 md:w-4 md:h-4" />
                <span>{site.supportPhone}</span>
              </a>
            )}

            {site.supportEmail && (
              <a
                href={`mailto:${site.supportEmail}`}
                className="flex items-center gap-1 transition hover:text-white"
              >
                <TfiEmail className="w-3 h-3 md:w-4 md:h-4" />
                <span className="max-w-42.5 truncate">{site.supportEmail}</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
