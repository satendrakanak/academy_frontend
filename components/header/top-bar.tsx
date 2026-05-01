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

const Topbar = () => {
  const { site } = useSiteSettings();
  const socialLinks = [
    {
      name: "Facebook",
      href: site.facebookUrl,
      icon: <FaFacebook className="size-4 text-blue-500 hover:text-blue-700" />,
    },
    {
      name: "Youtube",
      href: site.youtubeUrl,
      icon: <FaYoutube className="size-4 text-red-500 hover:text-red-700" />,
    },
    {
      name: "Instagram",
      href: site.instagramUrl,
      icon: <FaInstagram className="size-4 text-pink-500 hover:text-pink-700" />,
    },
    {
      name: "Twitter",
      href: site.twitterUrl,
      icon: <FaTwitter className="size-4 text-blue-400 hover:text-blue-600" />,
    },
    {
      name: "LinkedIn",
      href: site.linkedinUrl,
      icon: <FaLinkedin className="size-4 text-blue-500 hover:text-blue-700" />,
    },
  ].filter((item) => item.href);

  return (
    <div className="fixed top-0 left-0 w-full z-50 text-white bg-gray-800 py-2">
      <Container>
        <div className="w-full flex items-center justify-center md:justify-between">
          {/* Social icons */}
          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                className="bg-white rounded-full p-1"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="hidden md:flex items-center">
            <p className="mr-4 text-sm">
              <FaPhoneVolume className="inline w-4 h-4 mr-1" />
              <a
                href={`tel:${site.supportPhone}`}
                className="text-white hover:text-yellow-500"
              >
                {site.supportPhone}
              </a>
            </p>
            <p className="text-sm">
              <TfiEmail className="inline w-5 h-5 mr-1" />
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-white hover:text-yellow-500"
              >
                {site.supportEmail}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
