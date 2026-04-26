import axios from "axios";
declare global {
  interface Window {
    Razorpay: typeof Razorpay;
  }
}
type RazorpayPaymentResult =
  | {
      status: "success";
      razorpay_order_id: string;
      razorpay_payment_id: string;
    }
  | {
      status: "cancelled";
      message: string;
    }
  | {
      status: "error";
      message: string;
      error?: any;
    };

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export const handleRazorpayPayment = () => {
  const initializeRazorpayPayment = async (
    values: any,
    checkoutData: any,
  ): Promise<RazorpayPaymentResult> => {
    return new Promise(async (resolve, reject) => {
      const res = await initializeRazorpay();
      if (!res) {
        return reject({
          status: "error",
          message: "Razorpay SDK Failed to load",
        });
      }

      const razorpayData = {
        id: checkoutData.id,
        orderId: checkoutData.orderId,
        amount: checkoutData.totalAmount,
        userId: checkoutData.userId,
        currency: checkoutData.currency,
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        contact: values.phoneNumber,
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,
      };

      try {
        const response = await axios.post("/api/razorpay", razorpayData);
        const data = response.data;
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
          name: "Unitus",
          currency: data.currency,
          amount: Math.round(data.amount * 100),
          order_id: data.id,
          description: "Thank you for your interest in Unitus",
          image: "./assets/unitus-logo.png",
          notes: {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            contact: values.phoneNumber,
            address: values.address,
            city: values.city,
            state: values.state,
            country: values.country,
            pincode: values.pincode,
          },
          handler: function (response: any) {
            if (response.razorpay_payment_id) {
              resolve({
                status: "success",
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              });
            } else {
              resolve({
                status: "cancelled",
                message: "Payment cancelled by user",
              });
            }
          },
          modal: {
            ondismiss: function () {
              resolve({
                status: "cancelled",
                message: "Payment Cancelled",
              });
            },
          },
          prefill: {
            name: `${values.billing_firstName} ${values.billing_lastName}`,
            email: values.billing_email,
            contact: values.billing_phoneNumber,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        reject({
          status: "error",
          message: "Something went wrong during payment initiation",
          error,
        });
      }
    });
  };

  return { initializeRazorpayPayment };
};
