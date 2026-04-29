"use client";

import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form className="bg-white p-6 rounded-2xl shadow-sm space-y-5">
      <h3 className="text-xl font-semibold">Send a Message</h3>

      <input
        type="text"
        placeholder="Your Name"
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        placeholder="Your Email"
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Your Message"
        rows={5}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
