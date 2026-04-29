"use client";

import { Article } from "@/types/article";

export function ArticleContent({ article }: { article: Article }) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  );
}
