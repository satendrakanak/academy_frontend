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
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
import { Gateway } from "@/types/settings";
import { usePayment } from "@/hooks/use-payment";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { GuestCheckoutVerificationDialog } from "./guest-checkout-verification-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { orderClientService } from "@/services/orders/order.client";

interface CheckoutClientProps {
  gateways: Gateway[];
}

const CheckoutClient = ({ gateways }: CheckoutClientProps) => {
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [maskedVerificationEmail, setMaskedVerificationEmail] = useState("");
  const [pendingGuestData, setPendingGuestData] = useState<z.infer<
    typeof checkoutSchema
  > | null>(null);
  const [isGuestVerifying, setIsGuestVerifying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const retryOrderId = Number(searchParams.get("retryOrderId") || 0);
  const isRetryFlow = Number.isFinite(retryOrderId) && retryOrderId > 0;

  const { initiatePayment, retryPayment } = usePayment();

  const { cartItems } = useCartStore();

  const { user, isLoading } = useSession();
  const checkoutForm = useCheckoutForm(user);
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = checkoutForm;

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    orderClientService
      .getMyOrders()
      .then((response) => {
        if (!isMounted) return;

        const orders = response.data || [];
        const matchedOrder = isRetryFlow
          ? orders.find((order) => order.id === retryOrderId)
          : orders[0];

        if (!matchedOrder?.billingAddress) return;

        const address = matchedOrder.billingAddress;

        reset({
          firstName: address.firstName || user.firstName || "",
          lastName: address.lastName || user.lastName || "",
          email: address.email || user.email || "",
          phoneNumber: address.phoneNumber || user.phoneNumber || "",
          address: address.address || "",
          country: address.country || "",
          state: address.state || "",
          city: address.city || "",
          pincode: address.pincode || "",
        });
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [isRetryFlow, reset, retryOrderId, user]);

  if (isLoading) return <div>Loading...</div>;

  const handlePaymentSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    if (!selectedGateway) {
      toast.error("Please select a payment method");
      return;
    }

    if (!cartItems.length) {
      toast.error("Cart is empty");
      return;
    }
    try {
      if (!user) {
        const response = await authService.startCheckoutVerification({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });

        setPendingGuestData(data);
        setVerificationEmail(data.email);
        setMaskedVerificationEmail(response.data?.maskedEmail || data.email);
        setVerificationOpen(true);
        toast.success("Verification code sent to your email");
        return;
      }

      if (isRetryFlow) {
        await retryPayment(retryOrderId, data);
        return;
      }

      await initiatePayment(data, selectedGateway.provider);
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  const handleGuestOtpVerify = async (code: string) => {
    if (!pendingGuestData || !selectedGateway) return;

    try {
      setIsGuestVerifying(true);
      await authService.verifyCheckoutOtp({
        email: verificationEmail,
        code,
      });

      toast.success("Email verified. Continuing to payment.");
      setVerificationOpen(false);
      router.refresh();
      if (isRetryFlow) {
        await retryPayment(retryOrderId, pendingGuestData);
        return;
      }

      await initiatePayment(pendingGuestData, selectedGateway.provider);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsGuestVerifying(false);
    }
  };

  const handleGuestOtpResend = async () => {
    if (!pendingGuestData) return;

    const response = await authService.startCheckoutVerification({
      firstName: pendingGuestData.firstName,
      lastName: pendingGuestData.lastName,
      email: pendingGuestData.email,
      phoneNumber: pendingGuestData.phoneNumber,
    });

    setMaskedVerificationEmail(
      response.data?.maskedEmail || pendingGuestData.email,
    );
    toast.success("A fresh verification code has been sent");
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
    <FormProvider {...checkoutForm}>
      <div>
        <form onSubmit={handleSubmit(handlePaymentSubmit)}>
          <div className="min-h-screen lg:grid lg:grid-cols-3">
            {/* LEFT */}
            <div className="lg:col-span-2 bg-white px-6 lg:px-16 py-10">
              <div className="max-w-3xl mx-auto space-y-10">
                <h1 className="text-2xl font-semibold">Checkout</h1>
                {!user ? (
                  <p className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                    Complete your billing details first. We will create your
                    account and verify your email with an OTP before payment.
                  </p>
                ) : null}
                {isRetryFlow ? (
                  <p className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    You are retrying a previous payment. We will continue with
                    your existing order instead of creating a new one.
                  </p>
                ) : null}

                <CheckoutForm />
                <CheckoutItems />
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:block bg-gray-100">
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
        <GuestCheckoutVerificationDialog
          open={verificationOpen}
          onOpenChange={setVerificationOpen}
          maskedEmail={maskedVerificationEmail}
          isSubmitting={isGuestVerifying}
          onVerify={handleGuestOtpVerify}
          onResend={handleGuestOtpResend}
        />
      </div>
    </FormProvider>
  );
};

export default CheckoutClient;
