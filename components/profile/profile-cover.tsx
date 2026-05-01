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
    <div className="relative h-[220px] w-full overflow-hidden rounded-[34px] border border-white/50 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.45)] md:h-[290px]">
      <Image
        src={preview || "/assets/default-cover.jpg"}
        alt="cover"
        className="h-full w-full object-cover object-top"
        width={1200}
        height={500}
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.22),rgba(30,41,59,0.08)_38%,rgba(59,130,246,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-xl text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
              Learner Space
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Your learning dashboard
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/78 md:text-base">
              Track progress, revisit purchases, and keep your profile polished
              from one clean workspace.
            </p>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="absolute top-3 right-3 group">
          <button
            onClick={() => inputRef.current?.click()}
            title="Change Cover"
            className="cursor-pointer rounded-full border border-white/25 bg-slate-950/45 p-2.5 text-white backdrop-blur transition hover:bg-slate-950/60"
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
