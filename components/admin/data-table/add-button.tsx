"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CreateCourseForm } from "../courses/create-course-form";

interface AddButtonProps {
  title?: string;
}

export default function AddButton({ title }: AddButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* 🔥 BUTTON */}
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <IconPlus className="size-4" />
          <span className="hidden lg:inline">{title || "Add Course"}</span>
        </Button>
      </PopoverTrigger>

      {/* 🔥 POPOVER CONTENT */}
      <PopoverContent
        align="end" // 🔥 right align (important)
        className="w-80 p-4"
      >
        <div className="space-y-3">
          <CreateCourseForm
            onSuccess={(id) => {
              setOpen(false); // 🔥 close
              router.push(`/admin/courses/${id}`);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
