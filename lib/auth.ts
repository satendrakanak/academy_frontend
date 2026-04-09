import { apiServer } from "@/lib/api/server";
import { User } from "@/types/user";

export const getSession = async (): Promise<User | null> => {
  const data = await apiServer("/auth/profile");
  return data?.data ?? null;
};
