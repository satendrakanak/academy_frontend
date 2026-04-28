"use client";

import { useState } from "react";
import { FileType } from "@/types/file";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/media/file-upload";
import { getErrorMessage } from "@/lib/error-handler";
import { User } from "@/types/user";
import { userClientService } from "@/services/users/user.client";

interface UserAvatarImageFormProps {
  user: User;
}

export const UserAvatarImageForm = ({ user }: UserAvatarImageFormProps) => {
  const [selectedImage, setSelectedImage] = useState<FileType | null>(null);

  const router = useRouter();
  const handleImageUpload = async (file: FileType) => {
    try {
      await userClientService.update(user.id, {
        avatarId: file.id,
      });
      setSelectedImage(file);
      toast.success("Image Updated");
      router.refresh();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <FileUpload
        label="User Avatar"
        previewType="image"
        value={selectedImage || user.avatar}
        onUpload={handleImageUpload}
        className="h-40"
      />
    </div>
  );
};
