"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { Gateway } from "@/types/settings";
import { useEffect, useState } from "react";

interface OrderSummaryProps {
  isSubmitting: boolean;
  isValid: boolean;
  gateways: Gateway[];
  selectedGateway: Gateway | null; // 🔥 new
  onSelectGateway: (gateway: Gateway) => void; // 🔥 new
}

export const OrderSummary = ({
  isSubmitting,
  isValid,
  gateways,
  onSelectGateway,
  selectedGateway,
}: OrderSummaryProps) => {
  const cartItems = useCartStore((s) => s.cartItems);

  // 🔥 Prices
  const originalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const finalPrice = cartItems.reduce(
    (acc, item) => acc + (item.discountPrice ?? item.price),
    0,
  );

  const discount = originalPrice - finalPrice;

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
  }, [gateways]);
  return (
    <div className="max-w-sm w-full ">
      <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

      {/* PRICE DETAILS */}
      <div className="space-y-4 text-sm">
        {discount > 0 && (
          <div className="flex justify-between text-gray-400">
            <span>Original Price</span>
            <span className="line-through">₹{format(originalPrice)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>You Saved</span>
            <span>-₹{format(discount)}</span>
          </div>
        )}

        <div className="flex justify-between border-t pt-4">
          <span className="text-gray-600">Subtotal (excl. GST)</span>
          <span className="font-medium">₹{format(basePrice)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>GST (18%)</span>
          <span>₹{format(gstAmount)}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold border-t pt-4">
          <span>Total Amount</span>
          <span>₹{format(finalPrice)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          Applicable GST is included in your total.
        </p>
      </div>

      {/* 🚨 NO GATEWAY */}
      {!isPaymentGatewayAvailable && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          ⚠️ No payment gateway configured. Please contact the site
          administrator.
        </div>
      )}

      {/* 🔥 MULTIPLE GATEWAYS */}
      {hasMultipleGateways && (
        <div className="mt-6">
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
        className="w-full mt-6 h-12 text-base font-medium cursor-pointer"
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
        <p className="text-xs text-gray-500 mt-4 text-center">
          Your cart is empty
        </p>
      ) : (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-800">
            30-Day Money-Back Guarantee
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Not satisfied? Get a full refund within 30 days. Simple and
            straightforward!
          </p>
        </div>
      )}
    </div>
  );
};
