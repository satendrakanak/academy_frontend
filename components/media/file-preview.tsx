"use client";

import Image from "next/image";
import { Image as ImageIcon, File, Video } from "lucide-react";
import { FileType, PreviewType } from "@/types/file";

interface FilePreviewProps {
  file?: FileType | null;
  previewType?: PreviewType;
  triggerText?: string;
  className?: string;
}

export const FilePreview = ({
  file,
  previewType = "image",
  triggerText = "Click to upload",
  className,
}: FilePreviewProps) => {
  if (!file) {
    return (
      <div className="text-xs text-muted-foreground text-center">
        {previewType === "image" && (
          <ImageIcon className="size-8 mx-auto mb-1" />
        )}
        {previewType === "video" && <Video className="size-8 mx-auto mb-1" />}
        {previewType === "file" && <File className="size-8 mx-auto mb-1" />}
        {triggerText}
      </div>
    );
  }

  if (previewType === "image") {
    return (
      <Image
        src={file.path}
        alt={file.name || "Featured Image"}
        fill
        className="object-cover w-full h-full"
        sizes="100vw"
        loading="eager"
      />
    );
  }

  if (previewType === "video") {
    return <video src={file.path} className="aspect-video w-full" controls />;
  }

  return (
    <div className="text-xs text-center">
      <File className="size-8 mx-auto mb-1" />
      {file.name}
    </div>
  );
};
