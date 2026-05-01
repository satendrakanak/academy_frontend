"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "@/types/cart";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface CartItemCardProps {
  showRemove?: boolean;
  item: CartItem;
}

export const CartItemCard = ({ item, showRemove }: CartItemCardProps) => {
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const autoDiscount = useCartStore((s) => s.autoDiscount);
  const manualDiscount = useCartStore((s) => s.manualDiscount);
  const total = useCartStore((s) => s.totalPrice());
  const discount = autoDiscount + manualDiscount;

  // per item proportional discount
  const itemDiscount =
    total > 0 ? Math.round((item.price / total) * discount) : 0;

  const finalPrice = item.price - itemDiscount;

  const handleRemove = () => {
    removeFromCart(item.id);
    toast("Removed from cart ❌");
  };

  return (
    <div className="flex gap-4 border-b pb-6 group last:border-none">
      {/* Image */}
      <div className="w-44 h-28 relative rounded-lg overflow-hidden">
        <Link href={`/course/${item.slug}`}>
          <Image
            src={item.image || "/placeholder.jpg"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="flex-1">
        {/* Title */}
        <h3 className="font-semibold text-lg leading-snug line-clamp-2">
          <Link href={`/course/${item.slug}`}>{item.title}</Link>
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-500 mt-1">
          By{" "}
          <span className="text-gray-700 font-medium">
            {item.instructor || "Unknown Instructor"}
          </span>
        </p>

        {/* Meta Info (Hydration Safe) */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
          <span>
            {item.totalDuration ? item.totalDuration : "--"} total duration
          </span>
          <span>•</span>
          <span>{item.totalLectures ? item.totalLectures : "--"} lectures</span>
          <span>•</span>
          <span>All Levels</span>
        </div>

        {/* Actions */}
        {showRemove && (
          <div className="mt-3 flex items-center gap-5 text-sm">
            <button
              onClick={handleRemove}
              className="flex items-center gap-1 text-red-500 
                       hover:text-red-600 hover:bg-red-50 
                       active:scale-95 px-2 py-1 rounded-md 
                       transition-all duration-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="text-right min-w-25 flex flex-col items-end">
        {discount > 0 ? (
          <>
            <p className="font-bold text-lg text-gray-900">₹{finalPrice}</p>
            <p className="text-xs line-through text-gray-400">₹{item.price}</p>
          </>
        ) : (
          <p className="font-bold text-lg text-gray-900">₹{item.price}</p>
        )}
      </div>
    </div>
  );
};
