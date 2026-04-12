import * as z from "zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { toast } from "sonner";
import { courseClientService } from "@/services/courses/course.client";
interface ChapterTitleFormProps {}

const schema = z.object({
  title: z.string().min(3, "Title required"),
  slug: z.string().min(3, "Slug required"),
});

type FormData = z.infer<typeof schema>;
export default function ChapterTitleForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: FormData) => {
    try {
      //   const response = await courseClientService.create(data);
      //   onSuccess?.(response.data.id);
      form.reset();
    } catch (error: unknown) {
      let message = "Something went wrong";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">
        <FieldGroup>
          {/* Title */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  placeholder="e.g. React Mastery"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
            className="w-auto px-6"
            loadingText="Updating..."
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
