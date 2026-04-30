"use client";

import { useState } from "react";

export function ContactForm() {
  const [loading] = useState(false);

  return (
    <form className="rounded-[28px] border border-[var(--brand-100)] bg-white p-6 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.35)] space-y-5">
      <h3 className="text-2xl font-semibold text-slate-900">Send a Message</h3>

      <input
        type="text"
        placeholder="Your Name"
        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
      />

      <input
        type="email"
        placeholder="Your Email"
        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
      />

      <textarea
        placeholder="Your Message"
        rows={5}
        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[var(--brand-500)] py-3.5 font-medium text-white transition hover:bg-[var(--brand-600)]"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
