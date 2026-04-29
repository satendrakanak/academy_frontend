"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Order, OrderStatus } from "@/types/order";

// 🎨 Status color helper
const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PAID:
      return "bg-green-100 text-green-700 border-green-200";
    case OrderStatus.FAILED:
      return "bg-red-100 text-red-700 border-red-200";
    case OrderStatus.CANCELLED:
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }
};

export const getOrderColumns = (): ColumnDef<Order>[] => [
  // ✅ Select
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
  },

  // 🔥 Order ID (Clickable)
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Link href={`/admin/orders/${order.id}`}>
          <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
            #{order.id}
          </span>
        </Link>
      );
    },
  },

  // 👤 User
  {
    header: "Customer",
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
      );
    },
  },

  // 💰 Pricing
  {
    header: "Amount",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-col text-sm">
          <span className="font-semibold">₹{order.totalAmount}</span>

          <span className="text-xs text-gray-500">Sub: ₹{order.subTotal}</span>

          {order.discount > 0 && (
            <span className="text-xs text-red-500">-₹{order.discount}</span>
          )}
        </div>
      );
    },
  },

  // 📊 Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge variant="outline" className={getStatusVariant(status)}>
          {status}
        </Badge>
      );
    },
  },

  // 📅 Created Date
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

      return (
        <div className="text-sm">
          <p>{date.toLocaleDateString("en-GB")}</p>
          <p className="text-xs text-gray-500">
            {date.toLocaleTimeString("en-IN")}
          </p>
        </div>
      );
    },
  },
];
