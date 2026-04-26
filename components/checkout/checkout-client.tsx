"use client";

import * as z from "zod";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import { CheckoutForm } from "./checkout-form";
import { CheckoutItems } from "./checkout-items";
import { OrderSummary } from "./order-summary";
import { useCheckoutForm } from "@/hooks/use-checkout-form";
import { useSession } from "@/context/session-context";
import { FormProvider } from "react-hook-form";
import { checkoutSchema } from "@/schemas/checkout";
import { orderClientService } from "@/services/orders/order.client";
import { settingsClientService } from "@/services/settings/settings.client";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
import { Gateway } from "@/types/settings";
import { usePayment } from "@/hooks/use-payment";
import { useState } from "react";

interface CheckoutClientProps {
  gateways: Gateway[];
}

const CheckoutClient = ({ gateways }: CheckoutClientProps) => {
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
  const { cartItems } = useCartStore();
  const { initiatePayment } = usePayment();

  const { user, isLoading } = useSession();
  if (isLoading) return <div>Loading...</div>;

  const checkoutForm = useCheckoutForm(user);
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = checkoutForm;

  const handlePaymentSubmit = (data: z.infer<typeof checkoutSchema>) => {
    if (!selectedGateway) {
      toast.error("Please select a payment method");
      return;
    }
    initiatePayment(data, selectedGateway.provider);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border rounded-xl py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-500">
          Add items to your cart to checkout.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...checkoutForm} key="checkout">
      <form onSubmit={handleSubmit(handlePaymentSubmit)}>
        <div className="min-h-screen lg:grid lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-white px-6 lg:px-16 py-10">
            <div className="max-w-3xl mx-auto space-y-10">
              <h1 className="text-2xl font-semibold">Checkout</h1>

              <CheckoutForm />
              <CheckoutItems />
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:block bg-gray-100">
            {/* 🔥 THIS IS KEY */}
            <div className="sticky top-24 h-fit">
              <div className="max-w-md mx-auto px-6 py-10">
                <OrderSummary
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  gateways={gateways}
                  selectedGateway={selectedGateway}
                  onSelectGateway={setSelectedGateway}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckoutClient;
