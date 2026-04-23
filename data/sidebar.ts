import {
  LayoutDashboard,
  BookOpen,
  FileText,
  FolderTree,
  Users,
  Settings,
} from "lucide-react";

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
    },

    {
      title: "Courses",
      url: "/admin/courses",
      icon: BookOpen,
      items: [
        {
          title: "All Courses",
          url: "/admin/courses",
        },
        {
          title: "Categories",
          url: "/admin/courses/categories",
        },
        {
          title: "Tags",
          url: "/admin/courses/tags",
        },
      ],
    },

    {
      title: "Articles",
      url: "/admin/articles",
      icon: FileText,
      items: [
        {
          title: "All Articles",
          url: "/admin/articles",
        },
        {
          title: "Create Article",
          url: "/admin/articles/create",
        },
      ],
    },

    {
      title: "Categories",
      url: "/admin/categories",
      icon: FolderTree,
      items: [
        {
          title: "All Categories",
          url: "/admin/categories",
        },
        {
          title: "Create Category",
          url: "/admin/categories/create",
        },
      ],
    },

    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/admin/users",
        },
        {
          title: "Roles & Permissions",
          url: "/admin/users/roles",
        },
      ],
    },

    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
};
