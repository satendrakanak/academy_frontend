"use client";

import { useCartStore } from "@/store/cart-store";
import { CartItemCard } from "../cart/cart-item-card";

export const CheckoutItems = () => {
  const cartItems = useCartStore((s) => s.cartItems);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">
        Order Details
        <span className="text-sm font-normal">
          {" "}
          (
          {cartItems.length > 1
            ? `${cartItems.length} Courses`
            : `${cartItems.length} Course`}{" "}
          )
        </span>
      </h2>

      <div className="lg:col-span-2 space-y-5">
        {cartItems.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
