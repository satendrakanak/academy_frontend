"use client";

import Link from "next/link";
import { Article } from "@/types/article";

type SidebarCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export function ArticleSidebar({
  article,
  categories,
}: {
  article: Article;
  categories: SidebarCategory[];
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-[var(--brand-100)] bg-white p-5 shadow-sm">
        <h4 className="mb-3 font-semibold text-gray-900">Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => {
            const isActive = article.categories?.some((item) => item.id === cat.id);

            return (
              <Link
                key={cat.id}
                href={`/articles?category=${cat.slug}`}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-[var(--brand-50)] font-medium text-[var(--brand-700)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--brand-700)]"
                }`}
              >
                <span>{cat.name}</span>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-[24px] border border-[var(--brand-100)] bg-white p-5 shadow-sm">
        <h4 className="mb-3 font-semibold text-gray-900">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {article.tags?.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
