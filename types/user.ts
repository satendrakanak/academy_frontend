import { FileType } from "./file";

export type Role = {
  id: number;
  name: string;
};

export type UserProfile = {
  id: number;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  isPublic: boolean;
  showCourses: boolean;
  showCertificates: boolean;
  location?: string;
  website?: string;
};
export type FacultyProfile = {
  id: number;
  expertise?: string;
  experience?: string;
  designation?: string;
  linkedin: string;
  isApproved: boolean;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  username: string;
  avatar: FileType | null;
  coverImage: FileType | null;

  roles?: Role[];

  profile: UserProfile;
  facultyProfile: FacultyProfile;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CreateUserPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  avatarId?: number;
  coverImageId?: number;
  roleIds?: number[];
};

export type UpdateProfilePayload = {
  bio?: string;
  isPublic?: boolean;
  showCourses?: boolean;
  showCertificates?: boolean;
  location?: string;
  website?: string;
};

export type UpdateFacultyProfilePayload = {
  expertise?: string;
  experience?: string;
  designation?: string;
  linkedin?: string;
  isApproved?: boolean;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type DashboardStats = {
  courses: number;
  completed: number;
  progress: number;
};

export type WeeklyProgress = {
  day: string;
  progress: number;
};
