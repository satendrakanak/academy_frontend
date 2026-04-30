import { getSession } from "@/lib/auth";
import { certificateServerService } from "@/services/certificates/certificate.server";
import { Certificate } from "@/types/certificate";
import Link from "next/link";

export default async function CertificatesPage() {
  const session = await getSession();
  if (!session) return null;

  let certificates: Certificate[] = [];

  try {
    const response = await certificateServerService.getMine();
    certificates = response.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className=" min-h-[60vh]">
      {/* 🔵 Title */}
      <h2 className="text-2xl font-semibold mb-6">My Certificates</h2>

      {certificates.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="bg-linear-to-br from-[#102048] via-[#304fdb] to-[#e34b44] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  Certificate
                </p>
                <h3 className="mt-3 line-clamp-2 text-2xl font-semibold">
                  {certificate.course.title}
                </h3>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                    Certificate ID
                  </p>
                  <p className="mt-1 font-semibold text-gray-950">
                    {certificate.certificateNumber}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  Issued on{" "}
                  {new Date(certificate.issuedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <div className="flex flex-wrap gap-3">
                  {certificate.file?.path && (
                    <Link
                      href={certificate.file.path}
                      target="_blank"
                      className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                      Download Certificate
                    </Link>
                  )}
                  <Link
                    href={`/course/${certificate.course.slug}`}
                    className="rounded-full border px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white p-10 text-center shadow">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
            🎓
          </div>

          <h3 className="mb-2 text-xl font-semibold">No certificates yet</h3>

          <p className="mb-6 max-w-md text-gray-500">
            Complete a course and your certificate will appear here
            automatically.
          </p>

          <Link
            href="/courses"
            className="rounded-lg bg-primary px-6 py-3 text-white transition hover:bg-primary/90"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
}
