import { Article } from "@/types/article";
import { formatDate } from "@/utils/formate-date";

interface QuickInfoProps {
  article: Article;
}

export default function QuickInfo({ article }: QuickInfoProps) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm text-xs bg-white  text-muted-foreground space-y-1">
      <p>Article ID: #{article.id}</p>

      <p>Created At: {formatDate(article.createdAt)}</p>

      <p>Created By: {article.createdBy?.firstName || "—"}</p>

      <p>Last updated: {formatDate(article.updatedAt)}</p>

      <p>Updated By: {article.updatedBy?.firstName || "—"}</p>
    </div>
  );
}
