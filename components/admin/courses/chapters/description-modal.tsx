import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DescriptionModal({
  open,
  onOpenChange,
  chapter,
  updateChapter,
}: any) {
  if (!chapter) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl space-y-4">
        <h3 className="font-semibold">Edit Description</h3>

        {/* 👉 Replace with Tiptap */}
        <textarea
          value={chapter.description}
          onChange={(e) => updateChapter("description", e.target.value)}
          className="w-full min-h-[250px] border rounded p-2"
        />

        <Button onClick={() => onOpenChange(false)}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
