import { PreviewType } from "@/types/file";

export const getFileType = (mime: string): PreviewType => {
  if (mime.startsWith("image")) return "image";
  if (mime.startsWith("video")) return "video";
  return "file";
};

export const getAltFromFileName = (name: string) => {
  return name.replace(/\.[^/.]+$/, ""); // 🔥 remove extension
};
