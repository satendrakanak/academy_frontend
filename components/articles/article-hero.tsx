"use client";

import Image from "next/image";
import { Article } from "@/types/article";

export function ArticleHero({ article }: { article: Article }) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <Image
        src={article.featuredImage?.path || "/assets/placeholder.jpg"}
        alt={article.title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex items-end">
        <div className="max-w-4xl mx-auto px-6 pb-10 text-white">
          {article.categories?.[0] && (
            <span className="text-sm bg-white text-black px-3 py-1 rounded-full">
              {article.categories[0].name}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            {article.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
