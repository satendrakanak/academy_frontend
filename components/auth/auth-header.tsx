"use client";
import Logo from "@/components/logo";

interface AuthHeaderProps {
  label: string;
}

export default function AuthHeader({ label }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center mb-2">
      <Logo />
      <h1 className="text-2xl font-bold">{label}</h1>
    </div>
  );
}
