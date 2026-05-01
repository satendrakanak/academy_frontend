"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { authService } from "@/services/auth.service";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const router = useRouter();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      await authService.verifyEmail(token);

      setSuccess("Email verified successfully!");
      startTransition(() => {
        router.push("/dashboard?verified=true");
        router.refresh();
      });
    } catch {
      setError("Invalid or expired token!");
    }
  }, [token, success, error, router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void onSubmit();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email"
      backButtonLabel="Back to login"
      backButtonHref="/auth/sign-in"
      imageUrl="/assets/login-form.jpg"
      alt="Signup form image"
      width={600}
      height={600}
    >
      <div className="flex items-center w-full h-50 justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
