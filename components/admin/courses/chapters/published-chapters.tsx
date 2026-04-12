import { Chapter } from "@/types/chapter";

export default function PublishedList({
  chapters,
  onEdit,
}: {
  chapters: Chapter[];
  onEdit: (id: string) => void;
}) {
  return (
    <div className="col-span-2 border rounded-xl p-4 space-y-3">
      <h3 className="font-semibold text-sm">Published Chapters</h3>

      {chapters.length === 0 && (
        <p className="text-xs text-muted-foreground">No published chapters</p>
      )}

      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          onClick={() => onEdit(chapter.id)}
          className="p-2 border rounded cursor-pointer hover:bg-muted text-sm"
        >
          {chapter.title}
        </div>
      ))}
    </div>
  );
}
