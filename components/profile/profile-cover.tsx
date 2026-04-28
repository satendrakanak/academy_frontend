"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { userClientService } from "@/services/users/user.client";
import Image from "next/image";
import { getErrorMessage } from "@/lib/error-handler";

interface ProfileCoverProps {
  coverImage?: string;
  isOwner?: boolean;
}

export function ProfileCover({ coverImage, isOwner }: ProfileCoverProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(coverImage);

  const handleUpload = async (file: File) => {
    try {
      setPreview(URL.createObjectURL(file));

      const initRes = await fetch("/api/uploads/init", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await initRes.json();
      const { uploadId, url } = json.data;

      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
      });

      const confirmRes = await fetch(`/api/uploads/confirm/${uploadId}`, {
        method: "POST",
        credentials: "include",
      });

      const confirmJson = await confirmRes.json();
      const newFile = confirmJson.data;

      await userClientService.updateUser({
        coverImageId: newFile.id,
      });

      toast.success("Cover picture updated");
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return (
    <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden">
      {/* IMAGE */}
      <Image
        src={preview || "/assets/default-cover.jpg"}
        alt="cover"
        className="w-full h-full object-cover object-top"
        width={1200}
        height={500}
      />

      {/* subtle overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CAMERA BUTTON */}
      {isOwner && (
        <div className="absolute top-3 right-3 group">
          <button
            onClick={() => inputRef.current?.click()}
            title="Change Cover"
            className="bg-black/60  text-white p-2 rounded-full cursor-pointer transition"
          >
            <Camera size={18} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
    </div>
  );
}
