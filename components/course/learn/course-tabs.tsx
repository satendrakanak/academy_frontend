"use client";

import { Course } from "@/types/course";
import { Certificate } from "@/types/certificate";
import { certificateClientService } from "@/services/certificates/certificate.client";
import { getCourseProgress } from "@/helpers/course-progress";
import { getCourseMeta } from "@/helpers/course-meta";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CourseTabsProps {
  course: Course;
}

export const CourseTabs = ({ course }: CourseTabsProps) => {
  const [meta, setMeta] = useState({
    totalLectures: 0,
    totalDuration: "0m",
  });
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { completed, total, percent } = getCourseProgress(course);
  const isCourseCompleted = total > 0 && completed >= total;

  useEffect(() => {
    const loadMeta = async () => {
      const data = await getCourseMeta(course);
      setMeta(data);
    };

    loadMeta();
  }, [course]);

  useEffect(() => {
    let mounted = true;

    const loadCertificate = async () => {
      try {
        const response = await certificateClientService.getForCourse(course.id);
        if (mounted) setCertificate(response.data);
      } catch {
        if (mounted) setCertificate(null);
      }
    };

    loadCertificate();

    return () => {
      mounted = false;
    };
  }, [course.id]);

  const downloadCertificate = (nextCertificate: Certificate) => {
    if (!nextCertificate.file?.path) return;

    window.open(nextCertificate.file.path, "_blank", "noopener,noreferrer");
  };

  const handleCertificateClick = async () => {
    if (certificate) {
      downloadCertificate(certificate);
      return;
    }

    if (!isCourseCompleted) {
      toast.info("Complete all lectures to unlock your certificate");
      return;
    }

    try {
      setIsGenerating(true);
      const response = await certificateClientService.generateForCourse(
        course.id,
      );
      setCertificate(response.data);
      toast.success("Certificate generated and emailed successfully");
      downloadCertificate(response.data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Certificate could not be generated",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border-t">
      {/* 🔥 TAB HEADER */}
      <div className="px-6 pt-4 border-b">
        <span className="text-sm font-medium border-b-2 border-primary pb-2 inline-block">
          Overview
        </span>
      </div>

      {/* 🔥 CONTENT */}
      <div className="px-6 py-6 space-y-4 text-sm text-gray-700">
        <h1 className="text-2xl font-semibold ">{course.title}</h1>

        {/* 🚀 SHORT DESCRIPTION */}
        {course.shortDescription && (
          <div>
            <p className="text-base text-gray-900 leading-relaxed">
              {course.shortDescription}
            </p>
          </div>
        )}

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t pt-6">
          <div>
            <p className="text-gray-500 text-xs">Lectures</p>
            <p className="font-semibold">{meta.totalLectures}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Total Duration</p>
            <p className="font-semibold">{meta.totalDuration}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Language</p>
            <p className="font-semibold">{course.language || "English"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Level</p>
            <p className="font-semibold">All Level</p>
          </div>
        </div>

        {/* 🎓 CERTIFICATE */}
        <div className="border-t pt-6">
          <div className="overflow-hidden rounded-2xl border border-primary/15 bg-linear-to-br from-primary/10 via-white to-orange-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Certificate
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-950">
                  {certificate
                    ? "Your certificate is ready"
                    : "Unlock your completion certificate"}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
                  {certificate
                    ? `Certificate ID ${certificate.certificateNumber}. You can download it anytime from here or your profile.`
                    : `Complete all ${total || meta.totalLectures} lectures to generate your official Unitus certificate. Current progress: ${percent}%.`}
                </p>
              </div>

              <button
                type="button"
                disabled={(!isCourseCompleted && !certificate) || isGenerating}
                onClick={handleCertificateClick}
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                {isGenerating
                  ? "Generating..."
                  : certificate
                    ? "Download Certificate"
                    : "Get Certificate"}
              </button>
            </div>
          </div>
        </div>

        {/* 📚 FULL DESCRIPTION */}
        {course.description && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-base mb-3">Description</h3>

            <div
              className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-p:leading-relaxed
                 prose-ul:list-disc prose-ul:ml-4
                 prose-ol:list-decimal prose-ol:ml-4"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
