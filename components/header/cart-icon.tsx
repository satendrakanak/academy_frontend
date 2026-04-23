"use client";

import { ShoppingCart } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";
import { useCartStore } from "@/store/cart-store";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CartIcon = () => {
  const { cartItems } = useCartStore();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const pathname = usePathname();
  const isCartOrCheckoutPage = pathname === "/cart" || pathname === "/checkout";
  if (isCartOrCheckoutPage) {
    return (
      <div className="cursor-default max-w-xs hidden md:block">
        <div className="flex-col items-center justify-center hidden md:flex">
          <span className="relative inline-block">
            <Link href="/cart">
              <ShoppingCart className="w-6 h-6 text-webtertiary cursor-pointer" />
            </Link>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {totalQuantity}
              </span>
            )}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="cursor-pointer max-w-xs hidden md:block">
      <Sheet>
        <SheetTrigger className="flex-col items-center justify-center hidden md:flex">
          <span className="relative inline-block">
            <ShoppingCart className="w-6 h-6 text-webtertiary hover:text-webprimary" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {totalQuantity}
              </span>
            )}
          </span>
        </SheetTrigger>
        <SheetContent side="right">
          <h2 className="text-2xl font-bold mb-5 border-b-2 pb-2">
            Your Shopping Cart
          </h2>
          <CartDetails />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartIcon;
