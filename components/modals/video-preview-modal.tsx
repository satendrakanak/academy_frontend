"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface VideoPreviewModalProps {
  videoUrl: string | null;
  title?: string;
  onClose: () => void;
}

export default function VideoPreviewModal({
  videoUrl,
  title,
  onClose,
}: VideoPreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !videoUrl) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-99999 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[92%] max-w-4xl bg-white rounded-2xl shadow-2xl border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-3 border-b bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* VIDEO */}
        <div className="bg-black">
          <video
            src={videoUrl}
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            className="w-full h-auto max-h-[70vh]"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
