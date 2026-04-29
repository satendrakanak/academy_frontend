"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { Category } from "@/types/category";
import { CreateCategoryForm } from "./create-category-form";

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
  category?: Category | null;
}

export function CategoryDrawer({
  open,
  onClose,
  category,
}: CategoryDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent className="w-100 ml-auto">
        <DrawerHeader>
          <DrawerTitle>
            {category ? "Edit Category" : "Create Category"}
          </DrawerTitle>
          <DrawerDescription>Manage your category details</DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <CreateCategoryForm category={category || undefined} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
