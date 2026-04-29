"use client";

export function CoursesBanner() {
  return (
    <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* BREADCRUMB */}
        <p className="text-sm opacity-80 mb-4">Home • All Courses</p>

        {/* TITLE */}
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold">All Courses</h1>

          <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
            🎉 12 Courses
          </span>
        </div>

        <p className="mt-4 text-white/80 max-w-xl">
          Courses that help beginner designers become true unicorns.
        </p>

        {/* CONTROLS */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* GRID / LIST */}
            <div className="bg-white/20 p-1 rounded-full flex">
              <button className="px-4 py-1 rounded-full bg-white text-blue-600 text-sm">
                Grid
              </button>
              <button className="px-4 py-1 text-white text-sm">List</button>
            </div>

            <span className="text-sm text-white/80">
              Showing 1–6 of 12 results
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex gap-3">
            <input
              placeholder="Search Your Course..."
              className="px-5 py-2 rounded-full bg-white/20 placeholder:text-white/70 text-white outline-none w-64"
            />

            <button className="bg-white text-gray-800 px-4 py-2 rounded-full">
              Filter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
