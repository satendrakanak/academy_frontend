import type { Course } from "./course";
import { FileType } from "./file";

export type TestimonialType = "TEXT" | "VIDEO";
export type TestimonialStatus = "pending" | "approved" | "rejected";

export type CreateTestimonialPayload = {
  type: TestimonialType;
  name: string;
  designation?: string;
  company?: string;
  message?: string;
  rating: number;
  avatarId?: number;
  avatarAlt?: string;
  videoId?: number;
  courseId?: number | null;
  isActive: boolean;
};

export type UpdateTestimonialPayload = Partial<CreateTestimonialPayload>;

export type Testimonial = {
  id: string;
  type: TestimonialType;
  name: string;
  designation: string | null;
  company: string | null;
  message: string | null;
  rating: number;
  avatar: FileType | null;
  avatarAlt: string | null;
  video: FileType | null;
  isActive: boolean;
  isFeatured: boolean;
  priority: number;
  status: TestimonialStatus;
  course: Course | null;
  createdAt: string;
  updatedAt: string;
};
