export type Gateway = {
  provider: string;
  displayName: string;
};

export type PaymentProvider =
  | "RAZORPAY"
  | "STRIPE"
  | "PAYPAL"
  | "PAYU"
  | "COD";

export type PaymentMode = "TEST" | "LIVE";

export type PaymentGatewayAdmin = {
  id: number;
  provider: PaymentProvider;
  displayName: string;
  mode: PaymentMode;
  isActive: boolean;
  keyIdPreview: string | null;
  hasKeySecret: boolean;
  hasWebhookSecret: boolean;
  webhookUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpsertPaymentGatewayPayload = {
  provider: PaymentProvider;
  mode: PaymentMode;
  keyId?: string;
  keySecret?: string;
  webhookSecret?: string;
  webhookUrl?: string;
  isActive: boolean;
};
