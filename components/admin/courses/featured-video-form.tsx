"use client";

import { useState } from "react";
import { courseClientService } from "@/services/courses/course.client";
import { Course } from "@/types/course";
import { FileType } from "@/types/file";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/media/file-upload";
import { handleApiError } from "@/helper/handle-api-error";

interface FeaturedVideoFormProps {
  course: Course;
}
export const FeaturedVideoForm = ({ course }: FeaturedVideoFormProps) => {
  const [selectedVideo, setSelectedVideo] = useState<FileType | null>(null);
  const router = useRouter();
  const handleVideoUpload = async (file: FileType, alt: string) => {
    try {
      await courseClientService.update(course.id, {
        videoId: file.id,
      });

      setSelectedVideo(file);
      toast.success("Video Updated");
      router.refresh();
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <FileUpload
        label="Featured Video"
        previewType="video"
        value={selectedVideo || course.video}
        onUpload={handleVideoUpload}
        className="h-40 aspect-square"
      />
    </div>
  );
};
