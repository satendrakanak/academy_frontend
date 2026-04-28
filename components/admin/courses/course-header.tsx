"use client";

import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { checkCoursePublish } from "@/helpers/publish-rules";
import { cn } from "@/lib/utils";
import { courseClientService } from "@/services/courses/course.client";
import { Course } from "@/types/course";
import { CheckCircle, RotateCcw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getErrorMessage } from "@/lib/error-handler";

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { canPublish, reasons } = checkCoursePublish(course);

  const handleToggleFeatured = async () => {
    try {
      await courseClientService.update(course.id, {
        isFeatured: !course.isFeatured,
      });

      toast.success(
        course.isFeatured ? "Removed from featured" : "Marked as featured",
      );

      router.refresh();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };
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
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
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
  const isPublishAction = !course.isPublished;
  const disabled = isPublishAction && !canPublish;
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
            {course.isFeatured && (
              <Badge className="text-xs bg-purple-100 text-purple-700 border border-purple-200">
                Featured
              </Badge>
            )}

            <p className="text-sm text-muted-foreground">
              Manage your course settings
            </p>
          </div>
        </div>

        {/* 🔥 RIGHT */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleToggleFeatured}
            className={cn(
              "flex items-center gap-1 transition",
              course.isFeatured
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-700 hover:bg-gray-800",
            )}
          >
            {course.isFeatured ? <>⭐ Unfeature</> : <>⭐ Feature</>}
          </Button>
          {/* Publish / Unpublish */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  {" "}
                  {/* 🔥 wrapper (IMPORTANT for disabled button) */}
                  <Button
                    size="sm"
                    disabled={disabled}
                    onClick={handleTogglePublish}
                    className={cn(
                      "flex items-center gap-1 transition",
                      course.isPublished
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700",
                      disabled && "opacity-50 cursor-not-allowed",
                    )}
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
                </span>
              </TooltipTrigger>

              {/* 🔥 TOOLTIP CONTENT */}
              {disabled && (
                <TooltipContent
                  side="bottom"
                  align="end"
                  sideOffset={10}
                  className=" bg-white flex flex-col text-gray-800 border shadow-md rounded-md p-3 "
                >
                  {/* 🔥 HEADING */}
                  <p className="text-sm font-semibold mb-2">
                    Complete required steps
                  </p>

                  {/* 🔥 LIST */}
                  <ul className="text-xs space-y-1">
                    {reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span className="leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

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
