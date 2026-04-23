"use client";

import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { getCourseMeta } from "@/lib/course-meta";

interface AddToCartButtonProps {
  course: Course;
  className?: string;
}

export const AddToCartButton = ({
  course,
  className,
}: AddToCartButtonProps) => {
  const router = useRouter();

  const addToCart = useCartStore((s) => s.addToCart);
  const isInCart = useCartStore((s) => s.isInCart);

  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { totalLectures, totalDuration } = useMemo(
    () => getCourseMeta(course),
    [course],
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 🔒 hydration safe
  if (!hasMounted) {
    return (
      <Button className="w-full h-12 rounded-lg" disabled>
        Loading...
      </Button>
    );
  }

  const alreadyAdded = isInCart(course.id);

  const handleAdd = async () => {
    if (alreadyAdded) {
      router.push("/cart");
      return;
    }

    setLoading(true);

    await new Promise((res) => setTimeout(res, 500));

    addToCart({
      id: course.id,
      title: course.title,
      price: Number(course.priceInr),
      image: course.image?.path,
      instructor: course.createdBy?.firstName,
      totalDuration,
      totalLectures,
    });

    setLoading(false);

    toast.success("Added to cart 🛒", {
      description: course.title,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={loading}
      className={`w-full h-12 text-base font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${className}`}
      variant={alreadyAdded ? "secondary" : "default"}
    >
      {loading ? (
        <>
          <Loader className="h-5 w-5 animate-spin" />
          Adding...
        </>
      ) : alreadyAdded ? (
        <>
          <ShoppingCart className="h-5 w-5" />
          View Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
};
