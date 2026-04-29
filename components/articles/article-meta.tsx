"use client";

import { Article } from "@/types/article";

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 rounded-[22px] border border-[var(--brand-100)] bg-white p-4 text-sm text-gray-500 shadow-sm">
      <span className="rounded-full bg-[var(--brand-50)] px-3 py-1 font-medium text-[var(--brand-700)]">
        By {article.author?.firstName || "Admin"}
      </span>
      {article.publishedAt && (
        <span className="rounded-full bg-slate-100 px-3 py-1">
          {new Date(article.publishedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      )}
      <span className="rounded-full bg-slate-100 px-3 py-1">
        {article.readingTime ? `${article.readingTime} min read` : "Article"}
      </span>
    </div>
  );
}
