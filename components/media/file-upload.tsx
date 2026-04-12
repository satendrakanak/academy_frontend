"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileType, PreviewType } from "@/types/file";
import { cn } from "@/lib/utils";
import { MediaModal } from "@/components/media/media-modal";
import { FilePreview } from "./file-preview";

interface FileUploadProps {
  value?: FileType | null;
  onUpload: (file: FileType) => Promise<void> | void;
  label?: string;
  previewType?: PreviewType;
  disabled?: boolean;
}

export const FileUpload = ({
  value,
  onUpload,
  label,
  previewType = "image",
  disabled,
}: FileUploadProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (file: FileType) => {
    try {
      setLoading(true);
      await onUpload(file);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="space-y-3">
      {label && <h3 className="text-sm font-semibold">{label}</h3>}

      <div
        onClick={!disabled ? () => setOpen(true) : undefined}
        className={cn(
          "relative h-40 w-full border rounded-md flex items-center justify-center overflow-hidden cursor-pointer",
          !disabled && "hover:bg-muted",
        )}
      >
        {loading && (
          <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
            <Loader className="size-4 animate-spin" />
          </div>
        )}

        <FilePreview file={value} previewType={previewType} />
      </div>

      {value && (
        <Button
          type="button"
          size="sm"
          className="w-full text-xs"
          onClick={() => setOpen(true)}
        >
          Change{" "}
          {previewType === "image"
            ? "image"
            : previewType === "video"
              ? "video"
              : "file"}
        </Button>
      )}

      <MediaModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelect}
        previewType={previewType}
      />
    </div>
  );
};
