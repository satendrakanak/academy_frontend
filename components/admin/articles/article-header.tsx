"use client";

import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { checkArticlePublish } from "@/helpers/publish-rules";
import { cn } from "@/lib/utils";
import { CheckCircle, RotateCcw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getErrorMessage } from "@/lib/error-handler";
import { Article } from "@/types/article";
import { articleClientService } from "@/services/articles/article.client";

interface ArticleHeaderProps {
  article: Article;
}

export const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { canPublish, reasons } = checkArticlePublish(article);

  const handleToggleFeatured = async () => {
    try {
      await articleClientService.update(article.id, {
        isFeatured: !article.isFeatured,
      });

      toast.success(
        article.isFeatured ? "Removed from featured" : "Marked as featured",
      );

      router.refresh();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };
  // 🔥 Toggle Publish
  const handleTogglePublish = async () => {
    try {
      await articleClientService.update(article.id, {
        isPublished: !article.isPublished,
      });

      toast.success(
        article.isPublished ? "Article unpublished" : "Article published",
      );

      router.refresh();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  // 🔥 Delete Course
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await articleClientService.delete(article.id);

      toast.success("Article deleted");
      router.push("/admin/articles");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete article");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };
  const isPublishAction = !article.isPublished;
  const disabled = isPublishAction && !canPublish;
  return (
    <div className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 🔥 LEFT */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2">
            <Badge
              variant={article.isPublished ? "default" : "secondary"}
              className="text-xs"
            >
              {article.isPublished ? "Published" : "Draft"}
            </Badge>
            {article.isFeatured && (
              <Badge className="text-xs bg-purple-100 text-purple-700 border border-purple-200">
                Featured
              </Badge>
            )}

            <p className="text-sm text-muted-foreground">
              Manage your article settings
            </p>
          </div>
        </div>

        {/* 🔥 RIGHT */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleToggleFeatured}
            className={cn(
              "flex items-center gap-1 transition",
              article.isFeatured
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-700 hover:bg-gray-800",
            )}
          >
            {article.isFeatured ? <>⭐ Unfeature</> : <>⭐ Feature</>}
          </Button>
          {/* Publish / Unpublish */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  {" "}
                  {/* 🔥 wrapper (IMPORTANT for disabled button) */}
                  <Button
                    size="sm"
                    disabled={disabled}
                    onClick={handleTogglePublish}
                    className={cn(
                      "flex items-center gap-1 transition",
                      article.isPublished
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700",
                    )}
                  >
                    {article.isPublished ? (
                      <>
                        <RotateCcw className="size-4" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <CheckCircle className="size-4" />
                        Publish
                      </>
                    )}
                  </Button>
                </span>
              </TooltipTrigger>
              {/* 🔥 TOOLTIP CONTENT */}
              {disabled && (
                <TooltipContent
                  side="bottom"
                  align="end"
                  sideOffset={10}
                  className=" bg-white flex flex-col text-gray-800 border shadow-md rounded-md p-3 "
                >
                  {/* 🔥 HEADING */}
                  <p className="text-sm font-semibold mb-2">
                    Complete required steps
                  </p>

                  {/* 🔥 LIST */}
                  <ul className="text-xs space-y-1">
                    {reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span className="leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {/* Delete */}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpenDeleteDialog(true)}
            className="flex items-center gap-1"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
        <ConfirmDeleteDialog
          deleteText="article"
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleDelete}
          loading={isDeleting}
        />
      </div>
    </div>
  );
};
