"use client";

import WrapperContainer from "@/components/ui/shared/WrapperContainer.";
import { theme } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import dynamic from "next/dynamic";

// Dynamically import the Breadcrumb component with `ssr: false`
const Breadcrumb = dynamic(() => import("@/components/ui/Breadcrumb"), { ssr: false });

const Hero = ({ imageUrl,title, description }: { imageUrl: string, title:string, description?:string }) => {
  const { token } = theme.useToken();

  return (
    <section>
      <section
        className="relative w-full py-20 bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: imageUrl,
        }}
      >
        <WrapperContainer className="!py-0 text-center flex flex-col gap-2 justify-center items-center z-10 md:!w-1/2">
          {/* Title */}
          <Title level={1} className="text-center">
            {title}
          </Title>

          {/* Use dynamically imported Breadcrumb here */}
          <Breadcrumb style={{ marginBottom: "16px", textAlign: "center" }} />

          {/* Intro Paragraph */}
          <Paragraph className="text-center">
            {description?description:''}
          </Paragraph>
        </WrapperContainer>

        <div className="absolute inset-0" style={{ backgroundColor: token?.heroBg, opacity: 0.8 }}></div>
      </section>
    </section>
  );
};

export default Hero;
