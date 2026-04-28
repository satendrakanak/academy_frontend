"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover */}
      <div className="h-44 bg-gradient-to-r from-blue-600 to-red-500" />

      <div className="max-w-5xl mx-auto px-4">
        {/* Profile */}
        <div className="-mt-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-white" />

            <div>
              <h1 className="text-2xl font-bold">Satendra</h1>
              <p className="text-gray-600">Next.js Developer</p>
            </div>
          </div>

          {/* Owner only */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <StatCard label="Courses" value="12" />
          <StatCard label="Certificates" value="5" />
          <StatCard label="Completion" value="80%" />
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex gap-6 border-b pb-2">
            <button className="font-semibold border-b-2 border-blue-600">
              Courses
            </button>
            <button className="text-gray-500">Certificates</button>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}

function CourseCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <div className="h-32 bg-gray-200 rounded-lg mb-3" />
      <h3 className="font-semibold">Next.js Mastery</h3>
      <p className="text-sm text-gray-500 mb-2">Progress: 60%</p>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div className="bg-blue-600 h-2 rounded-full w-[60%]" />
      </div>
    </div>
  );
}
