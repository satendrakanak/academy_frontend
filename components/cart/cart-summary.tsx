"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { CouponApplyBox } from "../coupon/coupon-apply-box";

export const CartSummary = () => {
  const {
    cartItems,
    autoDiscount,
    manualDiscount,
    finalAmount,
    autoCoupon,
    manualCoupon,
    applyManualCoupon,
    removeCoupon,
  } = useCartStore();

  const originalTotal = cartItems.reduce((sum, i) => sum + i.price, 0);

  const totalDiscount = autoDiscount + manualDiscount;
  const finalTotal = Math.max(
    totalDiscount > 0 ? finalAmount : originalTotal,
    0,
  );

  const gstRate = 0.18;
  const baseAmount = Math.round(finalTotal / (1 + gstRate));
  const gstAmount = finalTotal - baseAmount;

  const format = (n: number) => new Intl.NumberFormat("en-IN").format(n);

  const isEmpty = cartItems.length === 0;

  return (
    <div className="border p-6 rounded-xl shadow-sm h-fit sticky top-24 bg-white space-y-5">
      <h2 className="text-lg font-semibold">Cart Summary</h2>

      {/* 🔥 ORIGINAL PRICE */}
      {totalDiscount > 0 && (
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Original Price</span>
          <span className="line-through">₹{format(originalTotal)}</span>
        </div>
      )}

      {/* 🔥 AUTO DISCOUNT */}
      {autoDiscount > 0 && (
        <div className="flex justify-between text-blue-600 text-sm">
          <span>Best offer applied 🎉 ({autoCoupon})</span>
          <span>-₹{format(autoDiscount)}</span>
        </div>
      )}

      {/* 🔥 MANUAL DISCOUNT */}
      {manualDiscount > 0 && (
        <div className="flex justify-between text-green-600 text-sm">
          <span>Coupon ({manualCoupon})</span>
          <span>-₹{format(manualDiscount)}</span>
        </div>
      )}

      {/* 🔥 TOTAL SAVINGS */}
      {totalDiscount > 0 && (
        <div className="flex justify-between text-sm font-medium text-green-700 border-t pt-2">
          <span>You Saved</span>
          <span>-₹{format(totalDiscount)}</span>
        </div>
      )}

      {/* 🔥 SUBTOTAL */}
      <div className="flex justify-between mt-2 border-t pt-4 text-sm">
        <span className="text-gray-600">Subtotal (excl. GST)</span>
        <span>₹{format(baseAmount)}</span>
      </div>

      {/* 🔥 GST */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>GST (18%)</span>
        <span>₹{format(gstAmount)}</span>
      </div>

      {/* 🔥 TOTAL */}
      <div className="flex justify-between text-lg font-semibold border-t pt-4">
        <span>Total</span>
        <span>₹{format(finalTotal)}</span>
      </div>

      {/* 🔥 GST NOTE */}
      <p className="text-xs text-gray-500 text-right">
        GST is included in the total amount.
      </p>

      {/* 🔥 COUPON BOX */}
      <CouponApplyBox
        appliedCoupon={manualCoupon} // manual removable
        onApply={applyManualCoupon}
        onRemove={removeCoupon}
      />

      {/* 🔥 CTA */}
      <Link href="/checkout">
        <Button disabled={isEmpty} className="w-full h-12 text-base">
          Proceed to Checkout →
        </Button>
      </Link>

      {/* 🔥 GUARANTEE */}
      <div className="text-center">
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
