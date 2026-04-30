"use client";

export function CoursesBanner({ totalCourses }: { totalCourses: number }) {
  return (
    <section className="academy-hero-gradient relative overflow-hidden py-18 text-white">
      <div className="academy-hero-grid absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <p className="mb-4 text-sm font-medium text-white/70">Home • All Courses</p>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              {totalCourses}+ curated programs
            </div>
            <h1 className="text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">
              Learn through structured, career-conscious wellness education.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Browse certification-led, practical programs designed for
              beginners, practitioners, and serious learners building real
              capability.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/14 bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">
              Snapshot
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-bold">{totalCourses}+</p>
                <p className="mt-1 text-sm text-white/72">Published courses</p>
              </div>
              <div>
                <p className="text-3xl font-bold">Live</p>
                <p className="mt-1 text-sm text-white/72">Mentor support</p>
              </div>
              <div>
                <p className="text-3xl font-bold">Practical</p>
                <p className="mt-1 text-sm text-white/72">Outcome-first curriculum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
