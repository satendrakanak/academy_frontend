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
      className="group block cursor-pointer rounded-[28px] border border-[var(--brand-100)] bg-white p-4 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-200)] hover:shadow-[0_28px_70px_-38px_rgba(15,23,42,0.35)]"
    >
      {/* IMAGE */}
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-[22px]">
        <Image
          src={article.featuredImage?.path || "/assets/placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* CATEGORY */}
        {article.categories?.[0] && (
          <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--brand-700)] shadow">
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

      <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-[var(--brand-700)]">
        {article.title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {article.excerpt || "No description available"}
      </p>
    </Link>
  );
}
