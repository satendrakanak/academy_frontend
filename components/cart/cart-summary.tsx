"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  price: number;
  discountPrice?: number;
}

interface CartSummaryProps {
  items: CartItem[];
}

export const CartSummary = ({ items }: CartSummaryProps) => {
  const router = useRouter();

  // 🔥 Calculations
  const originalTotal = items.reduce((sum, i) => sum + i.price, 0);

  const finalTotal = items.reduce(
    (sum, i) => sum + (i.discountPrice ?? i.price),
    0,
  );

  const discount = originalTotal - finalTotal;

  const gstRate = 0.18;
  const baseAmount = Math.round(finalTotal / (1 + gstRate));
  const gstAmount = finalTotal - baseAmount;

  const format = (n: number) => new Intl.NumberFormat("en-IN").format(n);

  const isEmpty = items.length === 0;

  return (
    <div className="border p-6 rounded-xl shadow-sm h-fit sticky top-24 bg-white">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* ORIGINAL */}
      {discount > 0 && (
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Original Price</span>
          <span className="line-through">₹{format(originalTotal)}</span>
        </div>
      )}

      {/* DISCOUNT */}
      {discount > 0 && (
        <div className="flex justify-between text-green-600 text-sm mt-1">
          <span>You Saved</span>
          <span>-₹{format(discount)}</span>
        </div>
      )}

      {/* SUBTOTAL */}
      <div className="flex justify-between mt-4 border-t pt-4 text-sm">
        <span className="text-gray-600">Subtotal (excl. GST)</span>
        <span>₹{format(baseAmount)}</span>
      </div>

      {/* GST */}
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>GST (18%)</span>
        <span>₹{format(gstAmount)}</span>
      </div>

      {/* TOTAL */}
      <div className="flex justify-between text-lg font-semibold mt-4 border-t pt-4">
        <span>Total</span>
        <span>₹{format(finalTotal)}</span>
      </div>

      {/* GST NOTE */}
      <p className="text-xs text-gray-500 mt-1 text-right">
        Applicable GST is included in your total.
      </p>

      {/* CTA */}
      <Link href="/checkout">
        <Button disabled={isEmpty} className="w-full mt-5 h-12 text-base">
          Proceed to Checkout →
        </Button>
      </Link>

      {/* GUARANTEE */}
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-gray-800">
          30-Day Money-Back Guarantee
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Not satisfied? Get a full refund within 30 days.
        </p>
      </div>
    </div>
  );
};
