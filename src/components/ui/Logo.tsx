"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
      <Image
        src="/logo.webp"
        priority={true}
        alt="logo"
        width={160}
        height={50}
        style={{width:"auto", height:"auto"}}
        className={`${className}`}
      />
    </Link>
  );
};
export default Logo;
