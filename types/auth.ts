export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type CheckoutVerificationStartPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type CheckoutVerificationStartResponse = {
  email: string;
  maskedEmail: string;
  isExistingUser: boolean;
};

export type CheckoutVerificationOtpPayload = {
  email: string;
  code: string;
};
