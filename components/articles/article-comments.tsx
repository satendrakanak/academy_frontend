"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getErrorMessage } from "@/lib/error-handler";
import { getUserAvatarUrl, getUserDisplayName } from "@/lib/user-avatar";
import { articleCommentClientService } from "@/services/article-comments/article-comment.client";
import { ArticleComment } from "@/types/article-comment";
import { useSession } from "@/context/session-context";
import { Heart, MessageCircle, Pencil, Reply, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function ArticleComments({ articleId }: { articleId: number }) {
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [content, setContent] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [openReplies, setOpenReplies] = useState<Record<number, boolean>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDrafts, setEditDrafts] = useState<Record<number, string>>({});
  const [isPending, startTransition] = useTransition();
  const { user } = useSession();

  const isOwner = (comment: ArticleComment) => comment.user.id === user?.id;

  const loadComments = async () => {
    try {
      const [publicResponse, mineResponse] = await Promise.all([
        articleCommentClientService.getByArticle(articleId),
        user
          ? articleCommentClientService
              .getMineByArticle(articleId)
              .catch(() => null)
          : Promise.resolve(null),
      ]);
      setComments(mergeComments(publicResponse.data, mineResponse?.data || []));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      articleCommentClientService.getByArticle(articleId),
      user
        ? articleCommentClientService
            .getMineByArticle(articleId)
            .catch(() => null)
        : Promise.resolve(null),
    ])
      .then(([publicResponse, mineResponse]) => {
        if (isMounted) {
          setComments(
            mergeComments(publicResponse.data, mineResponse?.data || []),
          );
        }
      })
      .catch((error) => {
        if (isMounted) toast.error(getErrorMessage(error));
      });

    return () => {
      isMounted = false;
    };
  }, [articleId, user]);

  const submitComment = () => {
    startTransition(async () => {
      try {
        await articleCommentClientService.create(articleId, { content });
        setContent("");
        toast.success("Comment submitted for approval");
        await loadComments();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  const submitReply = (commentId: number) => {
    startTransition(async () => {
      try {
        await articleCommentClientService.reply(commentId, {
          content: replyDrafts[commentId] || "",
        });
        setReplyDrafts((current) => ({ ...current, [commentId]: "" }));
        setOpenReplies((current) => ({ ...current, [commentId]: false }));
        toast.success("Reply submitted for approval");
        await loadComments();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  const updateComment = (commentId: number) => {
    startTransition(async () => {
      try {
        await articleCommentClientService.update(commentId, {
          content: editDrafts[commentId] || "",
        });
        setEditingId(null);
        toast.success("Comment updated and sent for approval");
        await loadComments();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  const deleteComment = (commentId: number) => {
    startTransition(async () => {
      try {
        await articleCommentClientService.delete(commentId);
        toast.success("Comment deleted");
        await loadComments();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  const toggleLike = (commentId: number) => {
    startTransition(async () => {
      try {
        await articleCommentClientService.toggleLike(commentId);
        await loadComments();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  return (
    <section className="mt-8 rounded-[28px] border border-(--brand-100) bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-2xl bg-(--brand-50) p-3 text-(--brand-700)">
          <MessageCircle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            Comments & Discussion
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Share your thoughts, like helpful comments, and reply to readers.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a thoughtful comment..."
        />
        <Button
          type="button"
          className="mt-3"
          disabled={isPending}
          onClick={submitComment}
        >
          {isPending ? "Posting..." : "Post comment"}
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {comments.length ? (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-3xl border border-slate-200 p-4"
            >
              <CommentNode
                comment={comment}
                level={0}
                isPending={isPending}
                replyDrafts={replyDrafts}
                openReplies={openReplies}
                onToggleLike={toggleLike}
                onToggleReply={(commentId) =>
                  setOpenReplies((current) => ({
                    ...current,
                    [commentId]: !current[commentId],
                  }))
                }
                onReplyChange={(commentId, value) =>
                  setReplyDrafts((current) => ({
                    ...current,
                    [commentId]: value,
                  }))
                }
                onSubmitReply={submitReply}
                editingId={editingId}
                editDrafts={editDrafts}
                getCanEdit={isOwner}
                onStartEdit={(currentComment) => {
                  setEditingId(currentComment.id);
                  setEditDrafts((current) => ({
                    ...current,
                    [currentComment.id]: currentComment.content,
                  }));
                }}
                onEditChange={(commentId, value) =>
                  setEditDrafts((current) => ({
                    ...current,
                    [commentId]: value,
                  }))
                }
                onUpdate={updateComment}
                onDelete={deleteComment}
                onCancelEdit={() => setEditingId(null)}
              />
            </article>
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
            No comments yet. Start the discussion.
          </p>
        )}
      </div>
    </section>
  );
}

function CommentNode({
  comment,
  level,
  isPending,
  replyDrafts,
  openReplies,
  onToggleLike,
  onToggleReply,
  onReplyChange,
  onSubmitReply,
  editingId,
  editDrafts,
  getCanEdit,
  onStartEdit,
  onEditChange,
  onUpdate,
  onDelete,
  onCancelEdit,
}: {
  comment: ArticleComment;
  level: number;
  isPending: boolean;
  replyDrafts: Record<number, string>;
  openReplies: Record<number, boolean>;
  onToggleLike: (commentId: number) => void;
  onToggleReply: (commentId: number) => void;
  onReplyChange: (commentId: number, value: string) => void;
  onSubmitReply: (commentId: number) => void;
  editingId: number | null;
  editDrafts: Record<number, string>;
  getCanEdit: (comment: ArticleComment) => boolean;
  onStartEdit: (comment: ArticleComment) => void;
  onEditChange: (commentId: number, value: string) => void;
  onUpdate: (commentId: number) => void;
  onDelete: (commentId: number) => void;
  onCancelEdit: () => void;
}) {
  const canManage = getCanEdit(comment);
  return (
    <div className={level ? "mt-4 border-l border-slate-200 pl-4" : ""}>
      <div className={level ? "rounded-2xl bg-slate-50 p-4" : ""}>
        <CommentHeader comment={comment} />
        {!comment.isPublished ? (
          <p className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Waiting for admin approval
          </p>
        ) : null}
        {editingId === comment.id ? (
          <div className="mt-3">
            <Textarea
              value={editDrafts[comment.id] || ""}
              onChange={(event) => onEditChange(comment.id, event.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                onClick={() => onUpdate(comment.id)}
                disabled={isPending}
              >
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={onCancelEdit}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {comment.content}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleLike(comment.id)}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-(--brand-50) hover:text-(--brand-700)"
          >
            <Heart className="h-4 w-4" />
            {comment.likedBy.length}
          </button>
          <button
            type="button"
            onClick={() => onToggleReply(comment.id)}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-(--brand-50) hover:text-(--brand-700)"
          >
            <Reply className="h-4 w-4" />
            Reply
          </button>
          {canManage ? (
            <>
              <button
                type="button"
                onClick={() => onStartEdit(comment)}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-(--brand-50) hover:text-(--brand-700)"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(comment.id)}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </>
          ) : null}
        </div>

        {openReplies[comment.id] ? (
          <div className="mt-4">
            <Textarea
              value={replyDrafts[comment.id] || ""}
              onChange={(event) =>
                onReplyChange(comment.id, event.target.value)
              }
              placeholder="Reply to this comment..."
            />
            <Button
              type="button"
              variant="outline"
              className="mt-2 rounded-full"
              disabled={isPending}
              onClick={() => onSubmitReply(comment.id)}
            >
              <Reply className="h-4 w-4" />
              Post reply
            </Button>
          </div>
        ) : null}

        {comment.replies?.map((reply) => (
          <CommentNode
            key={reply.id}
            comment={reply}
            level={level + 1}
            isPending={isPending}
            replyDrafts={replyDrafts}
            openReplies={openReplies}
            onToggleLike={onToggleLike}
            onToggleReply={onToggleReply}
            onReplyChange={onReplyChange}
            onSubmitReply={onSubmitReply}
            editingId={editingId}
            editDrafts={editDrafts}
            getCanEdit={getCanEdit}
            onStartEdit={onStartEdit}
            onEditChange={onEditChange}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </div>
    </div>
  );
}

function CommentHeader({ comment }: { comment: ArticleComment }) {
  const name = getUserDisplayName(comment.user);
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border border-(--brand-100)">
        <AvatarImage src={getUserAvatarUrl(comment.user)} alt={name} />
        <AvatarFallback className="bg-(--brand-50) text-(--brand-700)">
          {name.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="font-semibold text-slate-950">{name}</p>
        <p className="text-xs text-slate-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

function mergeComments(
  publicComments: ArticleComment[],
  mine: ArticleComment[],
) {
  const map = new Map<number, ArticleComment>();
  const add = (comment: ArticleComment) => {
    map.set(comment.id, {
      ...comment,
      replies: comment.replies?.map((reply) => ({ ...reply })) || [],
    });
    comment.replies?.forEach(add);
  };

  publicComments.forEach(add);
  const roots = publicComments.map((comment) => map.get(comment.id)!);
  mine.forEach((comment) => {
    if (map.has(comment.id)) return;

    const nextComment = { ...comment, replies: [] };
    map.set(comment.id, nextComment);

    const parentId = comment.parent?.id;
    const parent = parentId ? map.get(parentId) : null;
    if (parent) {
      parent.replies = [...(parent.replies || []), nextComment];
    } else {
      roots.unshift(nextComment);
    }
  });

  return roots;
}
