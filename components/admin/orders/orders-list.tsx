"use client";
import { DataTable } from "@/components/admin/data-table/data-table";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getOrderColumns } from "./order-columns";
import { userClientService } from "@/services/users/user.client";
import { getErrorMessage } from "@/lib/error-handler";
import { Order } from "@/types/order";

interface OrdersListProps {
  orders: Order[];
}

export const OrdersList = ({ orders }: OrdersListProps) => {
  const [deleteItem, setDeleteItem] = useState<Order | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("Orders", orders);

  const handleDeleteClick = (order: Order) => {
    setDeleteItem(order);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setLoading(true);

      await userClientService.delete(deleteItem.id);

      toast.success("Order deleted");
      setDeleteOpen(false);
      router.refresh();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const columns = getOrderColumns(handleDeleteClick);
  return (
    <div>
      <DataTable data={orders} columns={columns} searchColumn="id" />
      <ConfirmDeleteDialog
        deleteText="order"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
    </div>
  );
};
