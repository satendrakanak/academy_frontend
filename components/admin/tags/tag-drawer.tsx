"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { CreateTagForm } from "./create-tag-form";
import { Tag } from "@/types/tag";

interface TagDrawerProps {
  open: boolean;
  onClose: () => void;
  tag?: Tag | null;
}

export function TagDrawer({ open, onClose, tag }: TagDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent className="w-100 ml-auto">
        <DrawerHeader>
          <DrawerTitle>{tag ? "Edit Tag" : "Create Tag"}</DrawerTitle>
          <DrawerDescription>Manage your tag details</DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <CreateTagForm tag={tag || undefined} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
