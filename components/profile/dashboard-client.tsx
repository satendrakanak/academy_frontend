"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CourseCard } from "../courses/course-card";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Course } from "@/types/course";
import { DashboardStats, WeeklyProgress } from "@/types/user";
import { Order, OrderStatus } from "@/types/order";
import { BadgeAlert, CircleCheckBig, RotateCcw } from "lucide-react";

interface DashboardClientProps {
  stats: DashboardStats;
  courses: Course[];
  weeklyProgress: WeeklyProgress[];
  orders: Order[];
}

export default function DashboardClient({
  stats,
  courses,
  weeklyProgress,
  orders,
}: DashboardClientProps) {
  const ProgressChart = dynamic(
    () => import("@/components/profile/progress-chart"),
    { ssr: false },
  );
  return (
    <>
      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Courses" value={stats.courses} />
        <StatCard title="Completed" value={stats.completed} />
        <StatCard title="Progress" value={`${stats.progress}%`} />
      </div>

      {/* 📈 Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-4">Weekly Progress</h3>

          <div className="h-48">
            <ProgressChart weeklyProgress={weeklyProgress} />
          </div>
        </CardContent>
      </Card>

      {/* 🎓 Continue Learning */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow p-10 border border-dashed">
            <div className="text-5xl mb-4">📚</div>

            <h3 className="text-xl font-semibold mb-2">No courses yet</h3>

            <p className="text-gray-500 mb-6 max-w-md">
              You haven’t enrolled in any courses yet. Start learning something
              new today 🚀
            </p>

            <Link
              href="/courses"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <p className="text-sm text-slate-500">
              Track purchases, applied coupons, and retry pending payments.
            </p>
          </div>
          <Link
            href="/profile/orders"
            className="text-sm font-medium text-[var(--brand-700)] hover:text-[var(--brand-800)]"
          >
            View all orders
          </Link>
        </div>

        {orders.length === 0 ? (
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
            {orders.slice(0, 5).map((order) => {
              const couponCode =
                order.manualCouponCode || order.autoCouponCode || null;
              const canRetry =
                order.status === OrderStatus.CANCELLED ||
                order.status === OrderStatus.FAILED;

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
                      <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0"
                          >
                            <div>
                              <p className="font-medium text-slate-900">
                                {item.course?.title || "Course"}
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                Qty {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                              INR {Number(item.price || 0).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ))}
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
    </>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
