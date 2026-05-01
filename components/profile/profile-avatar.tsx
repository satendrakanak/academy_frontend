"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  avatar?: string;
  name?: string;
  onChange?: (file: File) => void;
  progress?: number;
  uploading?: boolean;
}

function getInitials(name?: string) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function ProfileAvatar({
  avatar,
  name,
  onChange,
  progress = 0,
  uploading = false,
}: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(avatar);

  const handleFileChange = (file?: File) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="group relative h-32 w-32 cursor-pointer md:h-36 md:w-36">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,#93c5fd,transparent_55%),linear-gradient(135deg,var(--brand-500),var(--brand-700))] opacity-90 blur-[2px]" />
      <Avatar className="relative h-32 w-32 border-[5px] border-white shadow-[0_24px_50px_-22px_rgba(15,23,42,0.45)] md:h-36 md:w-36">
        <AvatarImage src={preview} />
        <AvatarFallback className="bg-slate-200 text-lg font-semibold text-slate-700">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
          <svg className="h-28 w-28 -rotate-90 transform md:h-32 md:w-32">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="white"
              strokeWidth="4"
              fill="transparent"
              opacity="0.2"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="white"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-200"
            />
          </svg>

          <span className="absolute text-white text-sm font-semibold">
            {progress}%
          </span>
        </div>
      )}

      {!uploading && (
        <div
          onClick={() => inputRef.current?.click()}
          className="absolute inset-x-0 bottom-0 flex h-1/2 items-center justify-center rounded-b-full bg-slate-950/55 opacity-0 transition group-hover:opacity-100"
        >
          <Camera size={18} className="text-white" />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </div>
  );
}
