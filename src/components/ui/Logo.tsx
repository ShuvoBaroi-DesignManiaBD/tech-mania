"use client";
import Image from 'next/image';
import React from 'react';

const Logo = ({className}:{className?: string}) => {
    return <Image src="/logo.webp" alt="logo" width={160} height={80} className={`${className}`}/>
}
export default Logo;