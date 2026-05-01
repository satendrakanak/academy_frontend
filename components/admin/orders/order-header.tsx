"use client";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Order } from "@/types/order";

interface OrderHeaderProps {
  order: Order;
}

export const OrderHeader = ({ order }: OrderHeaderProps) => {
  return (
    <div className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 🔥 LEFT */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            Order #{order.id}
          </h1>

          {/* 🔥 STATUS + DATE */}
          <div className="flex items-center gap-3">
            <Badge
              className={
                order.status === "PAID"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : order.status === "REFUNDED"
                    ? "bg-sky-100 text-sky-700 border border-sky-200"
                    : order.status === "FAILED"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : order.status === "CANCELLED"
                        ? "bg-gray-100 text-gray-700 border border-gray-200"
                        : order.status.startsWith("REFUND_")
                          ? "bg-violet-100 text-violet-700 border border-violet-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
              }
            >
              {order.status}
            </Badge>

            <p className="text-sm text-muted-foreground">
              {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
            </p>
          </div>
        </div>

        {/* 🔥 RIGHT */}
      </div>
    </div>
  );
};
