"use client";
import { DataTable } from "@/components/admin/data-table/data-table";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCouponColumns } from "./coupon-columns";
import { Coupon } from "@/types/coupon";
import { couponClientService } from "@/services/coupons/coupon.client";
import AddButton from "../data-table/add-button";
import { CreateCourseForm } from "../courses/create-course-form";
import { CreateCouponForm } from "./create-coupon-form";

interface CouponsListProps {
  coupons: Coupon[];
}

export const CouponsList = ({ coupons }: CouponsListProps) => {
  const [deleteItem, setDeleteItem] = useState<Coupon | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔥 DELETE CLICK
  const handleDeleteClick = (coupon: Coupon) => {
    setDeleteItem(coupon);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setLoading(true);

      await couponClientService.delete(deleteItem.id);

      toast.success("Coupon deleted");
      setDeleteOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete coupon");
    } finally {
      setLoading(false);
    }
  };

  const columns = getCouponColumns(handleDeleteClick);
  return (
    <div>
      <DataTable
        data={coupons}
        columns={columns}
        searchColumn="code"
        action={
          <AddButton
            title="Add Coupon"
            redirectPath="/admin/coupons"
            FormComponent={CreateCouponForm}
          />
        }
      />
      <ConfirmDeleteDialog
        deleteText="coupon"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
    </div>
  );
};
