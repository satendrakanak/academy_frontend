export default function PublicProfile() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover */}
      <div className="h-44 bg-gradient-to-r from-blue-600 to-red-500" />

      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Header */}
        <div className="-mt-16 flex items-center gap-4">
          <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-white" />

          <div>
            <h1 className="text-2xl font-bold">Satendra</h1>
            <p className="text-gray-600">Next.js Developer</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <StatCard label="Courses" value="12" />
          <StatCard label="Certificates" value="5" />
          <StatCard label="Completion" value="80%" />
        </div>

        {/* Courses */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Courses</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <PublicCourseCard />
            <PublicCourseCard />
            <PublicCourseCard />
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

function PublicCourseCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="h-32 bg-gray-200 rounded-lg mb-3" />
      <h3 className="font-semibold">React Advanced</h3>
      <p className="text-sm text-gray-500">Completed</p>
    </div>
  );
}
