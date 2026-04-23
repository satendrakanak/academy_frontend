"use client";

import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courseClientService } from "@/services/courses/course.client";
import { Course } from "@/types/course";
import { CheckCircle, RotateCcw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 🔥 Toggle Publish
  const handleTogglePublish = async () => {
    try {
      await courseClientService.update(course.id, {
        isPublished: !course.isPublished,
      });

      toast.success(
        course.isPublished ? "Course unpublished" : "Course published",
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update course status");
    }
  };

  // 🔥 Delete Course
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await courseClientService.delete(course.id);

      toast.success("Course deleted");
      router.push("/admin/courses");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  return (
    <div className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 🔥 LEFT */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            {course.title}
          </h1>

          <div className="flex items-center gap-2">
            <Badge
              variant={course.isPublished ? "default" : "secondary"}
              className="text-xs"
            >
              {course.isPublished ? "Published" : "Draft"}
            </Badge>

            <p className="text-sm text-muted-foreground">
              Manage your course settings
            </p>
          </div>
        </div>

        {/* 🔥 RIGHT */}
        <div className="flex items-center gap-2">
          {/* Publish / Unpublish */}
          <Button
            size="sm"
            onClick={handleTogglePublish}
            className={`flex items-center gap-1 ${
              course.isPublished
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {course.isPublished ? (
              <>
                <RotateCcw className="size-4" />
                Unpublish
              </>
            ) : (
              <>
                <CheckCircle className="size-4" />
                Publish
              </>
            )}
          </Button>

          {/* Delete */}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpenDeleteDialog(true)} // 🔥 open dialog
            className="flex items-center gap-1"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
        <ConfirmDeleteDialog
          deleteText="course"
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleDelete}
          loading={isDeleting}
        />
      </div>
    </div>
  );
};
