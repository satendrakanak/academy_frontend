"use client";

import { SettingsShell } from "@/components/admin/settings/settings-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getErrorMessage } from "@/lib/error-handler";
import { cn } from "@/lib/utils";
import { settingsClientService } from "@/services/settings/settings.client";
import {
  PaymentGatewayAdmin,
  PaymentMode,
  PaymentProvider,
  UpsertPaymentGatewayPayload,
} from "@/types/settings";
import {
  CheckCircle2,
  CreditCard,
  EyeOff,
  Globe2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

const providers: { label: string; value: PaymentProvider }[] = [
  { label: "Razorpay", value: "RAZORPAY" },
  { label: "Stripe", value: "STRIPE" },
  { label: "PayPal", value: "PAYPAL" },
  { label: "PayU", value: "PAYU" },
  { label: "Cash on Delivery", value: "COD" },
];

const modes: { label: string; value: PaymentMode }[] = [
  { label: "Test mode", value: "TEST" },
  { label: "Live mode", value: "LIVE" },
];

const defaultForm: UpsertPaymentGatewayPayload = {
  provider: "RAZORPAY",
  mode: "TEST",
  keyId: "",
  keySecret: "",
  webhookSecret: "",
  webhookUrl: "",
  isActive: false,
};

export function SiteSettingsDashboard({
  gateways,
}: {
  gateways: PaymentGatewayAdmin[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(gateways);
  const [form, setForm] = useState<UpsertPaymentGatewayPayload>(defaultForm);
  const [isPending, startTransition] = useTransition();

  const selectedGateway = useMemo(
    () =>
      items.find(
        (gateway) =>
          gateway.provider === form.provider && gateway.mode === form.mode,
      ),
    [form.mode, form.provider, items],
  );

  const activeGateway = items.find((gateway) => gateway.isActive);
  const liveGateways = items.filter((gateway) => gateway.mode === "LIVE").length;
  const testGateways = items.filter((gateway) => gateway.mode === "TEST").length;

  const selectGateway = (gateway: PaymentGatewayAdmin) => {
    setForm({
      provider: gateway.provider,
      mode: gateway.mode,
      keyId: "",
      keySecret: "",
      webhookSecret: "",
      webhookUrl: gateway.webhookUrl || "",
      isActive: gateway.isActive,
    });
  };

  const updateField = <K extends keyof UpsertPaymentGatewayPayload>(
    key: K,
    value: UpsertPaymentGatewayPayload[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitGateway = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: UpsertPaymentGatewayPayload = {
      provider: form.provider,
      mode: form.mode,
      isActive: form.isActive,
      keyId: form.keyId?.trim() || undefined,
      keySecret: form.keySecret?.trim() || undefined,
      webhookSecret: form.webhookSecret?.trim() || undefined,
      webhookUrl: form.webhookUrl?.trim() || undefined,
    };

    startTransition(async () => {
      try {
        const response = await settingsClientService.upsertGateway(payload);
        const updatedGateway = response.data;

        setItems((current) => {
          const nextItems = current.filter(
            (gateway) =>
              !(
                gateway.provider === updatedGateway.provider &&
                gateway.mode === updatedGateway.mode
              ),
          );

          return [...nextItems, updatedGateway].sort((a, b) =>
            `${a.provider}-${a.mode}`.localeCompare(`${b.provider}-${b.mode}`),
          );
        });

        setForm((current) => ({
          ...current,
          keyId: "",
          keySecret: "",
          webhookSecret: "",
        }));

        toast.success("Payment gateway settings updated");
        router.refresh();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  return (
    <SettingsShell
      title="Site & Payment Settings"
      description="Manage payment gateway credentials, live/test modes, webhook details, and active checkout configuration from one safe dashboard."
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={CreditCard}
          label="Configured gateways"
          value={items.length}
          tone="brand"
        />
        <StatCard
          icon={ShieldCheck}
          label="Active checkout"
          value={activeGateway ? activeGateway.displayName : "Not set"}
          tone="emerald"
        />
        <StatCard icon={Globe2} label="Live configs" value={liveGateways} />
        <StatCard icon={KeyRound} label="Test configs" value={testGateways} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.45)]">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
                Payment gateways
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Test/live configuration
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Secrets are encrypted in the backend. Admin panel only shows
                masked previews.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm(defaultForm)}
            >
              New config
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {items.length ? (
              items.map((gateway) => (
                <button
                  key={`${gateway.provider}-${gateway.mode}`}
                  type="button"
                  onClick={() => selectGateway(gateway)}
                  className={cn(
                    "group rounded-3xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--brand-300)] hover:shadow-xl",
                    selectedGateway?.id === gateway.id
                      ? "border-[var(--brand-400)] shadow-xl"
                      : "border-slate-200",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-950">
                          {gateway.displayName}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                            gateway.mode === "LIVE"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700",
                          )}
                        >
                          {gateway.mode}
                        </span>
                      </div>
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <EyeOff className="h-4 w-4" />
                        {gateway.keyIdPreview || "Key preview unavailable"}
                      </p>
                    </div>
                    {gateway.isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Active
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <span>
                      Key secret: {gateway.hasKeySecret ? "Stored" : "Missing"}
                    </span>
                    <span>
                      Webhook:{" "}
                      {gateway.hasWebhookSecret ? "Secret stored" : "Optional"}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="font-semibold text-slate-900">
                  No payment gateway configured yet
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Add Razorpay test keys first, then switch live mode when ready.
                </p>
              </div>
            )}
          </div>
        </section>

        <form
          onSubmit={submitGateway}
          className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.45)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
            Gateway editor
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {selectedGateway ? "Update gateway" : "Create gateway"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Leave secret fields blank while updating if you do not want to
            rotate existing credentials.
          </p>

          <div className="mt-6 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="provider">Provider</Label>
              <select
                id="provider"
                value={form.provider}
                onChange={(event) =>
                  updateField("provider", event.target.value as PaymentProvider)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[var(--brand-400)]"
              >
                {providers.map((provider) => (
                  <option key={provider.value} value={provider.value}>
                    {provider.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mode">Mode</Label>
              <select
                id="mode"
                value={form.mode}
                onChange={(event) =>
                  updateField("mode", event.target.value as PaymentMode)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[var(--brand-400)]"
              >
                {modes.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            <CredentialField
              label="Key ID"
              placeholder={
                selectedGateway?.keyIdPreview || "rzp_test_xxxxxxxxxx"
              }
              value={form.keyId || ""}
              onChange={(value) => updateField("keyId", value)}
            />

            <CredentialField
              label="Key secret"
              placeholder={
                selectedGateway?.hasKeySecret
                  ? "Stored securely, enter new value to rotate"
                  : "Enter key secret"
              }
              value={form.keySecret || ""}
              onChange={(value) => updateField("keySecret", value)}
            />

            <CredentialField
              label="Webhook secret"
              placeholder={
                selectedGateway?.hasWebhookSecret
                  ? "Stored securely, enter new value to rotate"
                  : "Optional webhook secret"
              }
              value={form.webhookSecret || ""}
              onChange={(value) => updateField("webhookSecret", value)}
            />

            <div className="grid gap-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={form.webhookUrl || ""}
                onChange={(event) =>
                  updateField("webhookUrl", event.target.value)
                }
                placeholder="https://your-domain.com/api/webhooks/payment"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">
                  Make active checkout gateway
                </p>
                <p className="text-sm text-slate-500">
                  Only one mode per provider stays active at a time.
                </p>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(checked) => updateField("isActive", checked)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 w-full"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save settings"}
          </Button>
        </form>
      </div>
    </SettingsShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "slate",
}: {
  icon: typeof CreditCard;
  label: string;
  value: string | number;
  tone?: "brand" | "emerald" | "slate";
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.45)]">
      <div
        className={cn(
          "mb-4 flex h-11 w-11 items-center justify-center rounded-2xl",
          tone === "brand" && "bg-[var(--brand-50)] text-[var(--brand-700)]",
          tone === "emerald" && "bg-emerald-50 text-emerald-700",
          tone === "slate" && "bg-slate-100 text-slate-700",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 truncate text-2xl font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function CredentialField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input
        type="password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="new-password"
      />
    </div>
  );
}
