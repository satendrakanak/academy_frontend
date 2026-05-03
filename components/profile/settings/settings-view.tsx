"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { User } from "@/types/user";
import { profileClientService } from "@/services/users/profile.client";
import { getErrorMessage } from "@/lib/error-handler";
import { SwitchRow } from "../switch-row";
import { Button } from "@/components/ui/button";
import { ChangePasswordForm } from "./change-password-form";

interface ProfileViewProps {
  user: User;
}

export default function SettingsView({ user }: ProfileViewProps) {
  const [isSaving, startSaving] = useTransition();
  const [data, setData] = useState({
    isPublic: user.profile?.isPublic ?? false,
    showCourses: user.profile?.showCourses ?? true,
    showCertificates: user.profile?.showCertificates ?? true,
  });
  const [dirty, setDirty] = useState(false);
  const isFaculty = useMemo(
    () => user.roles?.some((role) => role.name === "faculty") ?? false,
    [user.roles],
  );

  const handleProfileSave = () => {
    startSaving(async () => {
      try {
        await profileClientService.updateProfile({
          isPublic: data.isPublic,
          showCourses: data.showCourses,
          showCertificates: data.showCertificates,
        });

        setDirty(false);
        toast.success("Settings updated");
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
              Privacy Settings
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
              Control how your profile appears
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
              Decide what visitors and learners can see when they open your
              public profile surfaces.
            </p>

            <div className="mt-6 space-y-4">
              <SwitchRow
                label="Public Profile"
                description="Allow your learner profile to be discoverable from public views."
                checked={data.isPublic}
                onChange={(val) => {
                  setDirty(true);
                  setData((current) => ({ ...current, isPublic: val }));
                }}
              />

              <SwitchRow
                label="Show Courses"
                description="Display your enrolled or taught courses on public profile areas."
                checked={data.showCourses}
                onChange={(val) => {
                  setDirty(true);
                  setData((current) => ({ ...current, showCourses: val }));
                }}
              />

              <SwitchRow
                label="Show Certificates"
                description="Expose completed course certificates on your public-facing profile."
                checked={data.showCertificates}
                onChange={(val) => {
                  setDirty(true);
                  setData((current) => ({ ...current, showCertificates: val }));
                }}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                size="lg"
                className="rounded-2xl px-6"
                disabled={!dirty || isSaving}
                onClick={handleProfileSave}
              >
                {isSaving ? "Saving..." : "Save Visibility"}
              </Button>
            </div>
          </div>

          <ChangePasswordForm />
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
              Account Summary
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
              Current visibility state
            </h3>

            <div className="mt-5 space-y-3">
              <SummaryRow
                label="Profile type"
                value={data.isPublic ? "Publicly visible" : "Private"}
              />
              <SummaryRow
                label="Courses section"
                value={data.showCourses ? "Visible to visitors" : "Hidden"}
              />
              <SummaryRow
                label="Certificates section"
                value={data.showCertificates ? "Visible to visitors" : "Hidden"}
              />
              <SummaryRow
                label="Faculty access"
                value={isFaculty ? "Faculty profile enabled" : "Learner profile"}
              />
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
              Security Notes
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
              Keep your account protected
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <li>Use a strong password that you do not reuse elsewhere.</li>
              <li>Keep your contact email accurate so certificates and updates reach you.</li>
              <li>Review public profile visibility before sharing your dashboard publicly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
