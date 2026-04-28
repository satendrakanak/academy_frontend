"use client";

import { DashboardStats, User } from "@/types/user";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileInfo } from "./profile-info";
import { userClientService } from "@/services/users/user.client";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { FileType, UploadingFile } from "@/types/file";
import { ApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/error-handler";

interface ProfileHeaderProps {
  user: User;
  stats: DashboardStats;
  isOwner: boolean;
}

export function ProfileHeader({ user, stats, isOwner }: ProfileHeaderProps) {
  const [uploadingFile, setUploadingFile] = useState<UploadingFile | null>(
    null,
  );
  const router = useRouter();
  const handleAvatarUpload = async (file: File) => {
    try {
      // STEP 1: init
      const initRes = await fetch("/api/uploads/init", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await initRes.json();
      const { uploadId, url, fileUrl } = json.data;
      // 🔥 STEP 2: upload to S3 (REAL progress)
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );

          setUploadingFile((prev) =>
            prev ? { ...prev, progress: percent } : prev,
          );
        },
      });

      // STEP 3: confirm
      const confirmRes = await fetch(`/api/uploads/confirm/${uploadId}`, {
        method: "POST",
        credentials: "include",
      });

      const confirmJson: ApiResponse<FileType> = await confirmRes.json();

      const newMedia = confirmJson.data;

      // STEP 4: update avatar
      await userClientService.updateUser({
        avatarId: newMedia.id,
      });
      router.refresh();
      toast.success("Avatar updated");
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };
  return (
    <div className="-mt-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ProfileAvatar
          avatar={user.avatar?.path}
          name={`${user.firstName} ${user.lastName || ""}`}
          onChange={handleAvatarUpload}
          uploading={!!uploadingFile}
          progress={uploadingFile?.progress || 0}
        />
        <ProfileInfo
          name={user.firstName + " " + user.lastName}
          email={user.email}
          stats={stats}
        />
      </div>
    </div>
  );
}
