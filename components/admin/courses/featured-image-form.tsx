"use client";

import { useState } from "react";
import { courseClientService } from "@/services/courses/course.client";
import { Course } from "@/types/course";
import { FileType } from "@/types/file";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/media/file-upload";
import { handleApiError } from "@/helper/handle-api-error";

interface FeaturedImageFormProps {
  course: Course;
}
export const FeaturedImageForm = ({ course }: FeaturedImageFormProps) => {
  const [selectedImage, setSelectedImage] = useState<FileType | null>(null);
  const router = useRouter();
  const handleImageUpload = async (file: FileType) => {
    try {
      await courseClientService.update(course.id, {
        imageId: file.id,
        imageAlt: file.name || "",
      });

      setSelectedImage(file);
      toast.success("Image Updated");
      router.refresh();
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <FileUpload
        label="Featured Image"
        previewType="image"
        value={selectedImage || course.image}
        onUpload={handleImageUpload}
      />
    </div>
  );
};
