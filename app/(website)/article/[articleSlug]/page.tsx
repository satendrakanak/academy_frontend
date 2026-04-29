import { ArticleContent } from "@/components/articles/article-content";
import { ArticleHero } from "@/components/articles/article-hero";
import { ArticleMeta } from "@/components/articles/article-meta";
import { ArticleSidebar } from "@/components/articles/article-sidebar";
import { RelatedArticles } from "@/components/articles/related-articles";
import Container from "@/components/container";
import { getErrorMessage } from "@/lib/error-handler";
import { articleServerService } from "@/services/articles/article.server";
import { Article } from "@/types/article";
import { notFound } from "next/navigation";

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) {
  const { articleSlug } = await params;

  if (!articleSlug) {
    notFound();
  }

  let article: Article;

  try {
    const response = await articleServerService.getBySlug(articleSlug);
    article = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  let relatedArticles: Article[] = [];
  try {
    const response = await articleServerService.getRealtedArticles(article.id);
    relatedArticles = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  let allArticles: Article[] = [];
  try {
    const response = await articleServerService.getAll();
    allArticles = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  const categories = Array.from(
    allArticles
      .flatMap((item) => item.categories || [])
      .reduce(
        (map, category) =>
          map.set(category.id, {
            id: category.id,
            name: category.name,
            slug: category.slug,
            count: (map.get(category.id)?.count || 0) + 1,
          }),
        new Map<number, { id: number; name: string; slug: string; count: number }>(),
      )
      .values(),
  ).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <div className="relative bg-[linear-gradient(180deg,var(--brand-50)_0%,#fff_38%,var(--brand-50)_100%)]">
      <ArticleHero article={article} />

      <Container>
        <div className="flex items-start gap-10 lg:flex-row flex-col">
          <div className="mt-10 max-w-4xl flex-1">
            <ArticleContent article={article} />
            <ArticleMeta article={article} />
          </div>

          <div className="sticky top-24 mt-10 w-full lg:w-80 self-start">
            <ArticleSidebar article={article} categories={categories} />
          </div>
        </div>
      </Container>

      <Container>
        <RelatedArticles articles={relatedArticles} />
      </Container>
    </div>
  );
}
