export type CartItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
  slug?: string;
  instructor?: string;
  totalDuration?: string;
  totalLectures?: number;
  discountPrice?: number;
};

export type CartSyncItem = {
  courseId: number;
  instructor?: string | null;
  totalDuration?: string | null;
  totalLectures?: number | null;
};
