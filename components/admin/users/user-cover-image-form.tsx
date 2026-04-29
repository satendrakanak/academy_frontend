"use client";

import { useState } from "react";
import { FileType } from "@/types/file";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/media/file-upload";
import { getErrorMessage } from "@/lib/error-handler";
import { User } from "@/types/user";
import { userClientService } from "@/services/users/user.client";

interface UserCoverImageFormProps {
  user: User;
}

export const UserCoverImageForm = ({ user }: UserCoverImageFormProps) => {
  const [selectedImage, setSelectedImage] = useState<FileType | null>(null);

  const router = useRouter();
  const handleImageUpload = async (file: FileType) => {
    try {
      await userClientService.update(user.id, {
        coverImageId: file.id,
      });
      setSelectedImage(file);
      toast.success("Cover Image Updated");
      router.refresh();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <FileUpload
        label="User Cover Image"
        previewType="image"
        value={selectedImage || user.coverImage}
        onUpload={handleImageUpload}
        className="h-40"
      />
    </div>
  );
};
