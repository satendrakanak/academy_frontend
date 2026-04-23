"use client";

import { userProgressClientService } from "@/services/user-progress/user-progress.client";
import { Lecture } from "@/types/lecture";
import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  lecture: Lecture;
  onNext: () => void;
  onProgressUpdate: (
    lectureId: number,
    progress: number,
    lastTime: number,
  ) => void;
}

export const VideoPlayer = ({
  lecture,
  onNext,
  onProgressUpdate,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = !!lecture?.video?.path;
  const firstAttachment = lecture?.attachments?.[0];

  /**
   * ✅ ONLY RUN WHEN LECTURE CHANGES (not progress update)
   */
  useEffect(() => {
    if (!hasVideo) return;

    const video = videoRef.current;
    if (!video) return;

    // 🔥 resume playback
    video.currentTime = lecture.progress?.lastTime || 0;

    video.play().catch(() => {});
  }, [lecture.id]); // ✅ IMPORTANT FIX

  /**
   * ✅ PROGRESS TRACKING (stable)
   */
  useEffect(() => {
    if (!hasVideo) return;

    const video = videoRef.current;
    if (!video) return;

    let lastSent = 0;

    const handleTimeUpdate = async () => {
      if (!video.duration) return;

      const currentTime = video.currentTime;
      const progress = (currentTime / video.duration) * 100;

      if (Math.floor(currentTime) - lastSent >= 5) {
        lastSent = Math.floor(currentTime);

        try {
          await userProgressClientService.update({
            lectureId: lecture.id,
            progress,
            lastTime: currentTime,
          });

          // 🔥 LOCAL UPDATE (UI sync)
          onProgressUpdate(lecture.id, progress, currentTime);
        } catch {
          console.error("Progress update failed");
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [lecture.id, hasVideo]); // ✅ IMPORTANT FIX

  /**
   * ✅ AUTO NEXT
   */
  useEffect(() => {
    if (!hasVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = async () => {
      // 🔥 mark complete
      await userProgressClientService.update({
        lectureId: lecture.id,
        progress: 100,
        lastTime: video.duration,
      });

      onProgressUpdate(lecture.id, 100, video.duration);

      onNext();
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [lecture.id, hasVideo, onNext]);

  useEffect(() => {
    if (hasVideo) return;
    if (!lecture?.id) return;

    const markComplete = async () => {
      try {
        await userProgressClientService.update({
          lectureId: lecture.id,
          progress: 100,
          lastTime: 0,
        });

        onProgressUpdate(lecture.id, 100, 0);
      } catch {
        console.error("File completion failed");
      }
    };

    markComplete();
  }, [lecture.id, hasVideo]);

  /**
   * ❌ disable right click
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!lecture) return null;

  return (
    <div className="w-full bg-black flex items-center justify-center">
      {hasVideo ? (
        <video
          ref={videoRef}
          src={lecture.video?.path}
          controls
          autoPlay
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          onContextMenu={handleContextMenu}
          className="w-full h-125"
        />
      ) : (
        <div className="w-full h-125 bg-white">
          {firstAttachment ? (
            <iframe
              src={firstAttachment.file?.path}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No content available
            </div>
          )}
        </div>
      )}
    </div>
  );
};
