import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/chapter";
import ChapterDrawer from "./chapter-drawer";

interface ChaptersListProps {
  chapters: Chapter[];
  activeId: string | null;
  setActiveId: (id: string) => void;
  addChapter: () => void;
  openModal: () => void;
}

export default function ChaptersList({
  chapters,
  activeId,
  setActiveId,
  addChapter,
  openModal,
}: ChaptersListProps) {
  return (
    <div className="col-span-1 border rounded-xl p-3 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Chapters</h3>
        <Button size="sm" onClick={addChapter}>
          + Add
        </Button>
      </div>

      <div className="space-y-1">
        {chapters.map((chapter, index) => (
          <ChapterDrawer
            key={chapter.id}
            chapter={chapter}
            index={index} // 🔥 pass index
            setActiveId={setActiveId}
            activeId={activeId}
            openModal={openModal}
          />
        ))}
      </div>
    </div>
  );
}
