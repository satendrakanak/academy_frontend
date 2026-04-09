"use client";

import { Button } from "@/components/ui/button";
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

export function SignupForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>("");

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
      const { confirmPassword, ...payload } = data;
      await authService.register(payload);
      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  if (isSuccess) {
    return (
      <CardWrapper
        headerLabel="Check your email"
        backButtonLabel="Back to login"
        backButtonHref="/auth/sign-in"
        imageUrl="/assets/register-form.jpg"
        alt="Verification"
        width={600}
        height={600}
      >
        <div className="flex flex-col items-center justify-center text-center py-10 px-6 h-full">
          {/* 🔥 Icon */}
          <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-2xl">📧</span>
          </div>

          {/* 🔥 Title */}
          <h2 className="text-xl font-semibold mb-2">Verify your email</h2>

          {/* 🔥 Description */}
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            We’ve sent a verification link to your email address. Please check
            your inbox and click the link to activate your account.
          </p>

          {/* 🔥 Divider */}
          <div className="w-12 h-0.5 bg-border rounded-full mb-4" />

          {/* 🔥 Helper text */}
          <p className="text-xs text-muted-foreground">
            Didn’t receive it? Check your spam folder or try again.
          </p>
        </div>
      </CardWrapper>
    );
  }
  return (
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
          {/* First + Last */}
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

          {/* Email */}
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

          {/* Phone with Country Code */}
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
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password + Confirm */}
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
            loadingText="Creating Account..."
          >
            Create Account
          </SubmitButton>

          <FieldGroup>
            {error && (
              <div className="rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">
                {error}
              </div>
            )}

            {/* baaki fields */}
          </FieldGroup>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}
