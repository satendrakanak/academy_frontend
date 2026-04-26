"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types/course";
import { Plus, Minus, PlayCircle, Lock, FileText } from "lucide-react";
import VideoPreviewModal from "@/components/modals/video-preview-modal";
import { cn } from "@/lib/utils";
import { getVideoDuration, formatDuration } from "@/helpers/get-section-stats";

interface CourseContentProps {
  course: Course;
}

export const CourseContent = ({ course }: CourseContentProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [durationMap, setDurationMap] = useState<Record<number, number>>({});
  const [sectionDuration, setSectionDuration] = useState<
    Record<number, number>
  >({});

  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // 🔥 LOAD DURATIONS
  useEffect(() => {
    const loadDurations = async () => {
      const lectureDurations: Record<number, number> = {};
      const sectionDurations: Record<number, number> = {};

      for (const chapter of course.chapters ?? []) {
        let total = 0;

        for (const lecture of chapter.lectures ?? []) {
          if (lecture.video?.path) {
            const duration = await getVideoDuration(lecture.video.path);

            lectureDurations[lecture.id] = duration;
            total += duration;
          }
        }

        sectionDurations[chapter.id] = total;
      }

      setDurationMap(lectureDurations);
      setSectionDuration(sectionDurations);
    };

    loadDurations();
  }, [course]);

  return (
    <>
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-5 border-b pb-3">
          Course Content
        </h2>

        <div className="space-y-3">
          {course.chapters?.map((chapter, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={chapter.id}
                className="border rounded-xl overflow-hidden"
              >
                {/* 🔥 CHAPTER HEADER */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <h3
                      className={cn(
                        "font-medium text-gray-800",
                        isOpen && "text-primary",
                      )}
                    >
                      {chapter.title}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {chapter.lectures?.length || 0} lectures
                    </span>

                    {/* 🔥 TOTAL DURATION */}
                    {sectionDuration[chapter.id] > 0 && (
                      <span className="text-xs text-gray-400">
                        • {formatDuration(sectionDuration[chapter.id])}
                      </span>
                    )}
                  </div>

                  {isOpen ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>

                {/* 🔥 LECTURES */}
                <div
                  className={cn(
                    "transition-all duration-300 overflow-hidden",
                    isOpen ? "max-h-150" : "max-h-0",
                  )}
                >
                  <div className="border-t px-4 py-4 space-y-4">
                    {/* 🔥 CHAPTER DESCRIPTION (TOP) */}
                    {chapter.description && (
                      <div className="prose max-w-none text-sm text-gray-600 border-b pb-3">
                        {chapter.description}
                      </div>
                    )}

                    {/* 🔥 LECTURES */}
                    <div>
                      {chapter.lectures?.map((lecture) => {
                        const isLocked = !lecture.isFree || !chapter.isFree;

                        const hasVideo = !!lecture.video?.path;
                        const hasAttachment =
                          lecture.attachments && lecture.attachments.length > 0;

                        const duration = durationMap[lecture.id];

                        return (
                          <div
                            key={lecture.id}
                            className="py-3 border-b last:border-none hover:bg-gray-50 transition px-2 rounded"
                          >
                            {/* 🔥 TOP ROW */}
                            <div className="flex items-center justify-between">
                              {/* LEFT */}
                              <div className="flex items-center gap-3">
                                {isLocked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : hasVideo ? (
                                  <PlayCircle className="w-4 h-4 text-primary" />
                                ) : (
                                  <FileText className="w-4 h-4 text-gray-500" />
                                )}

                                <p className="text-sm text-gray-800">
                                  {lecture.title}
                                </p>
                              </div>

                              {/* RIGHT */}
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                {/* 🔥 PREVIEW */}
                                {!isLocked && hasVideo && (
                                  <button
                                    onClick={() =>
                                      setActiveVideo({
                                        url: lecture.video?.path || "",
                                        title: lecture.title,
                                      })
                                    }
                                    className="text-primary hover:underline cursor-pointer"
                                  >
                                    Preview
                                  </button>
                                )}
                                {/* 🔥 VIDEO DURATION */}
                                {hasVideo && duration && (
                                  <span>{formatDuration(duration)}</span>
                                )}

                                {/* 🔥 FILE ICON (NO VIDEO) */}
                                {!hasVideo && hasAttachment && (
                                  <FileText className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            </div>

                            {/* 🔥 LECTURE DESCRIPTION */}
                            {lecture.description && (
                              <div className="mt-2 ml-7 text-xs text-gray-600 prose max-w-none">
                                {lecture.description}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔥 VIDEO MODAL */}
      <VideoPreviewModal
        videoUrl={activeVideo?.url || null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
};
