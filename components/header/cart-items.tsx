"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { formatCurrency } from "@/lib/formatCurrency";
import { CartItem } from "@/types/cart-item";
import { useUserCountry } from "@/context/user-country-context";
import { SheetClose } from "../ui/sheet";
import { useCouponStore } from "@/store/coupon-store";
import { useCartController } from "@/hooks/use-cart-controller";

interface CartItemProps {
  item: CartItem;
}

const CartItems = ({ item }: CartItemProps) => {
  const { userCurrency } = useUserCountry();
  const { appliedCoupon, clearCoupon } = useCouponStore();

  const { updateQuantity, removeFromCart } = useCartController();
  const basePrice =
    item.currency === "INR" ? (item.price ?? 0) : (item.int_price ?? 0);

  const offerPrice = item.salePrice || null;

  const hasDiscount = offerPrice && offerPrice < basePrice;

  const discountPercent = hasDiscount
    ? Math.round(((basePrice - offerPrice) / basePrice) * 100)
    : null;

  const displayPrice = hasDiscount ? offerPrice : basePrice;

  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
      <div className="flex-shrink-0 mr-4">
        <div style={{ width: "50px", height: "70px", position: "relative" }}>
          <SheetClose className="w-full" asChild>
            <Link href={`/product/${item.slug}`}>
              <Image
                src={item.imageUrl || "/assets/images/tea-bag.png"}
                alt={item.title}
                width={80}
                height={80}
              />
            </Link>
          </SheetClose>
        </div>
      </div>
      <div className="flex-grow flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-grow md:mr-4">
          <p className="text-md font-semibold mb-2">
            <SheetClose className="w-full" asChild>
              <Link href={`/product/${item.slug}`}>{item.title}</Link>
            </SheetClose>
          </p>
          <div className="pb-2 flex flex-col">
            <div className="flex items-center gap-2">
              {/* Offer Price */}
              <span className="text-sm font-semibold text-webprimary">
                {formatCurrency(displayPrice * item.quantity, userCurrency)}
              </span>

              {/* Original Price */}
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  {formatCurrency(basePrice * item.quantity, userCurrency)}
                </span>
              )}

              {/* Discount */}
              {discountPercent && (
                <span className="text-[10px] font-semibold bg-webprimary text-white px-1.5 py-[1px] rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={async () =>
                await updateQuantity(item.id, item.quantity - 1)
              }
              className="px-2 py-1 rounded-md bg-red-500 text-white text-sm"
            >
              -
            </button>
            <span className="text-sm px-2">{item.quantity}</span>
            <button
              onClick={async () =>
                await updateQuantity(item.id, item.quantity + 1)
              }
              className="px-2 py-1 bg-emerald-500 text-white rounded-md text-sm"
            >
              +
            </button>
          </div>
        </div>
        <div className="ml-auto order-first md:order-last">
          <button
            onClick={async () =>
              await removeFromCart(item.id, appliedCoupon, clearCoupon)
            }
            className="text-red-500 hover:text-gray-500"
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
