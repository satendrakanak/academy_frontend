"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CartSummaryProps {
  total: number | null; // 👈 important change
}

export const CartSummary = ({ total }: CartSummaryProps) => {
  const isLoading = total === null;

  return (
    <div className="relative border p-6 rounded-xl shadow-sm h-fit sticky top-24">
      {/* 🔥 Overlay Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
        </div>
      )}

      <p className="text-gray-500 mb-2">Total:</p>

      <h2 className="text-3xl font-bold mb-2">₹{total ?? 0}</h2>

      {total && total > 0 && (
        <>
          <p className="text-sm text-gray-400 line-through">₹{total + 2000}</p>

          <p className="text-sm text-green-600 mb-5">80% off</p>
        </>
      )}

      <Button disabled={!total} className="w-full h-12 text-base font-semibold">
        Proceed to Checkout →
      </Button>

      <button className="mt-4 w-full border rounded-md py-2 text-sm">
        Apply Coupon
      </button>
    </div>
  );
};
