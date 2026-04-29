import Container from "@/components/container";
import { ProfileCover } from "@/components/profile/profile-cover";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileMenu } from "@/components/profile/profile-menu";
import { getSession } from "@/lib/auth";
import { getErrorMessage } from "@/lib/error-handler";
import { userServerService } from "@/services/users/user.server";
import { User } from "@/types/user";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username?: string }>;
}) {
  const { username } = await params;
  const session = await getSession();

  let user: User | null = null;

  if (username) {
    // 👉 future public profile
    // user = await getUserByUsername(...)
  } else {
    user = session;
  }

  if (!user) return null;

  const isOwner = session?.id === user.id;

  // 🔥 stats fetch
  let stats = {
    courses: 0,
    completed: 0,
    progress: 0,
  };

  try {
    const res = await userServerService.getDashboardStats(user.id);

    stats = res.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover */}
      <Container>
        <div className="pt-6">
          <ProfileCover coverImage={user.coverImage?.path} isOwner={isOwner} />
        </div>
      </Container>

      <Container>
        {/* Header */}
        <ProfileHeader user={user} isOwner={isOwner} stats={stats} />

        {/* Menu */}
        <ProfileMenu isOwner={isOwner} />

        {/* Content */}
        <div className="py-6 bg-white">{children}</div>
      </Container>
    </div>
  );
}
