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
    <div className="relative w-28 h-28 group cursor-pointer">
      <Avatar className="w-28 h-28 border-4 border-white shadow-md">
        <AvatarImage src={preview} />
        <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      {/* 🔥 Upload Progress Overlay */}
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
          {/* SVG Circle */}
          <svg className="w-24 h-24 transform -rotate-90">
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

          {/* % Text */}
          <span className="absolute text-white text-sm font-semibold">
            {progress}%
          </span>
        </div>
      )}

      {/* Hover camera */}
      {!uploading && (
        <div
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-black/50 
          flex items-center justify-center opacity-0 
          group-hover:opacity-100 transition rounded-b-full"
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
