"use client";

import { Order } from "@/types/order";
import { OrderStatusManager } from "./order-status-manager";
import { OrderQuickInfo } from "./order-quick-info";

interface OrderRightSidebarProps {
  order: Order;
}

export const OrderRightSidebar = ({ order }: OrderRightSidebarProps) => {
  return (
    <div className="sticky top-24 space-y-4">
      <OrderStatusManager order={order} />
      <OrderQuickInfo order={order} />
    </div>
  );
};
