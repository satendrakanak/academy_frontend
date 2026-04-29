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
import { loginFormSchema } from "@/schemas";
import { authService } from "@/services/auth.service";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import Link from "next/link";

export function LoginForm() {
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      await authService.login(data);

      startTransition(() => {
        router.refresh();
        router.push("/admin/dashboard");
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
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
      showSocial
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel>Password</FieldLabel>

                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
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
            loadingText="Logging you in..."
          >
            Login
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
