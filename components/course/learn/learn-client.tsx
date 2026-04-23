"use client";

import { useEffect, useState } from "react";
import { PlayerHeader } from "./player-header";
import { VideoPlayer } from "./video-player";
import { LearnCourseSidebar } from "./learn-course-sidebar";
import { CourseTabs } from "./course-tabs";
import { Course } from "@/types/course";
import { userProgressClientService } from "@/services/user-progress/user-progress.client";

export const LearnClient = ({ course }: { course: Course }) => {
  const firstLecture = course.chapters?.[0]?.lectures?.[0] || null;

  const [courseData, setCourseData] = useState(course);
  const [currentLecture, setCurrentLecture] = useState(firstLecture);

  // 🔥 LOAD PROGRESS
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await userProgressClientService.getCourse(course.id);
        const progressMap = res.data;

        const updatedCourse = {
          ...course,
          chapters: course.chapters.map((chapter) => ({
            ...chapter,
            lectures: chapter.lectures.map((lecture) => ({
              ...lecture,
              progress: progressMap[lecture.id] || {
                isCompleted: false,
                progress: 0,
                lastTime: 0,
              },
            })),
          })),
        };

        setCourseData(updatedCourse);
      } catch {
        console.error("Failed to load progress");
      }
    };

    loadProgress();
  }, [course]);

  useEffect(() => {
    if (!courseData) return;

    const allLectures = courseData.chapters.flatMap((c) => c.lectures);

    // 🔥 1. find first incomplete lecture
    const nextLecture =
      allLectures.find((l) => !l.progress?.isCompleted) ||
      allLectures[allLectures.length - 1]; // fallback

    if (nextLecture) {
      setCurrentLecture(nextLecture);
    }
  }, [courseData]);

  // 🔥 SYNC CURRENT LECTURE WITH UPDATED DATA
  useEffect(() => {
    if (!currentLecture) return;

    const updatedLecture = courseData.chapters
      .flatMap((c) => c.lectures)
      .find((l) => l.id === currentLecture.id);

    if (updatedLecture) {
      setCurrentLecture(updatedLecture);
    }
  }, [courseData]);

  // 🔥 NEXT LECTURE
  const handleNextLecture = () => {
    let found = false;

    for (const chapter of courseData.chapters) {
      for (const lecture of chapter.lectures) {
        if (found) {
          setCurrentLecture(lecture);
          return;
        }

        if (lecture.id === currentLecture?.id) {
          found = true;
        }
      }
    }
  };
  const handleProgressUpdate = (
    lectureId: number,
    progress: number,
    lastTime: number,
  ) => {
    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) => ({
        ...chapter,
        lectures: chapter.lectures.map((l) =>
          l.id === lectureId
            ? {
                ...l,
                progress: {
                  isCompleted: progress >= 90,
                  progress,
                  lastTime,
                },
              }
            : l,
        ),
      })),
    }));
  };
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <PlayerHeader course={courseData} />

      <div className="flex flex-1 overflow-hidden">
        {/* 🎥 PLAYER */}
        <div className="flex-1 flex flex-col bg-black">
          <VideoPlayer
            lecture={currentLecture}
            onNext={handleNextLecture}
            onProgressUpdate={handleProgressUpdate}
          />
          <CourseTabs course={courseData} />
        </div>

        {/* 📚 SIDEBAR */}
        <div className="w-90 border-l bg-white overflow-y-auto">
          <LearnCourseSidebar
            course={courseData}
            currentLecture={currentLecture}
            onSelectLecture={setCurrentLecture}
          />
        </div>
      </div>
    </div>
  );
};
