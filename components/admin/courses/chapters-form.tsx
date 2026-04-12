"use client";

import { useState } from "react";

import { Chapter } from "@/types/chapter";
import ChaptersList from "./chapters/chapters-list";
import PublishedList from "./chapters/published-chapters";
import ChapterDrawer from "./chapters/chapter-drawer";
import DescriptionModal from "./chapters/description-modal";

export default function ChaptersForm() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const activeChapter = chapters.find((c) => c.id === activeId);

  const addChapter = () => {
    const newChapter: Chapter = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      videoUrl: "",
      isFree: false,
      isPublished: false,
    };

    setChapters((prev) => [...prev, newChapter]);
    setActiveId(newChapter.id);
  };

  const updateChapter = (key: keyof Chapter, value: any) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, [key]: value } : c)),
    );
  };

  return (
    <>
      <div className="rounded-2xl border p-4 bg-white shadow-sm grid grid-cols-3 gap-4">
        <ChaptersList
          chapters={chapters}
          activeId={activeId}
          setActiveId={setActiveId}
          addChapter={addChapter}
          openModal={() => setOpenModal(true)}
        />

        <PublishedList
          chapters={chapters.filter((c) => c.isPublished)}
          onEdit={(id: string) => {
            setActiveId(id);
            setOpenDrawer(true);
          }}
        />
      </div>

      <DescriptionModal
        open={openModal}
        onOpenChange={setOpenModal}
        chapter={activeChapter}
        updateChapter={updateChapter}
      />
    </>
  );
}
