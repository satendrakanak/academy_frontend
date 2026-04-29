import { Coupon } from "@/types/coupon";
import { formatDate } from "@/utils/formate-date";

interface CouponQuickInfoProps {
  coupon: Coupon;
}

export function CouponQuickInfo({ coupon }: CouponQuickInfoProps) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm text-xs bg-white  text-muted-foreground space-y-1">
      <p>Coupon ID: #{coupon.id}</p>

      <p>Created At: {formatDate(coupon.createdAt)}</p>

      <p>Last updated: {formatDate(coupon.updatedAt)}</p>
    </div>
  );
}
