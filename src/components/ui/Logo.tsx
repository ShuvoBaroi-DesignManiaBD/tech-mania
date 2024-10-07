"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
      <Image
        src="/logo.webp"
        alt="logo"
        width={160}
        height={120}
        className={`${className}`}
      />
    </Link>
  );
};
export default Logo;
