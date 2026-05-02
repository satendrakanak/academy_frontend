"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Container from "../container";
import { useSiteSettings } from "@/context/site-settings-context";
import Logo from "../logo";

export default function Footer() {
  const { site } = useSiteSettings();
  const socialLinks = [
    { href: site.facebookUrl, icon: <FaFacebookF size={18} /> },
    { href: site.twitterUrl, icon: <FaXTwitter size={18} /> },
    { href: site.instagramUrl, icon: <FaInstagram size={18} /> },
    { href: site.linkedinUrl, icon: <FaLinkedinIn size={18} /> },
  ].filter((item) => item.href);

  return (
    <footer className="bg-[color-mix(in_oklab,var(--surface-1)_88%,white)] text-slate-700 dark:bg-[#0b1222] dark:text-slate-200">
      <div className="academy-hero-gradient text-white">
        <Container>
          <div className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                {site.footerCtaEyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                {site.footerCtaHeading}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                {site.footerCtaDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={site.footerPrimaryCtaHref || "/courses"}
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-(--brand-900) transition hover:bg-(--brand-50)"
                >
                  {site.footerPrimaryCtaLabel}
                </Link>
                <Link
                  href={site.footerSecondaryCtaHref || "/contact"}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/16"
                >
                  {site.footerSecondaryCtaLabel}
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur-sm academy-float">
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="mt-2 font-normal">Learners mentored</p>
                <p className="text-sm text-white/72">Growing every cohort</p>
              </div>
              <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur-sm academy-float-delayed">
                <h3 className="text-3xl font-bold">100+</h3>
                <p className="mt-2 font-medium">Certified outcomes</p>
                <p className="text-sm text-white/72">Focused programs</p>
              </div>
              <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="text-3xl font-bold">Live</h3>
                <p className="mt-2 font-medium">Faculty support</p>
                <p className="text-sm text-white/72">Human-first learning</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="mb-4">
            <Logo footer />
          </div>

          <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {site.footerAbout || site.siteDescription}
          </p>

          <Link
            href="/contact"
            className="inline-flex rounded-full border border-(--brand-400) px-5 py-2 text-(--brand-600) transition hover:bg-(--brand-500) hover:text-white dark:border-[var(--brand-300)] dark:text-[var(--brand-200)]"
          >
            Contact With Us →
          </Link>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
            Useful Links
          </h3>

          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-(--brand-600)">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-(--brand-600)">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/articles" className="hover:text-(--brand-600)">
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/client-testimonials"
                className="hover:text-(--brand-600)"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/our-faculty" className="hover:text-(--brand-600)">
                Faculty
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
            Our Company
          </h3>

          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/contact" className="hover:text-(--brand-600)">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-(--brand-600)">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/articles" className="hover:text-(--brand-600)">
                Learning Resources
              </Link>
            </li>
            <li>
              <Link href="/our-faculty" className="hover:text-(--brand-600)">
                Meet the Faculty
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-(--brand-600)">
                Your Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
            Get Contact
          </h3>

          <ul className="mb-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <span className="font-medium">Phone:</span> {site.supportPhone}
            </li>
            <li>
              <span className="font-medium">Email:</span> {site.supportEmail}
            </li>
            <li>
              <span className="font-medium">Location:</span>{" "}
              {site.supportAddress}
            </li>
          </ul>

          {/* SOCIAL */}
          <div className="flex gap-4 text-slate-500 dark:text-slate-400">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:text-(--brand-600)"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border/70 px-6 py-6 text-sm text-slate-500 dark:text-slate-400 md:flex-row">
        <p>{site.footerCopyright}</p>

        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-(--brand-600)">Terms</span>
          <span className="cursor-pointer hover:text-(--brand-600)">
            Privacy
          </span>
          <span className="cursor-pointer hover:text-(--brand-600)">Login</span>
        </div>
      </div>
    </footer>
  );
}
