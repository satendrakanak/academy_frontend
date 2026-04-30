import { checkoutSchema } from "@/schemas/checkout";
import * as z from "zod";
import { User } from "./user";
import { Course } from "./course";
export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

export type CreateOrderPayload = {
  items: {
    courseId: number;
    quantity: number;
  }[];

  billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
  };

  paymentMethod: string;
  subTotal: number;
  discount: number;
  totalAmount: number;
  tax: number;
  couponCode?: string | null;
};

export interface CreateOrderResponse {
  orderId: number;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  courses: {
    id: number;
    title: string;
    slug: string;
  }[];
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface OrderItem {
  id: number;
  courseId: number;
  price: number;
  quantity: number;
  course: Course;
}

export interface Order {
  id: number;
  userId: number;
  user: User;

  subTotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  currency: string;

  autoDiscount: number;
  manualDiscount: number;

  autoCouponCode?: string | null;
  manualCouponCode?: string | null;

  status: OrderStatus;

  paymentId?: string | null;
  paymentMethod?: string | null;

  billingAddress: BillingAddress;

  items: OrderItem[];

  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
}

export type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type CourseRedirect = {
  id: number;
  slug: string;
  title: string;
};

export type OpenRazorpayParams = {
  orderId: number;
  keyId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;

  data: z.infer<typeof checkoutSchema>;

  courses: CourseRedirect[];
};

export type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;

  name: string;
  description: string;

  handler: (response: RazorpaySuccessResponse) => void;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  modal?: {
    ondismiss?: () => void;
  };

  theme?: {
    color?: string;
  };
};

export interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", handler: (response: unknown) => void): void;
}
