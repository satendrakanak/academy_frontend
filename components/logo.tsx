"use client";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-start">
      <div className="relative w-45 h-16">
        <Image
          alt="logo"
          src="/assets/unitus-logo.png"
          priority
          fill
          sizes="200px"
        />
      </div>
    </Link>
  );
};

export default Logo;
