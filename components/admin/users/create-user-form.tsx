"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-handler";
import { userClientService } from "@/services/users/user.client";
import { registerFormSchema } from "@/schemas";

interface CreateUserFormProps {
  onSuccess?: (userId: number) => void;
}

export const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "Temp@1234",
      confirmPassword: "Temp@1234",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
      const response = await userClientService.create(payload);

      toast.success("User created successfully");
      form.reset();
      onSuccess?.(response.data.id);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div>
        <h4 className="text-sm font-semibold">Create User</h4>
        <p className="text-xs text-muted-foreground">
          Add a new user to the platform
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-3">
        <FieldGroup>
          {/* First Name */}
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input {...field} placeholder="First name" className="h-11" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input {...field} placeholder="Last name" className="h-11" />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  placeholder="Email address"
                  className="h-11"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input {...field} placeholder="Phone number" className="h-11" />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>

        {/* Footer */}
        <div className="flex justify-end">
          <SubmitButton
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
            className="px-6"
          >
            Create User
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
