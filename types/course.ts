export type CreateCoursePayload = {
  title: string;
  slug: string;
  description?: string;
};

export type UpdateCoursePayload = {
  title: string;
  slug: string;
  description?: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};
