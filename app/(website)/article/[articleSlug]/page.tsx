import { ArticleContent } from "@/components/articles/article-content";
import { ArticleHero } from "@/components/articles/article-hero";
import { ArticleMeta } from "@/components/articles/article-meta";
import { ArticleSidebar } from "@/components/articles/article-sidebar";
import { RelatedArticles } from "@/components/articles/related-articles";
import Container from "@/components/container";
import { CourseHero } from "@/components/course/course-hero";
import { CourseSidebarCard } from "@/components/course/course-sidebar-card";
import { CourseTabs } from "@/components/course/course-tabs";
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

  return (
    <div className="relative bg-gray-100">
      {/* HERO */}
      <ArticleHero article={article} />

      <Container>
        <div className="flex gap-10 items-start">
          {/* LEFT */}
          <div className="flex-1 max-w-4xl mt-10">
            <ArticleMeta article={article} />
            <ArticleContent article={article} />
          </div>

          {/* RIGHT */}
          <div className="sticky top-24 w-80 mt-10">
            <ArticleSidebar article={article} />
          </div>
        </div>
      </Container>

      <Container>
        <RelatedArticles articles={relatedArticles} />
      </Container>
    </div>
  );
}
