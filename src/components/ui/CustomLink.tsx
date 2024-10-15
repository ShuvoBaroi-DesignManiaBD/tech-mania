"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function CustomLink({ href, prefetch = true, children }:{ href:string, prefetch?:boolean, children:string|ReactNode }) {
    // const pathname = usePathname();
    // const active = pathname === href;

    return (
        <Link
            prefetch={prefetch}
            // className={active ? "text-dark-primaryTextHover" : ""}
            href={href}
        >
            {children}
        </Link>
    );
}