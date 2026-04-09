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
import { resetPasswordFormSchema } from "@/schemas";
import { authService } from "@/services/auth.service";
import { useEffect, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { useRouter, useSearchParams } from "next/navigation";

export function ResetPasswordForm() {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.replace("/auth/sign-in?reset=false");
    }
  }, [token]);

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof resetPasswordFormSchema>) => {
    try {
      await authService.resetPassword({
        token: token!,
        ...data,
      });
      setSuccess("Email verified successfully!");
      startTransition(() => {
        router.push("/auth/sign-in?reset=true");
        router.refresh();
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const isLoading = isSubmitting || isPending;

  return (
    <CardWrapper
      headerLabel="Reset password"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
      imageUrl="/assets/login-form.jpg"
      alt="Signup form image"
      width={600}
      height={600}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Password */}
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

          {/* Confirm Password */}

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

          <SubmitButton
            type="submit"
            disabled={!isValid}
            loading={isLoading}
            loadingText="Please wait..."
          >
            Reset password
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
