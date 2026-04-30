"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#f5f7fb] text-gray-700">
      <div className="academy-hero-gradient text-white">
        <div className="max-w-7xl mx-auto grid gap-10 px-6 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              Start Your Learning Journey
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              Build practical wellness expertise with a learning system that
              actually supports you.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Explore guided programs, thoughtful faculty, and a curriculum
              designed to help you learn clearly and apply with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-[var(--brand-900)] transition hover:bg-[var(--brand-50)]"
              >
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/16"
              >
                Talk to Us
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur-sm">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="mt-2 font-medium">Learners mentored</p>
              <p className="text-sm text-white/72">Growing every cohort</p>
            </div>
            <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur-sm">
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
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-[var(--brand-600)]">
            Unitus
          </h2>

          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Practical wellness education for learners who want clarity,
            mentorship, and real-world application.
          </p>

          <Link
            href="/contact"
            className="inline-flex rounded-full border border-[var(--brand-400)] px-5 py-2 text-[var(--brand-600)] transition hover:bg-[var(--brand-500)] hover:text-white"
          >
            Contact With Us →
          </Link>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Useful Links</h3>

          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-[var(--brand-600)]">Home</Link></li>
            <li><Link href="/courses" className="hover:text-[var(--brand-600)]">Courses</Link></li>
            <li><Link href="/articles" className="hover:text-[var(--brand-600)]">Articles</Link></li>
            <li><Link href="/client-testimonials" className="hover:text-[var(--brand-600)]">Testimonials</Link></li>
            <li><Link href="/our-faculty" className="hover:text-[var(--brand-600)]">Faculty</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Our Company</h3>

          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/contact" className="hover:text-[var(--brand-600)]">Contact Us</Link></li>
            <li><Link href="/courses" className="hover:text-[var(--brand-600)]">Admissions</Link></li>
            <li><Link href="/articles" className="hover:text-[var(--brand-600)]">Learning Resources</Link></li>
            <li><Link href="/our-faculty" className="hover:text-[var(--brand-600)]">Meet the Faculty</Link></li>
            <li><Link href="/cart" className="hover:text-[var(--brand-600)]">Your Cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Get Contact</h3>

          <ul className="space-y-2 text-sm text-gray-500 mb-4">
            <li>
              <span className="font-medium">Phone:</span> +91-9809-XXXXXX
            </li>
            <li>
              <span className="font-medium">Email:</span> info@academy.com
            </li>
            <li>
              <span className="font-medium">Location:</span> India
            </li>
          </ul>

          {/* SOCIAL */}
          <div className="flex gap-4 text-gray-500">
            <FaFacebookF
              size={18}
              className="cursor-pointer hover:text-[var(--brand-600)]"
            />
            <FaXTwitter
              size={18}
              className="cursor-pointer hover:text-[var(--brand-600)]"
            />
            <FaInstagram
              size={18}
              className="cursor-pointer hover:text-[var(--brand-600)]"
            />
            <FaLinkedinIn
              size={18}
              className="cursor-pointer hover:text-[var(--brand-600)]"
            />
          </div>
        </div>
      </div>

      <div className="border-t text-sm text-gray-500 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Unitus. All Rights Reserved</p>

        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-[var(--brand-600)]">Terms</span>
          <span className="cursor-pointer hover:text-[var(--brand-600)]">Privacy</span>
          <span className="cursor-pointer hover:text-[var(--brand-600)]">Login</span>
        </div>
      </div>
    </footer>
  );
}
