"use client";
import { ReactNode } from "react";

const WrapperContainer = ({className='', children}:{className?:string, children:ReactNode}) => {
    
    return (
        <section className={`max-w-screen-xl min-h-[60vh] py-12 md:py-20 mx-auto ${className}`}>
            {children}
        </section>
    );
};

export default WrapperContainer;