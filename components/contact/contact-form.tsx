"use client";

import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Sparkles } from "lucide-react";
import { useSession } from "@/context/session-context";
import { contactLeadClientService } from "@/services/contact-leads/contact-lead.client";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";

const contactSchema = z.object({
  fullName: z.string().trim().min(3, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phoneNumber: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^[0-9+\-\s()]{10,20}$/.test(value),
      "Enter a valid phone number",
    ),
  subject: z
    .string()
    .trim()
    .min(3, "Subject is required")
    .max(180, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be a little more detailed"),
});

export function ContactForm() {
  const { user } = useSession();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    form.reset({
      fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      subject: form.getValues("subject"),
      message: form.getValues("message"),
    });
  }, [form, user]);

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        await contactLeadClientService.create({
          ...values,
          source: "website-contact",
          pageUrl: "/contact",
        });

        toast.success("Your message has been sent");
        form.reset({
          fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
          email: user?.email || "",
          phoneNumber: user?.phoneNumber || "",
          subject: "",
          message: "",
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-[var(--brand-100)] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
            Contact form
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-slate-950">
            Tell us what you need.
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
            Share your question, program interest, or support request and the
            team will get back to you quickly.
          </p>
        </div>
        <div className="hidden rounded-2xl bg-[var(--brand-50)] p-3 text-[var(--brand-700)] md:block">
          <Sparkles className="size-5" />
        </div>
      </div>

      <FieldGroup className="mt-8 gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Full name"
                  className="rounded-2xl px-4 py-3.5"
                />
              )}
            />
            <FieldError errors={[form.formState.errors.fullName]} />
          </Field>

          <Field>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Email address"
                  className="rounded-2xl px-4 py-3.5"
                />
              )}
            />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          <Field>
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Phone number"
                  className="rounded-2xl px-4 py-3.5"
                />
              )}
            />
            <FieldError errors={[form.formState.errors.phoneNumber]} />
          </Field>

          <Field>
            <Controller
              name="subject"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Subject"
                  className="rounded-2xl px-4 py-3.5"
                />
              )}
            />
            <FieldError errors={[form.formState.errors.subject]} />
          </Field>
        </div>

        <Field>
          <Controller
            name="message"
            control={form.control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Tell us how we can help..."
                rows={6}
                className="rounded-2xl px-4 py-3.5"
              />
            )}
          />
          <FieldError errors={[form.formState.errors.message]} />
        </Field>
      </FieldGroup>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          By submitting, you allow the academy team to contact you about your
          enquiry.
        </p>
        <button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand-600)] px-6 py-3.5 font-medium text-white transition hover:bg-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send className="size-4" />
          {isPending ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
