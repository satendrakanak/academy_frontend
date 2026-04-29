"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { categoriesSchema } from "@/schemas/courses";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { categoryClientService } from "@/services/categories/category.client";
import { slugify } from "@/utils/slugify";
import { Category } from "@/types/category";
import { FileUpload } from "@/components/media/file-upload";
import { FileType } from "@/types/file";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/error-handler";

interface CreateCategoryFormProps {
  category?: Category;
}

export const CreateCategoryForm = ({ category }: CreateCategoryFormProps) => {
  const [selectedImage, setSelectedImage] = useState<FileType | null>(null);
  const [altText, setAltText] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof categoriesSchema>>({
    resolver: zodResolver(categoriesSchema),
    mode: "onChange",
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // 🔥 reset on category change
  useEffect(() => {
    form.reset({
      name: category?.name || "",
      description: category?.description || "",
    });

    setSelectedImage(category?.image || null);
  }, [category]);

  // 🔥 MAIN LOGIC
  const onSubmit = async (data: z.infer<typeof categoriesSchema>) => {
    try {
      const payload = {
        name: data.name,
        slug: slugify(data.name),
        type: "course",
        description: data.description,
        imageId: selectedImage?.id,
        imageAlt: altText,
      };

      if (category?.id) {
        // 🔥 UPDATE
        await categoryClientService.update(category.id, payload);
        toast.success("Category updated successfully");
      } else {
        // 🔥 CREATE
        await categoryClientService.create(payload);
        toast.success("Category created successfully");
        form.reset();
        setSelectedImage(null);
      }

      router.refresh();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleImageUpload = async (file: FileType, alt: string) => {
    try {
      setSelectedImage(file);
      setAltText(alt);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <FieldGroup>
        {/* 🔥 TITLE */}
        <h3 className="text-sm font-semibold">Category Name</h3>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} placeholder="Category name" className="h-10" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* 🔥 IMAGE */}
        <FileUpload
          label="Featured Image"
          previewType="image"
          value={selectedImage}
          onUpload={handleImageUpload}
          className="h-40"
        />

        {/* 🔥 DESCRIPTION */}
        <h3 className="text-sm font-semibold">Category Description</h3>
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                placeholder="Category description"
                className="min-h-28"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* 🔥 FOOTER */}
      <div className="flex items-center justify-end">
        <SubmitButton
          type="submit"
          disabled={!isValid}
          loading={isSubmitting}
          className="px-6"
        >
          {category?.id ? "Update" : "Create"}
        </SubmitButton>
      </div>
    </form>
  );
};
