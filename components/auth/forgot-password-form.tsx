"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fogotPasswordFormSchema } from "@/schemas";
import { authService } from "@/services/auth.service";
import { useState } from "react";
import { SubmitButton } from "../submit-button";

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof fogotPasswordFormSchema>>({
    resolver: zodResolver(fogotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof fogotPasswordFormSchema>) => {
    try {
      await authService.forgotPassword(data);
      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const isLoading = isSubmitting;
  if (isSuccess) {
    return (
      <CardWrapper
        headerLabel="Check your email"
        backButtonLabel="Back to login"
        backButtonHref="/auth/sign-in"
        imageUrl="/assets/login-form.jpg"
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
            We’ve sent a reset password link to your email address. Please check
            your inbox and click the link to forgot your password.
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
      headerLabel="Forgot your password?"
      backButtonLabel="Back to sign in"
      backButtonHref="/auth/sign-in"
      imageUrl="/assets/login-form.jpg"
      alt="Signup form image"
      width={600}
      height={600}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
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

          <SubmitButton
            type="submit"
            disabled={!isValid}
            loading={isLoading}
            loadingText="Please wait..."
          >
            Submit
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
  );
}
