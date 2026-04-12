"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { tagClientService } from "@/services/tags/tag.client";
import { Tag } from "@/types/tag";
import { Course } from "@/types/course";
import { courseClientService } from "@/services/courses/course.client";
import { toast } from "sonner";

interface TagsFormProps {
  course: Course;
}

export function TagsForm({ course }: TagsFormProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState("");

  // 🔥 important: prevent duplicate API calls
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    setTags(course.tags || []);
  }, [course]);

  // 🔥 load suggestions (later search API laga sakta hai)
  const loadSuggestedTags = async () => {
    const res = await tagClientService.getAll();
    setSuggestedTags(res.data as Tag[]);
  };

  // 🔥 core save (dedupe + safe)
  const saveTags = async (updated: Tag[]) => {
    const ids = updated
      .map((t) => t.id)
      .sort()
      .join(",");

    if (ids === lastSavedRef.current) {
      return;
    }

    lastSavedRef.current = ids;

    try {
      await courseClientService.update(course.id, {
        tags: updated.map((t) => t.id),
      });
      toast.success("Tags updated successfully");
    } catch (err) {
      toast.error("Failed to update tags");
      console.error("❌ Tag save failed", err);
    }
  };

  // 🔥 remove
  const removeTag = (tagId: number) => {
    setTags((prev) => {
      const updated = prev.filter((t) => t.id !== tagId);
      saveTags(updated);
      return updated;
    });
  };

  // 🔥 add via input (comma / enter)
  const handleAddTagsFromInput = async () => {
    const values = Array.from(
      new Set(
        newTag
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v.length > 0),
      ),
    );

    if (!values.length) return;

    try {
      const res = await tagClientService.bulkCreate(values);
      const createdTags: Tag[] = res.data;

      setTags((prev) => {
        const existingIds = prev.map((t) => t.id);

        const unique = createdTags.filter((t) => !existingIds.includes(t.id));

        const updated = [...prev, ...unique];

        saveTags(updated);
        return updated;
      });

      setNewTag("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-lg border bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h3 className="text-sm font-medium">Tags</h3>
      </div>

      <div className="p-4 space-y-3">
        {/* Input */}
        <div className="relative">
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                handleAddTagsFromInput();
              }
            }}
            placeholder="Add tag"
            className="w-full border rounded-md px-2 pr-8 py-1 text-sm outline-none"
          />

          {newTag.trim() && (
            <button
              onClick={handleAddTagsFromInput}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
            >
              <Check size={16} />
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Separate tags with commas
        </p>

        {/* Selected tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-md"
            >
              {tag.name}
              <button
                onClick={() => removeTag(tag.id)}
                className="cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        {/* Suggestions */}
        <div className="space-y-2">
          <button
            onClick={() => {
              setShowSuggestions((prev) => !prev);
              loadSuggestedTags();
            }}
            className="text-xs text-primary hover:underline cursor-pointer"
          >
            Choose from the most used tags
          </button>

          {showSuggestions && (
            <div className="border rounded-md p-2 space-y-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tags..."
                className="w-full border px-2 py-1 text-sm rounded"
              />

              <div className="max-h-40 overflow-y-auto space-y-1">
                {suggestedTags.map((tag) => {
                  const isSelected = tags.some((t) => t.id === tag.id);

                  return (
                    <div
                      key={tag.id}
                      onClick={() => {
                        if (isSelected) return;

                        const updated = [...tags, tag];
                        setTags(updated);
                        saveTags(updated);
                      }}
                      className={`text-sm px-2 py-1 rounded cursor-pointer ${
                        isSelected
                          ? "bg-gray-200 text-muted-foreground"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {tag.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
