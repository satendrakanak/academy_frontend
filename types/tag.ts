export type CreateTagPayload = {
  name: string;
  slug: string;
  description?: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};
