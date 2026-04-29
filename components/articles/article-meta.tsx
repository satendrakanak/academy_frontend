"use client";

import { Article } from "@/types/article";

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
      <span>By {article.author?.firstName || "Admin"}</span>

      {article.publishedAt && <span>{article.publishedAt.slice(0, 10)}</span>}
    </div>
  );
}
