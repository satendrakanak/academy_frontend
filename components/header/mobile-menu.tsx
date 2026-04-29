"use client";

import { FaHome, FaRegCalendarAlt } from "react-icons/fa";
import { BsCart3, BsGrid } from "react-icons/bs";

import { RiAccountCircleLine } from "react-icons/ri";
import Link from "next/link";
// import { LoginButton } from "@/components/auth/login-button";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import CartDetails from "@/components/header/cart-details";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useCartStore } from "@/store/cart-store";

const MobileMenu = () => {
  // const user = useCurrentUser();
  // const { cartItems } = useCartStore();
  // const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed md:hidden z-50 bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Link href="/" className="flex flex-col items-center justify-center">
            <button className="flex flex-col items-center justify-center">
              <FaHome size={24} className="mb-1" />
            </button>
          </Link>
        </div>

        <div>
          <Link
            href="/products"
            className="flex flex-col items-center justify-center"
          >
            <button className="flex flex-col items-center justify-center">
              <BsGrid size={22} className="mb-1" />
            </button>
          </Link>
        </div>

        <div>
          <Sheet>
            <SheetTrigger className="flex flex-col items-center justify-center">
              <span className="relative inline-block">
                <BsCart3 size={24} className="mb-1" />

                {/* {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {totalQuantity}
                  </span>
                )} */}
              </span>
            </SheetTrigger>
            <SheetContent side="right">
              <h2 className="text-2xl font-bold mb-5 border-b-2 pb-2">
                Your Shopping Cart
              </h2>
              {/* <CartDetails /> */}
            </SheetContent>
          </Sheet>
        </div>

        <div>
          {/* {user ? (
            <Link href="/user/dashboard">
              <div className="flex flex-col items-center justify-center">
                <RiAccountCircleLine size={24} className="mb-1" />
              </div>
            </Link>
          ) : (
            <LoginButton>
              <div className="flex flex-col items-center justify-center">
                <RiAccountCircleLine size={24} className="mb-1" />
              </div>
            </LoginButton>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
