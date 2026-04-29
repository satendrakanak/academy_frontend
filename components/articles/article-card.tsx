"use client";

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group block cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative h-56 w-full rounded-xl overflow-hidden mb-4">
        <Image
          src={article.featuredImage?.path || "/assets/placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* CATEGORY */}
        {article.categories?.[0] && (
          <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full text-blue-600 font-medium shadow">
            {article.categories[0].name}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <p className="text-xs text-gray-400 mb-2">
        {article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString("en-GB")
          : "Draft"}
      </p>

      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
        {article.title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {article.excerpt || "No description available"}
      </p>
    </Link>
  );
}
