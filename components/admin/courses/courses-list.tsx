"use client";
import { DataTable } from "@/components/admin/data-table/data-table";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@/types/course";
import { courseClientService } from "@/services/courses/course.client";
import { getCourseColumns } from "./course-columns";
import AddButton from "../data-table/add-button";
import { CreateCouponForm } from "../coupons/create-coupon-form";

interface CoursesListProps {
  courses: Course[];
}

export const CoursesList = ({ courses }: CoursesListProps) => {
  const [deleteItem, setDeleteItem] = useState<Course | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔥 DELETE CLICK
  const handleDeleteClick = (course: Course) => {
    setDeleteItem(course);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setLoading(true);

      await courseClientService.delete(deleteItem.id);

      toast.success("Course deleted");
      setDeleteOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  const columns = getCourseColumns(handleDeleteClick);
  return (
    <div>
      <DataTable
        data={courses}
        columns={columns}
        searchColumn="title"
        action={
          <AddButton
            title="Add Coupon"
            redirectPath="/admin/courses"
            FormComponent={CreateCouponForm}
          />
        }
      />
      <ConfirmDeleteDialog
        deleteText="course"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
    </div>
  );
};
