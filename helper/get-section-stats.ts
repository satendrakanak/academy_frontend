import { Lecture } from "@/types/lecture";

/**
 * 🎥 get video duration
 */
const getVideoDuration = (url: string): Promise<number> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");

    video.src = url;
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      resolve(video.duration || 0);
    };

    video.onerror = () => resolve(0);
  });
};

/**
 * 📊 Section Stats (ASYNC)
 */
export const getSectionStats = async (lectures: Lecture[]) => {
  if (!lectures || lectures.length === 0) {
    return {
      total: 0,
      completed: 0,
      totalSeconds: 0,
    };
  }

  let total = lectures.length;
  let completed = 0;

  // 🔥 parallel duration calculation
  const durations = await Promise.all(
    lectures.map(async (lecture) => {
      if (lecture.progress?.isCompleted) {
        completed++;
      }

      if (lecture.video?.path) {
        return await getVideoDuration(lecture.video.path);
      }

      return 0;
    }),
  );

  const totalSeconds = durations.reduce((a, b) => a + b, 0);

  return { total, completed, totalSeconds };
};
