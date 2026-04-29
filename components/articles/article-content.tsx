"use client";

import { Article } from "@/types/article";

export function ArticleContent({ article }: { article: Article }) {
  return (
    <div
      className="brand-prose prose prose-lg max-w-none rounded-[28px] border border-[var(--brand-100)] bg-white p-6 shadow-sm md:p-8"
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  );
}
