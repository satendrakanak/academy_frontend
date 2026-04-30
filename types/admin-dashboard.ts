export type AdminDashboardSummary = {
  totalRevenue: number;
  paidOrders: number;
  totalUsers: number;
  enrolledUsers: number;
  totalCourses: number;
  publishedCourses: number;
  totalCoupons: number;
  couponRedemptions: number;
  totalDiscountGiven: number;
  averageOrderValue: number;
};

export type AdminRevenuePoint = {
  month: string;
  revenue: number;
  discounts: number;
  orders: number;
};

export type AdminStatusPoint = {
  name: string;
  value: number;
  fill: string;
};

export type AdminTopCoursePoint = {
  id: number;
  title: string;
  slug: string;
  sales: number;
  revenue: number;
};

export type AdminCouponUsagePoint = {
  id: number;
  code: string;
  usedCount: number;
  usageLimit: number | null;
  usageRate: number;
  status: string;
  isAutoApply: boolean;
};

export type AdminRecentOrderPoint = {
  id: number;
  customerName: string;
  courseNames: string[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

export type AdminDashboardData = {
  summary: AdminDashboardSummary;
  revenueTrend: AdminRevenuePoint[];
  orderStatusDistribution: AdminStatusPoint[];
  topCourses: AdminTopCoursePoint[];
  couponUsage: AdminCouponUsagePoint[];
  recentOrders: AdminRecentOrderPoint[];
};
