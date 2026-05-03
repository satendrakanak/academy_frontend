"use client";

import Link from "next/link";
import { Award, Download, ExternalLink } from "lucide-react";
import { Certificate } from "@/types/certificate";
import { slugify } from "@/utils/slugify";
import { downloadRemoteFile } from "@/lib/download-file";
import { Button } from "@/components/ui/button";

interface CertificatesViewProps {
  certificates: Certificate[];
}

export function CertificatesView({ certificates }: CertificatesViewProps) {
  const handleDownload = async (certificate: Certificate) => {
    if (!certificate.file?.path) return;

    const learner = slugify(
      `${certificate.user?.firstName} ${certificate.user?.lastName || ""}`,
    );
    const course = slugify(certificate.course?.title || "course");

    await downloadRemoteFile(
      certificate.file.path,
      `${learner}-${course}.pdf`,
    );
  };

  if (!certificates.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-white/6 dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Award className="size-7" />
        </div>

        <h3 className="mb-2 text-xl font-semibold dark:text-white">No certificates yet</h3>

        <p className="mb-6 max-w-md text-gray-500 dark:text-slate-300">
          Complete a course and your certificate will appear here automatically.
        </p>

        <Link
          href="/courses"
          className="rounded-xl bg-primary px-6 py-3 text-white transition hover:bg-primary/90"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {certificates.map((certificate) => (
        <div
          key={certificate.id}
          className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.3)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,17,31,0.92),rgba(16,26,46,0.98))] dark:shadow-[0_32px_90px_-46px_rgba(0,0,0,0.68)]"
        >
          <div className="academy-hero-gradient p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Certificate
            </p>
            <h3 className="mt-3 line-clamp-2 text-2xl font-semibold">
              {certificate.course.title}
            </h3>
          </div>

          <div className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Certificate ID
                </p>
                <p className="mt-1 font-semibold text-slate-950 dark:text-white">
                  {certificate.certificateNumber}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Issued On
                </p>
                <p className="mt-1 font-semibold text-slate-950 dark:text-white">
                  {new Date(certificate.issuedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/6 dark:text-slate-300">
              Your certificate is stored safely and can be downloaded anytime
              from this page.
            </div>

            <div className="flex flex-wrap gap-3">
              {certificate.file?.path ? (
                <Button
                  type="button"
                  onClick={() => handleDownload(certificate)}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <Download className="size-4" />
                  Download Certificate
                </Button>
              ) : null}

              <Button asChild type="button" variant="outline" className="rounded-full px-5 py-2.5 text-sm font-semibold">
                <Link href={`/course/${certificate.course.slug}`}>
                  <ExternalLink className="size-4" />
                  View Course
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
