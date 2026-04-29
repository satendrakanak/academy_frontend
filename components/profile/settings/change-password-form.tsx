"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/schemas/profile";
import { userClientService } from "@/services/users/user.client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { SubmitButton } from "@/components/submit-button";
import { getErrorMessage } from "@/lib/error-handler";

export function ChangePasswordForm() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    try {
      await userClientService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully");
      form.reset();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <div className="bg-white rounded-2xl border p-5">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">
        Change Password
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGroup>
          {/* Current Password */}
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="password"
                  placeholder="Current Password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* New Password */}
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input {...field} type="password" placeholder="New Password" />
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
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm Password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Submit */}
        <div className="flex items-center justify-end">
          <SubmitButton
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
            className="bg-primary text-white p-5 cursor-pointer  rounded-lg text-sm disabled:opacity-50"
            loadingText="Updating..."
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
