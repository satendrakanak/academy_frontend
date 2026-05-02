"use client";

import Link from "next/link";
import { Article } from "@/types/article";
import { ArticleCard } from "./article-card";

interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (!articles?.length) return null;

  const visibleArticles = articles.slice(0, 3);

  return (
    <section className="academy-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-600)] dark:text-[var(--brand-300)]">
              Latest Articles
            </p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Insights, essays, and practical guidance from our team.
            </h2>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center rounded-full border border-[var(--brand-200)] bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-700)] transition hover:bg-[var(--brand-50)] dark:bg-white/10 dark:text-[var(--brand-200)] dark:hover:bg-white/16"
          >
            Explore All Articles
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
