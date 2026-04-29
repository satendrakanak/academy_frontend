"use client";

import Image from "next/image";
import { Article } from "@/types/article";

export function ArticleHero({ article }: { article: Article }) {
  return (
    <section className="academy-hero-gradient relative overflow-hidden py-20 text-white">
      <div className="academy-hero-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="max-w-3xl">
          {article.categories?.[0] && (
            <span className="rounded-full bg-white/12 px-3 py-1 text-sm backdrop-blur-sm">
              {article.categories[0].name}
            </span>
          )}

          <h1 className="mt-5 text-4xl font-bold md:text-6xl">{article.title}</h1>
          {article.excerpt && (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              {article.excerpt}
            </p>
          )}
        </div>

        <div className="relative h-[320px] overflow-hidden rounded-[32px] border border-white/15 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.6)]">
          <Image
            src={article.featuredImage?.path || "/assets/default-cover.jpg"}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
