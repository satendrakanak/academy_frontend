"use client";

import { useEffect, useMemo, useTransition } from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseFormReturn,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, UpdateFacultyProfilePayload } from "@/types/user";
import { userClientService } from "@/services/users/user.client";
import { getErrorMessage } from "@/lib/error-handler";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProfileViewProps {
  user: User;
}

const profileSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().optional(),
  phoneNumber: z.string().trim().min(8, "Phone number is required"),
  headline: z.string().trim().max(120, "Headline is too long").optional(),
  company: z.string().trim().max(120, "Company is too long").optional(),
  location: z.string().trim().max(100, "Location is too long").optional(),
  website: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "Enter a valid website URL",
    ),
  bio: z.string().trim().max(500, "Bio is too long").optional(),
  facebook: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid Facebook URL"),
  instagram: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid Instagram URL"),
  twitter: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid X/Twitter URL"),
  linkedin: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid LinkedIn URL"),
  youtube: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid YouTube URL"),
  whatsapp: z.string().trim().max(40, "WhatsApp is too long").optional(),
  telegram: z.string().trim().max(80, "Telegram is too long").optional(),
});

const facultySchema = z.object({
  designation: z.string().trim().optional(),
  expertise: z.string().trim().optional(),
  experience: z.string().trim().optional(),
  linkedin: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid LinkedIn URL"),
  instagram: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid Instagram URL"),
  twitter: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid X/Twitter URL"),
  youtube: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a valid YouTube URL"),
});

export default function ProfileView({ user }: ProfileViewProps) {
  const [isSavingProfile, startSavingProfile] = useTransition();
  const [isSavingFaculty, startSavingFaculty] = useTransition();
  const isFaculty = useMemo(
    () => user.roles?.some((role) => role.name === "faculty") ?? false,
    [user.roles],
  );

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      headline: user.profile?.headline || "",
      company: user.profile?.company || "",
      location: user.profile?.location || "",
      website: user.profile?.website || "",
      bio: user.profile?.bio || "",
      facebook: user.profile?.facebook || "",
      instagram: user.profile?.instagram || "",
      twitter: user.profile?.twitter || "",
      linkedin: user.profile?.linkedin || "",
      youtube: user.profile?.youtube || "",
      whatsapp: user.profile?.whatsapp || "",
      telegram: user.profile?.telegram || "",
    },
  });

  const facultyForm = useForm<z.infer<typeof facultySchema>>({
    resolver: zodResolver(facultySchema),
    mode: "onChange",
    defaultValues: {
      designation: user.facultyProfile?.designation || "",
      expertise: user.facultyProfile?.expertise || "",
      experience: user.facultyProfile?.experience || "",
      linkedin: user.facultyProfile?.linkedin || "",
      instagram: user.facultyProfile?.instagram || "",
      twitter: user.facultyProfile?.twitter || "",
      youtube: user.facultyProfile?.youtube || "",
    },
  });

  useEffect(() => {
    profileForm.reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      headline: user.profile?.headline || "",
      company: user.profile?.company || "",
      location: user.profile?.location || "",
      website: user.profile?.website || "",
      bio: user.profile?.bio || "",
      facebook: user.profile?.facebook || "",
      instagram: user.profile?.instagram || "",
      twitter: user.profile?.twitter || "",
      linkedin: user.profile?.linkedin || "",
      youtube: user.profile?.youtube || "",
      whatsapp: user.profile?.whatsapp || "",
      telegram: user.profile?.telegram || "",
    });
    facultyForm.reset({
      designation: user.facultyProfile?.designation || "",
      expertise: user.facultyProfile?.expertise || "",
      experience: user.facultyProfile?.experience || "",
      linkedin: user.facultyProfile?.linkedin || "",
      instagram: user.facultyProfile?.instagram || "",
      twitter: user.facultyProfile?.twitter || "",
      youtube: user.facultyProfile?.youtube || "",
    });
  }, [facultyForm, profileForm, user]);

  const watchedHeadline = useWatch({
    control: profileForm.control,
    name: "headline",
  });
  const watchedCompany = useWatch({
    control: profileForm.control,
    name: "company",
  });
  const watchedLocation = useWatch({
    control: profileForm.control,
    name: "location",
  });
  const watchedLinkedin = useWatch({
    control: profileForm.control,
    name: "linkedin",
  });
  const watchedInstagram = useWatch({
    control: profileForm.control,
    name: "instagram",
  });
  const watchedTwitter = useWatch({
    control: profileForm.control,
    name: "twitter",
  });
  const watchedYoutube = useWatch({
    control: profileForm.control,
    name: "youtube",
  });

  const handleProfileSave = profileForm.handleSubmit((values) => {
    startSavingProfile(async () => {
      try {
        await userClientService.updateUser({
          firstName: values.firstName,
          lastName: values.lastName || "",
          phoneNumber: values.phoneNumber,
        });

        await userClientService.updateProfile(user.id, {
          headline: values.headline || "",
          company: values.company || "",
          location: values.location || "",
          website: values.website || "",
          bio: values.bio || "",
          facebook: values.facebook || "",
          instagram: values.instagram || "",
          twitter: values.twitter || "",
          linkedin: values.linkedin || "",
          youtube: values.youtube || "",
          whatsapp: values.whatsapp || "",
          telegram: values.telegram || "",
        });

        toast.success("Profile updated");
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      }
    });
  });

  const handleFacultySave = facultyForm.handleSubmit((values) => {
    startSavingFaculty(async () => {
      try {
        const payload: UpdateFacultyProfilePayload = {
          designation: values.designation || "",
          expertise: values.expertise || "",
          experience: values.experience || "",
          linkedin: values.linkedin || "",
          instagram: values.instagram || "",
          twitter: values.twitter || "",
          youtube: values.youtube || "",
        };

        await userClientService.updateFacultyProfile(user.id, payload);
        toast.success("Faculty profile updated");
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      }
    });
  });

  return (
    <div className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <form
          onSubmit={handleProfileSave}
          className="space-y-6 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)]"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
              Profile Details
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Personal and public presence
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep your learner profile complete so your dashboard, public
              presence, and faculty identity stay updated everywhere.
            </p>
          </div>

          <FieldGroup className="gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <InputField form={profileForm} name="firstName" label="First name" />
              <InputField form={profileForm} name="lastName" label="Last name" />
              <StaticField label="Username" value={`@${user.username}`} />
              <StaticField label="Email" value={user.email} />
              <InputField form={profileForm} name="phoneNumber" label="Phone number" />
              <InputField form={profileForm} name="location" label="Location" />
              <InputField form={profileForm} name="headline" label="Headline" />
              <InputField form={profileForm} name="company" label="Company" />
              <InputField form={profileForm} name="website" label="Website URL" />
              <InputField form={profileForm} name="whatsapp" label="WhatsApp" />
              <InputField form={profileForm} name="telegram" label="Telegram" />
            </div>

            <TextareaField form={profileForm} name="bio" label="Bio" rows={6} />

            <div className="grid gap-5 md:grid-cols-2">
              <InputField form={profileForm} name="facebook" label="Facebook URL" />
              <InputField form={profileForm} name="instagram" label="Instagram URL" />
              <InputField form={profileForm} name="twitter" label="X / Twitter URL" />
              <InputField form={profileForm} name="linkedin" label="LinkedIn URL" />
              <InputField form={profileForm} name="youtube" label="YouTube URL" />
            </div>
          </FieldGroup>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="rounded-2xl px-6"
              disabled={isSavingProfile || !profileForm.formState.isDirty}
            >
              {isSavingProfile ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
              Visibility Snapshot
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              What learners will notice
            </h3>

            <div className="mt-5 space-y-3">
              <InfoRow label="Display name" value={`${user.firstName} ${user.lastName || ""}`} />
              <InfoRow label="Headline" value={watchedHeadline || "Not added yet"} />
              <InfoRow label="Company" value={watchedCompany || "Not added yet"} />
              <InfoRow label="Location" value={watchedLocation || "Not added yet"} />
              <InfoRow
                label="Social profiles"
                value={[
                  watchedLinkedin,
                  watchedInstagram,
                  watchedTwitter,
                  watchedYoutube,
                ].filter(Boolean).length > 0
                  ? "Configured"
                  : "Not configured"}
              />
            </div>
          </div>

          {isFaculty ? (
            <form
              onSubmit={handleFacultySave}
              className="space-y-5 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
                  Faculty Details
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">
                  Update your teaching identity
                </h3>
              </div>

              <FieldGroup className="gap-5">
                <InputField form={facultyForm} name="designation" label="Designation" />
                <TextareaField form={facultyForm} name="expertise" label="Expertise" rows={4} />
                <InputField form={facultyForm} name="experience" label="Experience" />
                <InputField form={facultyForm} name="linkedin" label="Faculty LinkedIn URL" />
                <InputField form={facultyForm} name="instagram" label="Faculty Instagram URL" />
                <InputField form={facultyForm} name="twitter" label="Faculty X / Twitter URL" />
                <InputField form={facultyForm} name="youtube" label="Faculty YouTube URL" />
              </FieldGroup>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-2xl px-6"
                  disabled={isSavingFaculty || !facultyForm.formState.isDirty}
                >
                  {isSavingFaculty ? "Saving..." : "Save Faculty Details"}
                </Button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

function StaticField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700">
        {value}
      </div>
    </div>
  );
}

function InputField({
  form,
  name,
  label,
}: {
  form: UseFormReturn<FieldValues>;
  name: Path<FieldValues>;
  label: string;
}) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Input {...field} value={field.value || ""} className="h-12 rounded-2xl px-4" />
        )}
      />
      <FieldError
        errors={[
          (form.formState.errors as Record<string, { message?: string }>)[
            name as string
          ],
        ]}
      />
    </Field>
  );
}

function TextareaField({
  form,
  name,
  label,
  rows,
}: {
  form: UseFormReturn<FieldValues>;
  name: Path<FieldValues>;
  label: string;
  rows: number;
}) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Textarea
            {...field}
            value={field.value || ""}
            rows={rows}
            className="min-h-32 rounded-2xl px-4 py-3"
          />
        )}
      />
      <FieldError
        errors={[
          (form.formState.errors as Record<string, { message?: string }>)[
            name as string
          ],
        ]}
      />
    </Field>
  );
}
