"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Category, CategoryType } from "@/types/category";
import { CreateCategoryForm } from "./create-category-form";

interface CategoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  defaultType?: CategoryType;
}

export function CategoryDrawer({
  open,
  onOpenChange,
  category,
  defaultType = "course",
}: CategoryDrawerProps) {
  const isEdit = Boolean(category);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="w-full border-l border-[var(--brand-100)] bg-white sm:max-w-[720px]">
        <DrawerHeader className="border-b border-slate-100 px-6 py-5 text-left">
          <DrawerTitle className="text-2xl font-semibold text-slate-950">
            {isEdit ? "Edit category" : "Create category"}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-slate-500">
            Manage course and article categories from one clean, type-aware editor.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[calc(100vh-146px)]">
          <div className="px-6 py-5">
            <CreateCategoryForm
              key={category?.id ?? `new-${defaultType}`}
              category={category || undefined}
              defaultType={defaultType}
              onSuccess={() => onOpenChange(false)}
            />
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t border-slate-100 bg-white px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
