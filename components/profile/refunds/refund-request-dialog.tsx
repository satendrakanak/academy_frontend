"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { refundClientService } from "@/services/refunds/refund.client";

const refundRequestSchema = z.object({
  reason: z.string().min(10, "Please share a meaningful refund reason."),
  customerNote: z.string().max(2000).optional(),
});

type RefundRequestFormValues = z.infer<typeof refundRequestSchema>;

export function RefundRequestDialog({
  open,
  onOpenChange,
  orderId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: number;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RefundRequestFormValues>({
    resolver: zodResolver(refundRequestSchema),
    defaultValues: {
      reason: "",
      customerNote: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      setIsSubmitting(true);
      await refundClientService.createRequest(orderId, values);
      toast.success("Refund request submitted successfully.");
      onOpenChange(false);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Unable to submit refund request right now.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Request a refund</DialogTitle>
          <DialogDescription>
            Share the reason clearly. The management team will review the
            request and update your order trail with every action taken.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              Refund reason
            </label>
            <Textarea
              {...form.register("reason")}
              rows={5}
              placeholder="Tell us why you want the refund and what happened."
              className="min-h-32 rounded-2xl px-4 py-3"
            />
            {form.formState.errors.reason ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.reason.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              Additional note
            </label>
            <Textarea
              {...form.register("customerNote")}
              rows={4}
              placeholder="Optional context for the admin team."
              className="min-h-24 rounded-2xl px-4 py-3"
            />
            {form.formState.errors.customerNote ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.customerNote.message}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting
                </>
              ) : (
                "Submit refund request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
