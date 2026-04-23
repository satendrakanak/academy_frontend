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
          width={250}
          height={60}
        />
      </div>
    </Link>
  );
};

export default Logo;
