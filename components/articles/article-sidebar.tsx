"use client";

import { Article } from "@/types/article";

export function ArticleSidebar({ article }: { article: Article }) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h4 className="font-semibold mb-3">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {article.categories?.map((cat) => (
            <span
              key={cat.id}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h4 className="font-semibold mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {article.tags?.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
