"use client";

import {
  BookOpen,
  Brain,
  GraduationCap,
  TrendingUp,
  HeartPulse,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Online Interactive Live Classes",
    desc: "Engage in real-time sessions with expert instructors.",
  },
  {
    icon: Brain,
    title: "Insights Based Learning",
    desc: "Understand concepts deeply with real-world insights.",
  },
  {
    icon: GraduationCap,
    title: "Practical Knowledge",
    desc: "Hands-on projects to build real skills.",
  },
  {
    icon: TrendingUp,
    title: "Upskill for Professionals",
    desc: "Industry-relevant skills for career growth.",
  },
  {
    icon: HeartPulse,
    title: "Impact on Health",
    desc: "Apply knowledge to improve your lifestyle.",
  },
];

export default function WhyJoinOurCourses() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-webprimary mb-2">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold text-gray-900">
            Why Join Our Courses?
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            We provide a powerful learning experience to help you grow and
            succeed.
          </p>
        </div>

        {/* TOP ROW (3 cards) */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {features.slice(0, 3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-xl transition duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-indigo-50 text-webprimary mb-4 group-hover:bg-webprimary group-hover:text-white transition">
                  <Icon size={24} />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ROW (2 cards CENTERED) */}
        <div className="flex justify-center gap-6">
          {features.slice(3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="w-full max-w-sm group p-6 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-xl transition duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-indigo-50 text-webprimary mb-4 group-hover:bg-webprimary group-hover:text-white transition">
                  <Icon size={24} />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
