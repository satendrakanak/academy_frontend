"use client";

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (!articles?.length) return null;

  const featured = articles[0];
  const gridArticles = articles.slice(1, 5);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-sm text-blue-600 font-medium mb-1">
            Latest Articles
          </p>
          <h2 className="text-3xl font-bold text-gray-900">From Our Blog</h2>
        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT - FEATURED */}
          {featured && (
            <Link href={`/article/${featured.slug}`} className="group block">
              <div className="relative h-105 rounded-2xl overflow-hidden">
                <Image
                  src={
                    featured.featuredImage?.path || "/assets/placeholder.jpg"
                  }
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>

              <h3 className="text-2xl font-bold mt-4">{featured.title}</h3>

              <p className="text-gray-500 mt-2 line-clamp-2">
                {featured.excerpt || "No description available"}
              </p>
            </Link>
          )}

          {/* RIGHT - 2x2 GRID */}
          <div className="grid grid-cols-2 gap-6">
            {gridArticles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="group block"
              >
                <div className="relative h-47.5 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={
                      article.featuredImage?.path || "/assets/placeholder.jpg"
                    }
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <h4 className="font-semibold text-sm group-hover:text-blue-600 transition">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
