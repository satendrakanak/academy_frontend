import { ArticleCard } from "@/components/articles/article-card";
import Container from "@/components/container";
import { getErrorMessage } from "@/lib/error-handler";
import { buildMetadata } from "@/lib/seo";
import { articleServerService } from "@/services/articles/article.server";
import { Article } from "@/types/article";
import Link from "next/link";

type ArticleCategorySummary = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export const metadata = buildMetadata({
  title: "Articles",
  description:
    "Read practical wellness, health, learning, and nutrition articles from Unitus Health Academy.",
  path: "/articles",
});

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  let articles: Article[] = [];
  try {
    const response = await articleServerService.getAll();
    articles = response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  const categoryMap = new Map<number, ArticleCategorySummary>();
  for (const currentArticle of articles) {
    for (const cat of currentArticle.categories || []) {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: (categoryMap.get(cat.id)?.count || 0) + 1,
      });
    }
  }

  const categories = Array.from(categoryMap.values()).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );

  const filteredArticles = category
    ? articles.filter((article) =>
        article.categories?.some((item) => item.slug === category),
      )
    : articles;

  const activeCategory = categories.find((item) => item.slug === category);
  return (
    <div className="academy-surface pb-20">
      <section className="academy-hero-gradient relative overflow-hidden py-20 text-white">
        <div className="academy-hero-grid absolute inset-0 opacity-20" />
        <Container>
          <div className="relative">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
              Articles
            </p>
            <h1 className="max-w-3xl text-4xl font-bold md:text-4xl">
              Read ideas that make the learning journey more practical.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Explore wellness, learning, nutrition, and career-oriented
              insights written for thoughtful readers.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-12">
          <div className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                !activeCategory
                  ? "bg-[var(--brand-600)] text-white"
                  : "bg-white text-slate-600 hover:text-[var(--brand-700)]"
              }`}
            >
              All Articles
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/articles?category=${item.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory?.id === item.id
                    ? "bg-[var(--brand-600)] text-white"
                    : "bg-white text-slate-600 hover:text-[var(--brand-700)]"
                }`}
              >
                {item.name} ({item.count})
              </Link>
            ))}
          </div>

          {activeCategory && (
            <p className="mb-6 text-sm text-slate-500">
              Showing articles in{" "}
              <span className="font-medium text-slate-700">
                {activeCategory.name}
              </span>
              .
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
