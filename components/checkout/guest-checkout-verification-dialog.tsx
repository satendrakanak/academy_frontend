"use client";

import { useEffect, useState } from "react";
import { Loader2, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type GuestCheckoutVerificationDialogProps = {
  open: boolean;
  maskedEmail: string;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
};

export function GuestCheckoutVerificationDialog({
  open,
  maskedEmail,
  isSubmitting,
  onOpenChange,
  onVerify,
  onResend,
}: GuestCheckoutVerificationDialogProps) {
  const [code, setCode] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!open) {
      setCode("");
      setIsResending(false);
    }
  }, [open]);

  const handleVerify = async () => {
    await onVerify(code.trim());
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      await onResend();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <MailCheck className="h-6 w-6" />
          </div>
          <DialogTitle>Verify your email to continue</DialogTitle>
          <DialogDescription>
            We sent a 6-digit code to <span className="font-medium text-slate-900">{maskedEmail}</span>.
            Enter it here and we will create your account, verify it, and continue checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={code}
            onChange={(event) =>
              setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Enter 6-digit code"
            inputMode="numeric"
            maxLength={6}
            className="h-12 text-center text-lg font-semibold tracking-[0.35em]"
          />
          <p className="text-xs text-slate-500">
            If you already have a verified account on this email, sign in first and then continue checkout.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={isSubmitting || isResending}
          >
            {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Resend code
          </Button>
          <Button
            type="button"
            onClick={handleVerify}
            disabled={isSubmitting || code.trim().length !== 6}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Verify and continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
