import { getSession } from "@/lib/auth";
import { userServerService } from "@/services/users/user.server";
import { Course } from "@/types/course";
import Link from "next/link";

export default async function CertificatesPage() {
  const session = await getSession();
  if (!session) return null;

  let enrolledCourses: Course[] = [];

  try {
    const response = await userServerService.getEnrolledCourses(session?.id);
    enrolledCourses = response.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className=" min-h-[60vh]">
      {/* 🔵 Title */}
      <h2 className="text-2xl font-semibold mb-6">My Certificates</h2>

      <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow p-10 border border-dashed">
        <div className="text-5xl mb-4">📚</div>

        <h3 className="text-xl font-semibold mb-2">No certificates yet</h3>

        <p className="text-gray-500 mb-6 max-w-md">
          You haven’t any certificates yet. Start learning something new today
          🚀
        </p>

        <Link
          href="/courses"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-red-900 transition"
        >
          Explore Courses
        </Link>
      </div>
    </div>
  );
}
