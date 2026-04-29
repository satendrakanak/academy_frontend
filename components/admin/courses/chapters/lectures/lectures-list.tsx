"use client";

import { Lecture } from "@/types/lecture";
import LectureDrawer from "./lecture-drawer";

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

import type { DragEndEvent, DraggableAttributes } from "@dnd-kit/core";
import { SortableItem } from "@/components/admin/sortable-item";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
type SortableRenderProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap;
};
interface LectureListProps {
  chapterId: number;
  lectures: Lecture[];
  addLecture: () => void;
  onTooglePublish: (id: number, isPublished: boolean) => void;
  onDelete: (id: number) => void;
  viewType: string;
  handleDragEnd: (event: DragEndEvent) => void;
  setActiveId: (id: number) => void;
  activeId: number | null;
  dragHandle?: {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap;
  };
}

export const LectureList = ({
  chapterId,
  lectures,
  onTooglePublish,
  onDelete,
  addLecture,
  setActiveId,
  activeId,
  handleDragEnd,
}: LectureListProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={lectures.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {lectures.map((lecture, index) => (
            <SortableItem key={lecture.id} id={lecture.id}>
              {({ attributes, listeners }: SortableRenderProps) => (
                <LectureDrawer
                  chapterId={chapterId}
                  index={index}
                  activeId={activeId}
                  setActiveId={setActiveId}
                  onDelete={onDelete}
                  onTooglePublish={onTooglePublish}
                  lecture={lecture}
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

      {/* 🔥 Add Lecture Button */}
      <button
        onClick={addLecture}
        className="w-full text-xs font-medium py-2.5 rounded-md border border-dashed border-primary text-primary hover:bg-primary/10 transition-all cursor-pointer"
      >
        + Add Lecture
      </button>
    </div>
  );
};
