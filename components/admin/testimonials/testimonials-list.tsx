"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { IconPlus } from "@tabler/icons-react";

import { DataTable } from "@/components/admin/data-table/data-table";
import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { Button } from "@/components/ui/button";
import { testimonialClientService } from "@/services/testimonials/testimonial.client";
import { Testimonial } from "@/types/testimonial";
import { getTestimonialColumns } from "./testimonial-columns";
import { TestimonialDrawer } from "./testimonial-drawer";

interface TestimonialsListProps {
  testimonials: Testimonial[];
}

export const TestimonialsList = ({ testimonials }: TestimonialsListProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Testimonial | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelected(testimonial);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleDeleteClick = (testimonial: Testimonial) => {
    setDeleteItem(testimonial);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setLoading(true);
      await testimonialClientService.delete(deleteItem.id);
      toast.success("Testimonial deleted");
      setDeleteOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setLoading(false);
    }
  };

  const columns = getTestimonialColumns(handleEdit, handleDeleteClick);

  return (
    <div>
      <DataTable
        data={testimonials}
        columns={columns}
        searchColumn="name"
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={handleCreate}
          >
            <IconPlus className="size-4" />
            <span className="hidden lg:inline">Add Testimonial</span>
          </Button>
        }
      />

      <TestimonialDrawer
        open={open}
        onClose={handleDrawerClose}
        testimonial={selected}
      />

      <ConfirmDeleteDialog
        deleteText="testimonial"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
    </div>
  );
};
