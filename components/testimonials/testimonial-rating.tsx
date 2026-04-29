import { Star } from "lucide-react";

export const TestimonialRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${index < rating ? "fill-current" : "text-amber-200"}`}
        />
      ))}
    </div>
  );
};
