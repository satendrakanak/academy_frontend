export interface Chapter {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  isFree: boolean;
  isPublished: boolean;
}
