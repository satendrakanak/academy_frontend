"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/order";
import { formatDate } from "@/utils/formate-date";
import { format } from "date-fns";

interface Props {
  order: Order;
}

export const OrderQuickInfo = ({ order }: Props) => {
  return (
    <div className="rounded-lg border bg-white">
      <div className="px-4 py-3 border-b">
        <h3 className="text-sm font-medium">Order Info</h3>
      </div>
      <div className="p-3 space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 text-xs">Order ID</span>
            <span className="font-medium">#{order.id}</span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-gray-500 ">Order At</span>
            <span className="text-xs font-medium">
              {formatDate(order.createdAt)}
            </span>
          </div>

          {order.paidAt && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 ">Paid At</span>
              <span className="text-xs font-medium">
                {formatDate(order.paidAt)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-500 text-xs">Payment Method</span>
            <span className="uppercase text-xs font-medium">
              {order.paymentMethod}
            </span>
          </div>

          {order.currency && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 text-xs font-medium">
                Currency
              </span>
              <span>{order.currency}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
