import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/chapter";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../../sortable-item";
import type { DragEndEvent, DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import ChapterAccordion from "./chapter-accordion";
import { Accordion } from "@/components/ui/accordion";

type SortableRenderProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap;
};

interface ChaptersListProps {
  chapters: Chapter[];
  activeId: number | null;
  courseId: number;
  setActiveId: (id: number) => void;
  addChapter: () => void;
  onTooglePublish: (id: number, isPublished: boolean) => void;
  viewType: string;
  onDelete: (id: number) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

export default function ChaptersList({
  chapters,
  activeId,
  courseId,
  setActiveId,
  addChapter,
  onTooglePublish,
  viewType,
  onDelete,
  handleDragEnd,
}: ChaptersListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="col-span-1 border rounded-xl p-3 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Chapters</h3>
        <Button size="sm" onClick={addChapter}>
          + Add
        </Button>
      </div>

      <div className="space-y-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={chapters.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <Accordion type="single" collapsible className="w-full space-y-2">
              {chapters.map((chapter, index) => (
                <SortableItem key={chapter.id} id={chapter.id}>
                  {({ attributes, listeners }: SortableRenderProps) => (
                    <ChapterAccordion
                      chapter={chapter}
                      index={index}
                      activeId={activeId}
                      setActiveId={setActiveId}
                      courseId={courseId}
                      onTooglePublish={onTooglePublish}
                      onDelete={onDelete}
                      viewType={viewType}
                      dragHandle={{
                        attributes,
                        listeners,
                      }}
                    />
                  )}
                </SortableItem>
              ))}
            </Accordion>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
