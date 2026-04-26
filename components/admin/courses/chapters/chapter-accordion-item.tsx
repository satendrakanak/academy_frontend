"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { CheckCircle, Trash2, RotateCcw, Pencil } from "lucide-react";
import { Chapter } from "@/types/chapter";
import { LectureForm } from "./lectures/lecture-form";
import { canPublishChapter } from "@/helpers/publish-rules";
import { cn } from "@/lib/utils";

interface ChapterAccordionItemProps {
  chapter: Chapter;
  index: number;
  activeId: number | null;
  setActiveId: (id: number) => void;
  onDelete?: (id: number) => void;
  onTooglePublish: (id: number, value: boolean) => void;
  isPublishedView?: boolean;
  isTemp?: boolean;
  dragHandle?: {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap;
  };
  onEdit: (chapter: Chapter) => void;
}

export const ChapterAccordionItem = ({
  chapter,
  index,
  activeId,
  setActiveId,
  onDelete,
  onTooglePublish,
  isPublishedView,
  isTemp,
  dragHandle,
  onEdit,
}: ChapterAccordionItemProps) => {
  const isActive = activeId === chapter.id;
  const disabled = !canPublishChapter(chapter);
  return (
    <AccordionItem
      value={String(chapter.id)}
      className={`w-full rounded-lg transition-all ${
        isActive ? "border shadow-sm bg-background" : "border border-border"
      }`}
    >
      <AccordionTrigger
        className={`w-full px-3 py-3 cursor-pointer flex items-center justify-between text-sm font-medium transition-all no-underline hover:no-underline
    ${
      chapter.isPublished
        ? isActive
          ? "bg-green-100"
          : "bg-green-50"
        : isActive
          ? "bg-primary/10"
          : "hover:bg-muted"
    }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* DRAG */}
          {dragHandle && (
            <span
              {...dragHandle.attributes}
              {...dragHandle.listeners}
              onClick={(e) => e.stopPropagation()}
              className="cursor-grab text-muted-foreground text-sm"
            >
              ☰
            </span>
          )}

          {/* TITLE (ONLY EXPAND + ACTIVE) */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(chapter.id);
            }}
            className="truncate font-medium"
          >
            {chapter.title || `Untitled ${index + 1}`}
          </span>
        </div>

        {/* RIGHT ACTIONS */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 shrink-0"
        >
          {/* EDIT (Drawer open) */}
          <div
            role="button"
            onClick={() => onEdit(chapter)}
            className="p-1 rounded hover:bg-muted cursor-pointer"
            title="Edit Chapter"
          >
            <Pencil className="size-3" />
          </div>

          {/* Published View */}
          {isPublishedView && (
            <div
              role="button"
              onClick={() => onTooglePublish(chapter.id, false)}
              className="p-1 rounded hover:bg-red-50 text-red-600 cursor-pointer"
              title="Unpublish"
            >
              <RotateCcw className="size-3" />
            </div>
          )}

          {/* Normal View */}
          {!isPublishedView && (
            <>
              {!chapter.isPublished && !isTemp && (
                <div
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  aria-disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 IMPORTANT (accordion fix)
                    if (disabled) return;

                    onTooglePublish(chapter.id, true);
                  }}
                  onKeyDown={(e) => {
                    if (disabled) return;

                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onTooglePublish(chapter.id, true);
                    }
                  }}
                  className={cn(
                    "p-1 rounded text-green-600",
                    disabled
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-green-50 cursor-pointer",
                  )}
                  title={disabled ? "Cannot publish yet" : "Publish"}
                >
                  <CheckCircle className="size-3" />
                </div>
              )}

              {!chapter.isPublished && !isTemp && (
                <div
                  role="button"
                  onClick={() => onDelete?.(chapter.id)}
                  className="p-1 rounded hover:bg-red-50 text-red-500 cursor-pointer"
                  title="Delete Chapter"
                >
                  <Trash2 className="size-3" />
                </div>
              )}
            </>
          )}
        </div>
      </AccordionTrigger>

      {/* CONTENT */}
      <AccordionContent className="w-full overflow-auto!">
        <div className="pt-3 pb-4 px-3 bg-muted/30 rounded-b-md min-h-50 max-h-[60vh] overflow-y-auto">
          <LectureForm chapter={chapter} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
