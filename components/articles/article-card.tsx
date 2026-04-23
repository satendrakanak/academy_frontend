"use client";

import Image from "next/image";

interface ArticleCardProps {
  title: string;
  desc: string;
  image: string;
  date: string;
  category: string;
}

export function ArticleCard({
  title,
  desc,
  image,
  date,
  category,
}: ArticleCardProps) {
  return (
    <div className="group cursor-pointer">
      {/* IMAGE */}
      <div className="relative h-56 w-full rounded-xl overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* CATEGORY */}
        <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full text-blue-600 font-medium shadow">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <p className="text-xs text-gray-400 mb-2">{date}</p>

      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{desc}</p>
    </div>
  );
}
