"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeAlert, CircleCheckBig, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Order, OrderStatus } from "@/types/order";
import { Course } from "@/types/course";
import { CourseProgressBar } from "@/components/courses/course-progress-bar";

interface OrderHistoryProps {
  orders: Order[];
  enrolledCourses?: Course[];
  limit?: number;
  showViewAll?: boolean;
}

export function OrderHistory({
  orders,
  enrolledCourses = [],
  limit,
  showViewAll = false,
}: OrderHistoryProps) {
  const visibleOrders = typeof limit === "number" ? orders.slice(0, limit) : orders;
  const enrolledCourseMap = new Map(
    enrolledCourses.map((course) => [course.id, course]),
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <p className="text-sm text-slate-500">
            Track purchases, applied coupons, and retry pending payments.
          </p>
        </div>
        {showViewAll ? (
          <Link
            href="/orders"
            className="text-sm font-medium text-[var(--brand-700)] hover:text-[var(--brand-800)]"
          >
            View all orders
          </Link>
        ) : null}
      </div>

      {visibleOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <BadgeAlert className="size-6" />
          </div>
          <h4 className="mt-4 text-lg font-semibold text-slate-900">
            No orders yet
          </h4>
          <p className="mt-2 text-sm text-slate-500">
            Once you purchase a course, the complete order trail will appear
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleOrders.map((order) => {
            const couponCode =
              order.manualCouponCode || order.autoCouponCode || null;
            const canRetry =
              order.status === OrderStatus.CANCELLED ||
              order.status === OrderStatus.FAILED;
            const primaryItem = order.items[0];
            const enrolledCourse = primaryItem?.course
              ? enrolledCourseMap.get(primaryItem.course.id)
              : null;
            const course = primaryItem?.course
              ? {
                  ...primaryItem.course,
                  isEnrolled: Boolean(enrolledCourse?.isEnrolled),
                  progress: enrolledCourse?.progress || primaryItem.course.progress,
                }
              : null;

            return (
              <Card key={order.id} className="overflow-hidden rounded-3xl border-slate-200">
                <CardContent className="space-y-5 p-5 md:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-lg font-semibold text-slate-900">
                          Order #{order.id}
                        </h4>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                            order.status === OrderStatus.PAID
                              ? "bg-emerald-50 text-emerald-700"
                              : order.status === OrderStatus.FAILED
                                ? "bg-rose-50 text-rose-700"
                                : order.status === OrderStatus.CANCELLED
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-slate-500">Total paid</p>
                      <p className="text-xl font-semibold text-slate-950">
                        INR {Number(order.totalAmount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      {course ? (
                        <div className="flex gap-4">
                          <Link
                            href={`/course/${course.slug}`}
                            className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white"
                          >
                            <Image
                              src={course.image?.path || "/assets/default.png"}
                              alt={course.imageAlt || course.title}
                              fill
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                              <div className="min-w-0">
                                <Link
                                  href={`/course/${course.slug}`}
                                  className="line-clamp-2 text-lg font-semibold text-slate-900 hover:text-[var(--brand-700)]"
                                >
                                  {course.title}
                                </Link>
                                <p className="mt-1 text-sm text-slate-500">
                                  {course.shortDescription ||
                                    "Purchased course from your learning dashboard."}
                                </p>
                              </div>
                              <p className="shrink-0 text-sm font-semibold text-slate-700">
                                INR {Number(primaryItem.price || 0).toLocaleString("en-IN")}
                              </p>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                              {course.experienceLevel ? (
                                <span className="rounded-full bg-white px-3 py-1">
                                  {course.experienceLevel}
                                </span>
                              ) : null}
                              {course.language ? (
                                <span className="rounded-full bg-white px-3 py-1">
                                  {course.language}
                                </span>
                              ) : null}
                              {course.isEnrolled ? (
                                <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                                  Enrolled
                                </span>
                              ) : null}
                            </div>

                            {course.isEnrolled ? (
                              <div className="mt-4 max-w-sm">
                                <CourseProgressBar
                                  percent={course.progress?.progress || 0}
                                  slug={course.slug}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="space-y-2 text-sm text-slate-600">
                        <p>
                          <span className="font-medium text-slate-900">
                            Billing:
                          </span>{" "}
                          {order.billingAddress?.firstName}{" "}
                          {order.billingAddress?.lastName}
                        </p>
                        <p>
                          <span className="font-medium text-slate-900">
                            City:
                          </span>{" "}
                          {order.billingAddress?.city || "NA"}
                        </p>
                        <p>
                          <span className="font-medium text-slate-900">
                            Coupon:
                          </span>{" "}
                          {couponCode || "No coupon used"}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {order.status === OrderStatus.PAID ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                            <CircleCheckBig className="size-4" />
                            Payment successful
                          </span>
                        ) : null}

                        {canRetry ? (
                          <Link
                            href={`/checkout?retryOrderId=${order.id}`}
                            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-600)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--brand-700)]"
                          >
                            <RotateCcw className="size-4" />
                            Retry payment
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
