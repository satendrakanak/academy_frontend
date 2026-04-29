import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function PublicProfilePage({ params }: PageProps) {
  const { username: rawUsername } = await params;

  // @ strip
  const username = rawUsername.startsWith("@")
    ? rawUsername.slice(1)
    : rawUsername;

  // Reserved routes block
  const reserved = ["dashboard", "login", "courses"];
  if (reserved.includes(username)) {
    return notFound();
  }

  // DB check
  const user = await getUser(username);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{user.name}'s Courses</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <PublicCourseCard />
        <PublicCourseCard />
      </div>
    </div>
  );
}

// Dummy DB
async function getUser(username: string) {
  const users = ["satendra", "john"];

  if (users.includes(username)) {
    return { name: username };
  }

  return null;
}

function PublicCourseCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="h-32 bg-gray-200 rounded-lg mb-3" />
      <h3 className="font-semibold">React Advanced</h3>
      <p className="text-sm text-gray-500">Completed</p>
    </div>
  );
}
