import { FileType } from "./file";

export type CreateCategoryPayload = {
  name: string;
  slug: string;
  type: string;
  description?: string;
  imageId?: number;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export type Category = {
  id: number;
  name: string;
  slug: string;
  type: string;
  description?: string;
  image?: FileType | null;
  imageAlt: string | null;
  createdAt: string;
  updatedAt: string;
};
