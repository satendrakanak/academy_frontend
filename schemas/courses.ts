import * as z from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title is too long")
    .trim(),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(255, "Slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),

  description: z
    .string()
    .max(2000, "Description is too long")
    .optional()
    .or(z.literal("")),
  isFree: z.boolean(),
  priceInr: z.string().optional(),
  priceUsd: z.string().optional(),
});

export const pricingSchema = z.object({
  isFree: z.boolean(),

  priceInr: z.string().optional(),
  priceUsd: z.string().optional(),
});

export const requirementsSchema = z
  .object({
    technologyRequirements: z.string().optional(),
    eligibilityRequirements: z.string().optional(),
    disclaimer: z.string().optional(),
  })
  .refine(
    (data) => {
      return (
        data.technologyRequirements?.trim() ||
        data.eligibilityRequirements?.trim() ||
        data.disclaimer?.trim()
      );
    },
    {
      message: "At least one field is required",
      path: ["technologyRequirements"], // kisi ek field pe error dikha dena
    },
  );

export const courseDetailsSchema = z
  .object({
    duration: z.string().optional(),
    mode: z.string().optional(),
    experienceLevel: z.string().optional(),
    language: z.string().optional(),
    certificate: z.string().optional(),
    exams: z.string().optional(),
    studyMaterial: z.string().optional(),
    additionalBook: z.string().optional(),
  })
  .refine(
    (data) =>
      data.duration?.trim() ||
      data.mode?.trim() ||
      data.experienceLevel?.trim() ||
      data.language?.trim() ||
      data.certificate?.trim() ||
      data.exams?.trim() ||
      data.studyMaterial?.trim() ||
      data.additionalBook?.trim(),
    {
      message: "At least one field is required",
      path: ["duration"],
    },
  );

export const metaSchema = z.object({
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaSlug: z.string().max(100).optional(),
});
