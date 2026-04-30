"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { registerFormSchema } from "@/schemas";
import { authService } from "@/services/auth.service";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import { SignupVerificationDialog } from "./signup-verification-dialog";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";

export function SignupForm() {
  const [error, setError] = useState<string>("");
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [maskedVerificationEmail, setMaskedVerificationEmail] = useState("");
  const [pendingSignupData, setPendingSignupData] =
    useState<z.infer<typeof registerFormSchema> | null>(null);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const isLoading = isSubmitting;

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      setError("");
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
      const response = await authService.register(payload);
      setPendingSignupData(data);
      setVerificationEmail(data.email);
      setMaskedVerificationEmail(response.data?.maskedEmail || data.email);
      setVerificationOpen(true);
      toast.success("Verification code sent to your email");
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
  };

  const handleVerifyOtp = async (code: string) => {
    try {
      setIsVerifyingOtp(true);
      await authService.verifySignupOtp({
        email: verificationEmail,
        code,
      });

      toast.success("Your account is verified and ready.");
      setVerificationOpen(false);
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingSignupData) return;

    const payload = {
      firstName: pendingSignupData.firstName,
      lastName: pendingSignupData.lastName,
      email: pendingSignupData.email,
      phoneNumber: pendingSignupData.phoneNumber,
      password: pendingSignupData.password,
    };
    const response = await authService.register(payload);
    setMaskedVerificationEmail(
      response.data?.maskedEmail || pendingSignupData.email,
    );
    toast.success("A fresh verification code has been sent");
  };

  return (
    <>
      <CardWrapper
        headerLabel="Create your account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/sign-in"
        showSocial
        imageUrl="/assets/register-form.jpg"
        alt="Signup form image"
        width={600}
        height={900}
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>First name</FieldLabel>
                    <Input {...field} placeholder="John" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Last name</FieldLabel>
                    <Input {...field} placeholder="Doe" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} type="email" placeholder="m@example.com" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone</FieldLabel>

                  <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring">
                    <PhoneInput
                      defaultCountry="in"
                      value={field.value}
                      onChange={(phone) => field.onChange(phone)}
                      inputClassName="!border-0 !focus:ring-0 !h-8"
                      countrySelectorStyleProps={{
                        buttonClassName: "!border-0 !h-8",
                      }}
                    />
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input {...field} type="password" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input {...field} type="password" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <SubmitButton
              type="submit"
              disabled={!isValid}
              loading={isLoading}
              loadingText="Sending Code..."
            >
              Create Account
            </SubmitButton>

            <FieldGroup>
              {error && (
                <div className="rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">
                  {error}
                </div>
              )}
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardWrapper>

      <SignupVerificationDialog
        open={verificationOpen}
        onOpenChange={setVerificationOpen}
        maskedEmail={maskedVerificationEmail}
        isSubmitting={isVerifyingOtp}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
      />
    </>
  );
}
