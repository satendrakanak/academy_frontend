"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types/course";
import { Plus, Minus, PlayCircle, Lock } from "lucide-react";
import VideoPreviewModal from "@/components/modals/video-preview-modal";
import { cn } from "@/lib/utils";

interface CourseContentProps {
  course: Course;
}

export const CourseContent = ({ course }: CourseContentProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [durations, setDurations] = useState<Record<number, string>>({});
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const getVideoDuration = (url: string, index: number) => {
    const video = document.createElement("video");
    video.src = url;

    video.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);

      setDurations((prev) => ({
        ...prev,
        [index]: `${minutes}:${seconds.toString().padStart(2, "0")}`,
      }));
    });
  };

  useEffect(() => {
    course.chapters?.forEach((chapter, index) => {
      if (chapter.video?.path) {
        getVideoDuration(chapter.video.path, index);
      }
    });
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
                {/* HEADER */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <h3
                      className={cn(
                        "font-medium text-gray-800 cursor-pointer",
                        isOpen && "text-primary",
                      )}
                    >
                      {chapter.title}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {durations[index] || ""}
                    </span>
                  </div>

                  {isOpen ? (
                    <Minus className="w-4 h-4 text-primary font-bold" />
                  ) : (
                    <Plus className="w-4 h-4 font-bold" />
                  )}
                </button>

                {/* CONTENT */}
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? "max-h-75" : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="px-4 pb-4 border-t pt-3 flex justify-between gap-4">
                    {/* DESCRIPTION */}
                    <div
                      className="prose max-w-none text-sm **:font-sans"
                      dangerouslySetInnerHTML={{
                        __html: chapter.description ?? "",
                      }}
                    />

                    {/* RIGHT ICON */}
                    <div className="flex items-start pt-1">
                      {chapter.isFree ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideo({
                              url: chapter.video?.path || "",
                              title: chapter.title,
                            });
                          }}
                          className="cursor-pointer"
                          title="Preview"
                        >
                          <PlayCircle className="w-6 h-6 text-primary" />
                        </button>
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <VideoPreviewModal
        videoUrl={activeVideo?.url || null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
};
