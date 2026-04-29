import ArticlesSection from "@/components/articles/articles-section";
import { getErrorMessage } from "@/lib/error-handler";
import { articleServerService } from "@/services/articles/article.server";
import { Article } from "@/types/article";

export default async function ArticlesPage() {
  let articles: Article[] = [];
  try {
    const response = await articleServerService.getFeaturedArticles();
    articles = response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
  return (
    <div>
      <ArticlesSection articles={articles} />
    </div>
  );
}
