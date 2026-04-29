import {
  LayoutDashboard,
  BookOpen,
  FileText,
  FolderTree,
  Users,
  Settings,
  MessageSquare,
  TicketPercent,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  requiredPermissions?: string[];
};

export type SidebarNavItem = SidebarItem & {
  icon?: LucideIcon;
  items?: SidebarItem[];
};

export const sidebarData = {
  user: {
    name: "Satendra",
    email: "satendra@example.com",
    avatar: "/avatars/user.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      requiredPermissions: ["view_dashboard"],
    },

    {
      title: "Courses",
      url: "/admin/courses",
      icon: BookOpen,
      requiredPermissions: ["view_course", "create_course", "update_course"],
      items: [
        {
          title: "All Courses",
          url: "/admin/courses",
          requiredPermissions: ["view_course"],
        },
        {
          title: "Categories",
          url: "/admin/courses/categories",
          requiredPermissions: ["view_category"],
        },
        {
          title: "Tags",
          url: "/admin/courses/tags",
          requiredPermissions: ["view_tag"],
        },
      ],
    },

    {
      title: "Coupons",
      url: "/admin/coupons",
      icon: TicketPercent,
      requiredPermissions: ["view_coupon", "create_coupon", "update_coupon"],
    },

    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingBag,
      requiredPermissions: ["view_order", "update_order"],
    },

    {
      title: "Articles",
      url: "/admin/articles",
      icon: FileText,
      requiredPermissions: ["view_article", "create_article", "update_article"],
      items: [
        {
          title: "All Articles",
          url: "/admin/articles",
          requiredPermissions: ["view_article"],
        },
        {
          title: "Create Article",
          url: "/admin/articles/create",
          requiredPermissions: ["create_article"],
        },
      ],
    },

    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: MessageSquare,
      requiredPermissions: [
        "view_testimonial",
        "create_testimonial",
        "update_testimonial",
      ],
    },

    {
      title: "Categories",
      url: "/admin/categories",
      icon: FolderTree,
      requiredPermissions: ["view_category", "create_category", "update_category"],
      items: [
        {
          title: "All Categories",
          url: "/admin/categories",
          requiredPermissions: ["view_category"],
        },
        {
          title: "Create Category",
          url: "/admin/categories/create",
          requiredPermissions: ["create_category"],
        },
      ],
    },

    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      requiredPermissions: ["view_user", "create_user", "update_user"],
    },

    {
      title: "Settings",
      url: "/admin/settings/access-control",
      icon: Settings,
      requiredPermissions: ["view_settings", "view_permission", "view_role"],
    },
  ],
};
