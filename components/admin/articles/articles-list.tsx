"use client";
import { DataTable } from "@/components/admin/data-table/data-table";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddButton from "../data-table/add-button";
import { Article } from "@/types/article";
import { articleClientService } from "@/services/articles/article.client";
import { getArticleColumns } from "./article-columns";
import { CreateArticleForm } from "./create-article-form";

interface ArticlesListProps {
  articles: Article[];
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  const [deleteItem, setDeleteItem] = useState<Article | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔥 DELETE CLICK
  const handleDeleteClick = (article: Article) => {
    setDeleteItem(article);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setLoading(true);

      await articleClientService.delete(deleteItem.id);

      toast.success("Article deleted");
      setDeleteOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete article");
    } finally {
      setLoading(false);
    }
  };

  const columns = getArticleColumns(handleDeleteClick);
  return (
    <div>
      <DataTable
        data={articles}
        columns={columns}
        searchColumn="title"
        action={
          <AddButton
            title="Add Article"
            redirectPath="/admin/articles"
            FormComponent={CreateArticleForm}
          />
        }
      />
      <ConfirmDeleteDialog
        deleteText="article"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
    </div>
  );
};
