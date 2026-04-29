"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#f5f7fb] text-gray-700">
      {/* TOP BLUE STRIP */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-center md:text-left">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="mt-2 font-medium">Successfully Trained</p>
            <p className="text-sm opacity-80">Learners & counting</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">100+</h3>
            <p className="mt-2 font-medium">Certification Students</p>
            <p className="text-sm opacity-80">Online Course</p>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* LOGO + TEXT */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Unitus</h2>

          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            We’re always in search of talented and motivated people. Don’t be
            shy introduce yourself!
          </p>

          <button className="px-5 py-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition">
            Contact With Us →
          </button>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Useful Links</h3>

          <ul className="space-y-2 text-sm text-gray-500">
            <li>Marketplace</li>
            <li>Kindergarten</li>
            <li>University</li>
            <li>Classic LMS</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Our Company</h3>

          <ul className="space-y-2 text-sm text-gray-500">
            <li>Contact Us</li>
            <li>Become Teacher</li>
            <li>Blog</li>
            <li>Instructor</li>
            <li>Events</li>
          </ul>
        </div>

        {/* CONTACT */}
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
              className="hover:text-blue-600 cursor-pointer"
            />
            <FaXTwitter
              size={18}
              className="hover:text-blue-600 cursor-pointer"
            />
            <FaInstagram
              size={18}
              className="hover:text-blue-600 cursor-pointer"
            />
            <FaLinkedinIn
              size={18}
              className="hover:text-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t text-sm text-gray-500 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Unitus. All Rights Reserved</p>

        <div className="flex gap-4">
          <span className="hover:text-blue-600 cursor-pointer">Terms</span>
          <span className="hover:text-blue-600 cursor-pointer">Privacy</span>
          <span className="hover:text-blue-600 cursor-pointer">Login</span>
        </div>
      </div>
    </footer>
  );
}
