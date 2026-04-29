"use client";

import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import { Check, Plus } from "lucide-react";
import { categoryClientService } from "@/services/categories/category.client";
import { Category } from "@/types/category";
import { courseClientService } from "@/services/courses/course.client";
import { slugify } from "@/utils/slugify";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/error-handler";

interface CategoryFormProps {
  course: Course;
}

export const CategoryForm = ({ course }: CategoryFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const router = useRouter();
  // 🔥 Load categories + preselect
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await categoryClientService.getAllBy("COURSE");
        setCategories(response.data as Category[]);

        // prefill from course
        const existing = course.categories?.map((c) => c.id) || [];
        setSelected(existing);
      } catch (error: unknown) {
        const message = getErrorMessage(error);
        toast.error(message);
      }
    };

    loadCategories();
  }, [course]);

  // 🔥 Auto Save
  const saveCategories = async (updated: number[]) => {
    try {
      await courseClientService.update(course.id, {
        categories: updated,
      });
      router.refresh();
      toast.success("Categories updated successfully");
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };
  const toggleCategory = (id: number) => {
    let updated: number[];

    if (selected.includes(id)) {
      updated = selected.filter((item) => item !== id);
    } else {
      updated = [...selected, id];
    }

    setSelected(updated);
    saveCategories(updated);
  };

  // 🔥 Add new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      // 1️⃣ create category
      const res = await categoryClientService.create({
        name: newCategory,
        slug: slugify(newCategory),
        type: "course",
      });

      const created = res.data;

      // 2️⃣ update UI list
      setCategories((prev) => [...prev, created]);

      // 3️⃣ attach to course
      const updated = [...selected, created.id];
      setSelected(updated);

      await saveCategories(updated);

      // reset
      setNewCategory("");
      setShowInput(false);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <div className="rounded-lg border bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h3 className="text-sm font-medium">Categories</h3>
      </div>

      <div className="p-3 space-y-3">
        {/* Gray Panel (no shadow, clean) */}
        <div className="max-h-50 overflow-y-auto ">
          <div className="space-y-2">
            {categories.map((cat) => {
              const isChecked = selected.includes(cat.id);

              return (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.id)}
                    className="h-4 w-4 accent-primary cursor-pointer"
                  />
                  {cat.name}
                </label>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {!showInput ? (
            <button
              type="button"
              onClick={() => setShowInput(true)}
              className="flex items-center gap-1 text-sm text-primary hover:underline cursor-pointer"
            >
              <Plus size={14} />
              Add New Category
            </button>
          ) : (
            <div className="relative mt-1">
              <input
                autoFocus
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                placeholder="New category"
                className="w-full border rounded-md px-2 pr-8 py-1 text-sm outline-none bg-white"
              />

              {/* Icon inside input */}
              {newCategory.trim() && (
                <button
                  onClick={handleAddCategory}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                >
                  <Check size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
