"use client";

import { useCartStore } from "@/store/cart-store";
import { CartItemCard } from "./cart-item-card";
import { CartSummary } from "./cart-summary";
import Container from "../container";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const CartClient = () => {
  const router = useRouter();

  const cartItems = useCartStore((s) => s.cartItems);
  const total = cartItems.reduce((t, i) => t + i.price, 0);

  const isEmpty = cartItems.length === 0;

  return (
    <div className="py-20">
      <Container>
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {/* 🔥 EMPTY STATE */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center border rounded-xl py-16 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />

            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>

            <p className="text-gray-500 mb-6 max-w-sm">
              Looks like you haven’t added any courses yet. Start exploring and
              find something you love!
            </p>

            <Button
              onClick={() => router.push("/courses")}
              className="px-6 h-11 text-base"
            >
              Explore Courses →
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-5">
              <p className="text-gray-600">
                {cartItems.length > 1
                  ? `${cartItems.length} Courses`
                  : `${cartItems.length} Course`}{" "}
                in Cart
              </p>

              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* RIGHT */}
            <CartSummary total={total} />
          </div>
        )}
      </Container>
    </div>
  );
};
