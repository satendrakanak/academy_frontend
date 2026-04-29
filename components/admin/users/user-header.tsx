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
import { User } from "@/types/user";
import { userClientService } from "@/services/users/user.client";

interface UserHeaderProps {
  user: User;
}

export const UserHeader = ({ user }: UserHeaderProps) => {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // const { canPublish, reasons } = checkCoursePublish(course);

  // const handleToggleFeatured = async () => {
  //   try {
  //     await courseClientService.update(course.id, {
  //       isFeatured: !course.isFeatured,
  //     });

  //     toast.success(
  //       course.isFeatured ? "Removed from featured" : "Marked as featured",
  //     );

  //     router.refresh();
  //   } catch (error: unknown) {
  //     const message = getErrorMessage(error);
  //     toast.error(message);
  //   }
  // };
  // 🔥 Toggle Publish
  // const handleTogglePublish = async () => {
  //   try {
  //     await courseClientService.update(course.id, {
  //       isPublished: !course.isPublished,
  //     });

  //     toast.success(
  //       course.isPublished ? "Course unpublished" : "Course published",
  //     );

  //     router.refresh();
  //   } catch (error: unknown) {
  //     const message = getErrorMessage(error);
  //     toast.error(message);
  //   }
  // };

  // 🔥 Delete Course
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      //await userClientService.delete(course.id);

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
  // const isPublishAction = !course.isPublished;
  // const disabled = isPublishAction && !canPublish;
  return (
    <div className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 🔥 LEFT */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            {user.firstName + " " + user.lastName}
          </h1>

          <div className="flex items-center gap-2">
            {/* <Badge
              variant={course.isPublished ? "default" : "secondary"}
              className="text-xs"
            >
              {course.isPublished ? "Published" : "Draft"}
            </Badge>
            {course.isFeatured && (
              <Badge className="text-xs bg-purple-100 text-purple-700 border border-purple-200">
                Featured
              </Badge>
            )} */}

            <p className="text-sm text-muted-foreground">
              Manage user settings
            </p>
          </div>
        </div>

        {/* 🔥 RIGHT */}
        <div className="flex items-center gap-2">
          {/* <Button
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
          </Button> */}
          {/* Publish / Unpublish */}

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
          deleteText="user"
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleDelete}
          loading={isDeleting}
        />
      </div>
    </div>
  );
};
