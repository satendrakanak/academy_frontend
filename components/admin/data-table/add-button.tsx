import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

interface AddButtonProps {
  title?: string;
}

export default function AddButton({ title }: AddButtonProps) {
  return (
    <div>
      <Button variant="outline" size="sm">
        <IconPlus />
        <span className="hidden lg:inline">{title || "Add"}</span>
      </Button>
    </div>
  );
}
