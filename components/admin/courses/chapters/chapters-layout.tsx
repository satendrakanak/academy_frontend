"use client";

import { useState } from "react";
import ChaptersList from "./chapters-list";
import PublishedChapters from "./published-chapters";
import ChapterDrawer from "./chapter-drawer";
import DescriptionModal from "./description-modal";

export default function ChaptersLayout() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [activeChapter, setActiveChapter] = useState<any | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEdit = (chapter: any) => {
    setActiveChapter(chapter);
    setDrawerOpen(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <ChaptersList chapters={chapters} setChapters={setChapters} />

      <PublishedChapters
        chapters={chapters.filter((c) => c.isPublished)}
        onEdit={handleEdit}
      />

      <ChapterDrawer
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        chapter={activeChapter}
        setChapters={setChapters}
        openEditor={() => setModalOpen(true)}
      />

      <DescriptionModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        chapter={activeChapter}
        setChapters={setChapters}
      />
    </div>
  );
}
