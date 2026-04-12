import { Category } from "./category";
import { FileType } from "./file";
import { Tag } from "./tag";
import { User } from "./user";

export type CreateCoursePayload = {
  title: string;
  slug: string;

  description?: string;

  imageId?: number;
  imageAlt?: string;
  isFree: boolean;
  priceInr?: string;
  priceUsd?: string;

  duration?: string;
  mode?: string;

  certificate?: string;

  exams?: string;
  experienceLevel?: string;

  studyMaterial?: string;
  additionalBook?: string;

  language?: string;

  technologyRequirements?: string;
  eligibilityRequirements?: string;

  disclaimer?: string;

  metaTitle?: string;
  metaSlug?: string;

  metaDescription?: string;

  categories: number[];
  tags: number[];
};

export type UpdateCoursePayload = Partial<CreateCoursePayload>;

export type Course = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: FileType | null;
  imageAlt: string | null;
  isFree: boolean;
  priceInr: string | null;
  priceUsd: string | null;
  duration: string | null;
  mode: string | null;
  certificate: string | null;
  exams: string | null;
  experienceLevel: string | null;
  studyMaterial: string | null;
  additionalBook: string | null;
  language: string | null;
  technologyRequirements: string | null;
  eligibilityRequirements: string | null;
  disclaimer: string | null;
  metaTitle: string | null;
  metaSlug: string | null;
  metaDescription: string | null;
  categories: Category[];
  tags: Tag[];
  createdBy: User;
  updatedBy: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
