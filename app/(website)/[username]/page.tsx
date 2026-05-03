import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import { ProfileCover } from "@/components/profile/profile-cover";
import { ProfileHeader } from "@/components/profile/profile-header";
import ProgressChart from "@/components/profile/progress-chart";
import { userServerService } from "@/services/users/user.server";
import { Course } from "@/types/course";

type PageProps = {
  params: Promise<{ username: string }>;
};

const reserved = [
  "dashboard",
  "login",
  "courses",
  "orders",
  "settings",
  "profile",
  "exams",
  "certificates",
  "articles",
  "article",
  "course",
  "contact",
  "cart",
  "checkout",
  "our-faculty",
  "client-testimonials",
  "auth",
  "admin",
  "api",
];

export default async function PublicProfilePage({ params }: PageProps) {
  const { username: rawUsername } = await params;
  const username = rawUsername.startsWith("@")
    ? rawUsername.slice(1)
    : rawUsername;

  if (reserved.includes(username)) {
    return notFound();
  }

  const response = await userServerService.getPublicProfile(username);
  const bundle = response.data;

  if (!bundle) {
    return notFound();
  }

  const { user, stats, weeklyProgress, courses, certificates, examHistory } =
    bundle;

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_20%,#f8fafc_100%)] dark:bg-[linear-gradient(180deg,#08101f_0%,#0d1528_28%,#0f182d_100%)]">
      <Container>
        <div className="pb-12 pt-6">
          <ProfileCover coverImage={user.coverImage?.path} isOwner={false} />
          <div className="relative z-10 px-2 md:px-6">
            <ProfileHeader user={user} isOwner={false} stats={stats} />
          </div>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
                About
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                Learning journey in focus
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                {user.profile?.bio ||
                  "This learner has made the profile public to showcase educational momentum, exam activity, and earned recognitions."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Courses", value: String(stats.courses) },
                  { label: "Progress", value: `${stats.progress}%` },
                  {
                    label: "Passed Exams",
                    value: String(stats.examsPassed),
                  },
                  {
                    label: "Certificates",
                    value: String(stats.certificatesEarned),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {user.profile?.website ? (
                  <Link
                    href={user.profile.website}
                    target="_blank"
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/6 dark:text-slate-100 dark:hover:bg-white/8"
                  >
                    Visit website
                  </Link>
                ) : null}
                {user.profile?.location ? (
                  <SoftBadge>{user.profile.location}</SoftBadge>
                ) : null}
                <SoftBadge>@{user.username}</SoftBadge>
                {user.profile?.linkedin ? (
                  <Link
                    href={user.profile.linkedin}
                    target="_blank"
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/6 dark:text-slate-100 dark:hover:bg-white/8"
                  >
                    LinkedIn
                  </Link>
                ) : null}
                {user.profile?.instagram ? (
                  <Link
                    href={user.profile.instagram}
                    target="_blank"
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/6 dark:text-slate-100 dark:hover:bg-white/8"
                  >
                    Instagram
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)] md:p-6">
              <ProgressChart weeklyProgress={weeklyProgress} />
            </div>
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
                  Final Exam Highlights
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  Public assessment report
                </h3>
              </div>

              {examHistory.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  No public final exam activity to display yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {examHistory.map((item) => (
                    <div
                      key={item.courseId}
                      className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-base font-semibold text-slate-950 dark:text-white">
                            {item.courseTitle}
                          </h4>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                            {item.attempts} attempt
                            {item.attempts > 1 ? "s" : ""} • Best{" "}
                            {item.bestPercentage}% • Latest{" "}
                            {item.latestPercentage}%
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.passed
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {item.passed ? "Passed" : "In Progress"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
                  Certificate Wall
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  Earned recognitions
                </h3>
              </div>

              {certificates.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  No certificates are public on this profile yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="rounded-[24px] border border-slate-200 bg-[linear-gradient(135deg,#fff7ed,#ffffff)] p-4 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(26,35,59,0.96),rgba(16,24,44,0.96))]"
                    >
                      <p className="text-base font-semibold text-slate-950 dark:text-white">
                        {certificate.course.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                        Certificate #{certificate.certificateNumber}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--brand-700)] dark:text-[var(--brand-200)]">
                        Issued{" "}
                        {new Date(certificate.issuedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {courses.length ? (
            <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.95),rgba(15,24,43,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
                    Visible Courses
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                    Public learning portfolio
                  </h3>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">
                  Public profile par learner access ya internal progress show nahi
                  hota. Yahan sirf visible course showcase dikh raha hai.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <PublicCourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

function SoftBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/6 dark:text-slate-100">
      {children}
    </span>
  );
}

function PublicCourseCard({ course }: { course: Course }) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] shadow-[0_20px_45px_-38px_rgba(15,23,42,0.22)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.92),rgba(16,26,46,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
      <Link href={`/course/${course.slug}`} className="block">
        <div className="relative h-52">
          <Image
            src={course.image?.path || "/assets/default.png"}
            alt={course.imageAlt || course.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/course/${course.slug}`}>
          <h4 className="line-clamp-2 text-lg font-semibold text-slate-950 hover:text-[var(--brand-700)] dark:text-white dark:hover:text-[var(--brand-200)]">
            {course.title}
          </h4>
        </Link>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-300">
          {course.shortDescription ||
            "A public showcase course from this learner's visible portfolio."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
          {course.experienceLevel ? (
            <span className="rounded-full bg-white px-3 py-2 ring-1 ring-slate-200 dark:bg-white/8 dark:ring-white/10">
              {course.experienceLevel}
            </span>
          ) : null}
          {course.language ? (
            <span className="rounded-full bg-white px-3 py-2 ring-1 ring-slate-200 dark:bg-white/8 dark:ring-white/10">
              {course.language}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
