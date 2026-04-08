import Image from "next/image";

interface FormImageProps {
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
}

export default function FormImage({
  imageUrl,
  alt,
  width,
  height,
}: FormImageProps) {
  return (
    <div className="relative hidden bg-muted md:block">
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  );
}
