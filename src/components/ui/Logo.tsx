"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className, width=160, height=40 }: { className?: string, width?: number, height?: number }) => {
  return (
    <Link href="/">
      <Image
        src="/logo.webp"
        priority={true}
        alt="logo"
        width={width}
        height={height}
        style={{height:"auto"}}
        className={`${className}`}
      />
    </Link>
  );
};
export default Logo;
