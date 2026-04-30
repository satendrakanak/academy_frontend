"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { Gateway } from "@/types/settings";
import { useEffect } from "react";

interface OrderSummaryProps {
  isSubmitting: boolean;
  isValid: boolean;
  gateways: Gateway[];
  selectedGateway: Gateway | null;
  onSelectGateway: (gateway: Gateway) => void;
}

export const OrderSummary = ({
  isSubmitting,
  isValid,
  gateways,
  onSelectGateway,
  selectedGateway,
}: OrderSummaryProps) => {
  const {
    cartItems,
    autoDiscount,
    manualDiscount,
    finalAmount,
    manualCoupon,
  } = useCartStore();

  const originalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const totalDiscount = autoDiscount + manualDiscount;
  const finalPrice = Math.max(
    totalDiscount > 0 ? finalAmount : originalPrice,
    0,
  );

  // 🔥 GST reverse
  const gstRate = 0.18;
  const basePrice = Math.round(finalPrice / (1 + gstRate));
  const gstAmount = finalPrice - basePrice;

  const format = (num: number) => new Intl.NumberFormat("en-IN").format(num);

  // 🔥 Gateway Logic
  const isPaymentGatewayAvailable = gateways.length > 0;
  const hasMultipleGateways = gateways.length > 1;

  useEffect(() => {
    if (gateways.length === 1) {
      onSelectGateway(gateways[0]);
    }
  }, [gateways, onSelectGateway]);

  return (
    <div className="max-w-sm w-full space-y-5">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      {/* 🔥 PRICE DETAILS */}
      <div className="space-y-3 text-sm">
        {/* ORIGINAL */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-gray-400">
            <span>Original Price</span>
            <span className="line-through">₹{format(originalPrice)}</span>
          </div>
        )}

        {/* AUTO */}
        {autoDiscount > 0 && (
          <div className="flex justify-between text-blue-600">
            <span>Best offer applied</span>
            <span>-₹{format(autoDiscount)}</span>
          </div>
        )}

        {/* MANUAL */}
        {manualDiscount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Coupon ({manualCoupon})</span>
            <span>-₹{format(manualDiscount)}</span>
          </div>
        )}

        {/* TOTAL SAVED */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-green-700 font-medium border-t pt-2">
            <span>You Saved</span>
            <span>-₹{format(totalDiscount)}</span>
          </div>
        )}

        {/* SUBTOTAL */}
        <div className="flex justify-between border-t pt-4">
          <span className="text-gray-600">Subtotal (excl. GST)</span>
          <span className="font-medium">₹{format(basePrice)}</span>
        </div>

        {/* GST */}
        <div className="flex justify-between text-gray-600">
          <span>GST (18%)</span>
          <span>₹{format(gstAmount)}</span>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-lg font-semibold border-t pt-4">
          <span>Total Amount</span>
          <span>₹{format(finalPrice)}</span>
        </div>

        <p className="text-xs text-gray-500 text-right">
          GST is included in your total.
        </p>
      </div>

      {/* 🚨 NO GATEWAY */}
      {!isPaymentGatewayAvailable && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          ⚠️ No payment gateway configured.
        </div>
      )}

      {/* 🔥 MULTIPLE GATEWAYS */}
      {hasMultipleGateways && (
        <div>
          <p className="text-sm font-medium mb-2">Choose Payment Method</p>

          <div className="space-y-2">
            {gateways.map((gateway) => (
              <label
                key={gateway.provider}
                className={`flex items-center justify-between border rounded-lg px-3 py-2 cursor-pointer transition ${
                  selectedGateway?.provider === gateway.provider
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway?.provider === gateway.provider}
                    onChange={() => onSelectGateway(gateway)}
                  />
                  <span className="text-sm">{gateway.displayName}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Button
        type="submit"
        className="w-full h-12 text-base font-medium"
        disabled={
          isSubmitting ||
          !isValid ||
          !isPaymentGatewayAvailable ||
          cartItems.length === 0 ||
          (hasMultipleGateways && !selectedGateway)
        }
      >
        {isSubmitting ? "Processing..." : "Proceed to Payment"}
      </Button>

      {/* FOOTER */}
      {cartItems.length === 0 ? (
        <p className="text-xs text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-800">
            30-Day Money-Back Guarantee
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Not satisfied? Get a full refund within 30 days.
          </p>
        </div>
      )}
    </div>
  );
};
