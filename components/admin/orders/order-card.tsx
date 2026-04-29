"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/order";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-6 space-y-6">
        {/* 🔥 ITEMS */}
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-0"
            >
              {/* 🔹 IMAGE */}
              <div className="relative w-20 h-16 rounded-md overflow-hidden bg-gray-100">
                {item.course?.image?.path ? (
                  <Image
                    src={item.course.image.path}
                    alt={item.course?.title || "course"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* 🔹 DETAILS */}
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-2">
                  {item.course?.title}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>

              {/* 🔹 PRICE */}
              <div className="text-right">
                <p className="text-sm font-semibold">
                  ₹{item.price * item.quantity}
                </p>
                <p className="text-xs text-gray-500">₹{item.price} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 PRICING SUMMARY */}
        <div className="space-y-3 text-sm bg-gray-50 rounded-xl p-4">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{order.subTotal}</span>
          </div>

          {/* 🔥 AUTO COUPON */}
          {order.autoCouponCode && (
            <div className="flex justify-between text-green-600">
              <span>Auto Coupon ({order.autoCouponCode})</span>
              <span>- ₹{order.autoDiscount || 0}</span>
            </div>
          )}

          {/* 🔥 MANUAL COUPON */}
          {order.manualCouponCode && (
            <div className="flex justify-between text-blue-600">
              <span>Coupon ({order.manualCouponCode})</span>
              <span>- ₹{order.manualDiscount || 0}</span>
            </div>
          )}

          {/* 🔥 TOTAL DISCOUNT */}
          <div className="flex justify-between text-red-500">
            <span>Total Discount</span>
            <span>- ₹{order.discount}</span>
          </div>

          {/* 🔥 TAX (NEW ADD) */}
          {order.tax > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span>₹{order.tax}</span>
            </div>
          )}

          {/* TOTAL */}
          <div className="flex justify-between font-semibold text-base border-t pt-2">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
