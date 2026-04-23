"use client";

import { Chapter } from "@/types/chapter";
import { Lecture } from "@/types/lecture";
import { CheckCircle2, FileText, PlayCircle } from "lucide-react";
import { LearnCourseResources } from "./learn-course-resources";
import { cn } from "@/lib/utils";

const formatDuration = (seconds: number) => {
  if (!seconds) return "";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
interface SectionLecturesProps {
  chapter: Chapter;
  openMenu: number | null;
  setOpenMenu: (id: number | null) => void;
  currentLecture: Lecture | null;
  onSelectLecture: (lecture: Lecture) => void;
}

export const SectionLectures = ({
  chapter,
  openMenu,
  setOpenMenu,
  currentLecture,
  onSelectLecture,
}: SectionLecturesProps) => {
  return (
    <div className="bg-gray-50">
      {chapter.lectures?.map((lecture: Lecture) => {
        const isActive = currentLecture?.id === lecture.id;
        const isCompleted = lecture.progress?.isCompleted;

        const hasVideo = !!lecture.video?.path;
        const hasAttachments =
          !!lecture.attachments && lecture.attachments?.length > 0;

        return (
          <div
            key={lecture.id}
            className={cn("px-3 py-2 border-l-4 cursor-pointer relative", {
              "border-primary bg-primary/10": isActive,
              "border-transparent hover:bg-gray-100": !isActive,
            })}
          >
            <div className="flex justify-between items-start">
              {/* LEFT */}
              <div
                className="flex gap-2 flex-1"
                onClick={() => onSelectLecture(lecture)}
              >
                {/* ICON */}
                <div className="mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : hasVideo ? (
                    <PlayCircle className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FileText className="w-4 h-4 text-gray-500" />
                  )}
                </div>

                {/* TITLE + DURATION */}
                <div>
                  <p
                    className={cn("line-clamp-1", {
                      "text-primary font-medium": isActive,
                    })}
                  >
                    {lecture.title}
                  </p>

                  {/* {hasVideo && (
                    <p className="text-xs text-gray-400">
                      {formatDuration(lecture.duration)}
                    </p>
                  )} */}
                </div>
              </div>

              {/* RIGHT MENU */}
              {hasAttachments && (
                <LearnCourseResources
                  lecture={lecture}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
