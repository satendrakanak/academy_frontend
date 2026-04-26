"use client";

import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, ShoppingCart } from "lucide-react";
import { getCourseMeta } from "@/helpers/course-meta";

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

  const [loading, setLoading] = useState(false);

  const [meta, setMeta] = useState({
    totalLectures: 0,
    totalDuration: "0m",
  });

  useEffect(() => {
    const loadMeta = async () => {
      const data = await getCourseMeta(course);
      setMeta(data);
    };

    loadMeta();
  }, [course]);

  const alreadyAdded = isInCart(course.id);

  const handleAddToCart = async () => {
    if (alreadyAdded) {
      router.push("/cart");
      return;
    }

    setLoading(true);

    await new Promise((res) => setTimeout(res, 300));

    addToCart({
      id: course.id,
      title: course.title,
      price: Number(course.priceInr),
      image: course.image?.path,
      instructor: course.createdBy?.firstName,
      totalDuration: meta.totalDuration,
      totalLectures: meta.totalLectures,
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
      onClick={handleAddToCart}
      disabled={loading}
      className={`w-full h-12 text-base font-semibold rounded-lg flex items-center justify-center gap-2 ${className}`}
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
