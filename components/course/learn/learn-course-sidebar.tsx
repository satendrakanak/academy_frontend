"use client";

import { getSectionStats } from "@/helper/get-section-stats";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionLectures } from "./section-lectures";

const formatTotalDuration = (seconds: number) => {
  if (!seconds) return "";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
};

export const LearnCourseSidebar = ({
  course,
  currentLecture,
  onSelectLecture,
}: any) => {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [sectionStats, setSectionStats] = useState<
    Record<number, { total: number; completed: number; totalSeconds: number }>
  >({});

  useEffect(() => {
    const loadStats = async () => {
      const statsMap: Record<
        number,
        { total: number; completed: number; totalSeconds: number }
      > = {};

      for (const chapter of course.chapters) {
        const stats = await getSectionStats(chapter.lectures);
        statsMap[chapter.id] = stats;
      }

      setSectionStats(statsMap);
    };

    loadStats();
  }, [course]);

  const toggleSection = (id: number) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="font-semibold">Course content</h2>
      </div>

      <div className="divide-y">
        {course.chapters.map((chapter: any, index: number) => {
          const isOpen = openSections[chapter.id] ?? index === 0;
          const stats = sectionStats[chapter.id];
          return (
            <div key={chapter.id}>
              {/* SECTION */}
              <button
                onClick={() => toggleSection(chapter.id)}
                className="w-full flex justify-between px-4 py-3 hover:bg-gray-50"
              >
                <div className="text-left">
                  <p className="font-medium">
                    Section {index + 1} : {chapter.title}
                  </p>

                  {stats && (
                    <p className="text-xs text-gray-800 mt-1">
                      {stats.completed}/{stats.total}
                      {stats.totalSeconds > 0 &&
                        ` | ${formatTotalDuration(stats.totalSeconds)}`}
                    </p>
                  )}
                </div>

                {isOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {/* LECTURES */}
              {isOpen && (
                <SectionLectures
                  chapter={chapter}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  currentLecture={currentLecture}
                  onSelectLecture={onSelectLecture}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
