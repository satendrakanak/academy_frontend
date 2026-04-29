import { Chapter } from "@/types/chapter";
import ChapterDrawer from "./chapter-drawer";
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
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "../../sortable-item";
import type { DragEndEvent, DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import ChapterAccordion from "./chapter-accordion";

type SortableRenderProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap;
};
interface PublishedListProps {
  chapters: Chapter[];
  activeId: number | null;
  setActiveId: (id: number) => void;
  courseId: number;
  onTooglePublish: (id: number, isPublished: boolean) => void;
  onDelete: (id: number) => void;
  viewType: string;
  handleDragEnd: (event: DragEndEvent) => void;
}

export default function PublishedList({
  chapters,
  activeId,
  setActiveId,
  courseId,
  onTooglePublish,
  viewType,
  onDelete,
  handleDragEnd,
}: PublishedListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="col-span-2 border rounded-xl p-4 space-y-3">
      <h3 className="font-semibold text-sm">Published Chapters</h3>

      {chapters.length === 0 && (
        <p className="text-xs text-muted-foreground">No published chapters</p>
      )}
      <div className="space-y-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={chapters.filter((c) => c.isPublished).map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
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
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
