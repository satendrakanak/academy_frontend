import { Category } from "./category";
import { Chapter } from "./chapter";
import { FileType } from "./file";
import { Tag } from "./tag";
import type { Testimonial } from "./testimonial";
import { User } from "./user";

export type CreateCoursePayload = {
  title: string;
  slug?: string;

  description?: string;
  shortDescription?: string;

  imageId?: number;
  imageAlt?: string;
  videoId?: number;
  isFree?: boolean;
  isPublished?: boolean;
  isFeatured?: boolean;
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

  categories?: number[];
  tags?: number[];
  facultyIds?: number[];
};

export type UpdateCoursePayload = Partial<CreateCoursePayload>;

export type Course = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  image: FileType | null;
  imageAlt: string | null;
  video: FileType | null;
  isFree: boolean;
  isPublished: boolean;
  isFeatured: boolean;
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
  isEnrolled?: boolean;
  progress: {
    isCompleted: boolean;
    progress: number;
    lastTime: number;
  };
  chapters: Chapter[];
  faculties: User[];
  testimonials?: Testimonial[];
  createdBy: User;
  updatedBy: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type PublishCheckResult = {
  canPublish: boolean;
  reasons: string[];
};
