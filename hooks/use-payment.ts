"use client";

import { useCartStore } from "@/store/cart-store";
import { orderClientService } from "@/services/orders/order.client";
import { settingsClientService } from "@/services/settings/settings.client";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-handler";
import { z } from "zod";
import { checkoutSchema } from "@/schemas/checkout";
import {
  OpenRazorpayParams,
  RazorpayInstance,
  RazorpayOptions,
  RazorpaySuccessResponse,
} from "@/types/order";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export const usePayment = () => {
  const router = useRouter();

  const clearCart = useCartStore((s) => s.clearCart);

  // 🔥 ALWAYS fresh state (IMPORTANT)
  const getCartState = () => useCartStore.getState();

  // ===============================
  // 🔥 COMMON RAZORPAY HANDLER
  // ===============================
  const openRazorpay = async ({
    keyId,
    razorpayOrderId,
    amount,
    currency,
    data,
    courses,
  }: OpenRazorpayParams) => {
    const Razorpay = window.Razorpay;

    if (!Razorpay) {
      toast.error("Payment SDK not loaded");
      return;
    }

    const rzp = new Razorpay({
      key: keyId,
      amount,
      currency,
      order_id: razorpayOrderId,
      name: "Unitus",
      description: "Course payment",

      handler: async (response: RazorpaySuccessResponse) => {
        try {
          await orderClientService.verifyPayment(response);

          toast.success("✅ Payment successful");

          clearCart();

          if (courses.length === 1) {
            router.push(`/course/${courses[0].slug}/learn`);
          } else {
            router.push("/my-courses");
          }
        } catch (err) {
          toast("Payment received. Verifying...");
          router.push("/my-courses");
        }
      },

      modal: {
        ondismiss: function () {
          toast.error("⚠️ Payment cancelled");
        },
      },

      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },

      theme: {
        color: "#0f172a",
      },
    });

    rzp.open();

    rzp.on("payment.failed", function (response: any) {
      console.error("❌ Payment Failed:", response);

      toast.error(
        response?.error?.description || "Payment failed. Please try again.",
      );
    });
  };

  // ===============================
  // 🥇 INITIATE PAYMENT
  // ===============================
  const initiatePayment = async (
    data: z.infer<typeof checkoutSchema>,
    provider: string,
  ) => {
    try {
      const {
        cartItems,
        finalAmount,
        autoDiscount,
        manualDiscount,
        autoCoupon,
        manualCoupon,
      } = getCartState();

      if (!cartItems.length) {
        toast.error("Cart is empty");
        return;
      }

      const originalPrice = cartItems.reduce((t, i) => t + i.price, 0);

      // 🔥 FINAL PAYABLE (after discount)
      const totalAmount = finalAmount || originalPrice;

      // 🔥 REVERSE GST (consistent with your UI)
      const subTotal = Math.round(totalAmount / 1.18);
      const tax = totalAmount - subTotal;

      const payload = {
        items: cartItems.map((item) => ({
          courseId: item.id,
          quantity: 1,
        })),

        billingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          country: data.country,
          state: data.state,
          city: data.city,
          pincode: data.pincode,
        },

        // 🔥 PRICING
        discount: autoDiscount + manualDiscount, // coupon
        subTotal, // GST removed
        tax, // GST part
        totalAmount, // final payable
        manualCouponCode: manualCoupon || null,
        autoCouponCode: autoCoupon || null,

        paymentMethod: provider,
      };

      const res = await orderClientService.create(payload);

      const { razorpayOrderId, amount, currency, courses } = res.data;

      const configRes = await settingsClientService.getPaymentConfig();
      const { keyId } = configRes.data;

      await openRazorpay({
        keyId,
        razorpayOrderId,
        amount,
        currency,
        data,
        courses,
      });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  // ===============================
  // 🥈 RETRY PAYMENT
  // ===============================
  const retryPayment = async (
    orderId: number,
    data: z.infer<typeof checkoutSchema>,
  ) => {
    try {
      const res = await orderClientService.retry(orderId);

      const { razorpayOrderId, amount, currency, courses } = res.data;

      const configRes = await settingsClientService.getPaymentConfig();
      const { keyId } = configRes.data;

      await openRazorpay({
        keyId,
        razorpayOrderId,
        amount,
        currency,
        data,
        courses,
      });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    initiatePayment,
    retryPayment,
  };
};
