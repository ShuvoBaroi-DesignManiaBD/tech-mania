"use client";
import { ReactNode } from "react";

const WrapperContainer = ({className='', style={}, children}:{className?:string, style?:object,children:ReactNode}) => {
    
    return (
        <section className={`max-w-screen-xl px-5 md:px-0 py-12 md:py-20 mx-auto ${className}`} style={style}>
            {children}
        </section>
    );
};

export default WrapperContainer;