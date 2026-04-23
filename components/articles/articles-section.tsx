"use client";

import Image from "next/image";
import { ArticleCard } from "./article-card";

const featured = {
  title: "How Nutrition Impacts Your Daily Energy Levels",
  desc: "Discover how proper nutrition can transform your productivity and overall well-being.",
  image: "/assets/articles/article-1.jpg",
  date: "12 Feb 2026",
  category: "Nutrition",
};

const latest = [
  {
    title: "Top 5 Diet Tips for Busy Professionals",
    desc: "Simple and effective diet habits to stay healthy even with a hectic schedule.",
    image: "/assets/articles/article-2.jpg",
    date: "10 Feb 2026",
    category: "Health",
  },
  {
    title: "Understanding Balanced Diet",
    desc: "Everything you need to know about maintaining a balanced diet.",
    image: "/assets/articles/article-3.jpg",
    date: "8 Feb 2026",
    category: "Wellness",
  },
  {
    title: "Boost Immunity Naturally",
    desc: "Learn natural ways to strengthen your immune system.",
    image: "/assets/articles/article-4.jpg",
    date: "5 Feb 2026",
    category: "Fitness",
  },
];

export default function ArticlesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-sm text-blue-600 font-medium mb-1">
              Latest Articles
            </p>
            <h2 className="text-3xl font-bold text-gray-900">From Our Blog</h2>
          </div>

          <button className="text-sm text-blue-600 font-medium hover:underline">
            View All →
          </button>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* FEATURED */}
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="relative h-[350px] rounded-2xl overflow-hidden mb-5">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <span className="text-xs text-blue-600 font-medium">
              {featured.category}
            </span>

            <h3 className="text-2xl font-bold text-gray-900 mt-2">
              {featured.title}
            </h3>

            <p className="text-gray-500 mt-2 max-w-xl">{featured.desc}</p>
          </div>

          {/* LATEST */}
          <div className="space-y-6">
            {latest.map((item, index) => (
              <ArticleCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
