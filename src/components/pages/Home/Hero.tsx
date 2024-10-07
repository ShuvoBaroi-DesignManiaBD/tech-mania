import { theme, Typography } from "antd";
import Image from "next/image";
import WrapperContainer from "../../ui/shared/WrapperContainer.";
import Title from "antd/es/typography/Title";
import Button from "@/components/ui/button/Button";

const Hero = () => {
  const { token } = theme.useToken();
  return (
    <div style={{backgroundColor:token?.colorPrimaryBg}}>
    <WrapperContainer>
      {/* Container for content */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-10 md:gap-40 text-center md:text-left">
        {/* Left Side: Text Content */}
        <div className="flex flex-col justify-center items-center gap-4 md:items-start self-center">
          {/* Subtitle */}
          <Typography.Text className="!text-base !w-3/5 md:!w-3/5 md:!mr-20 font-semibold">
            Discover expert tips, tricks, and tutorials to master the digital
            world.
          </Typography.Text>

          {/* Title */}
          <Title
            level={1}
            className="!font-extrabold lg:text-5xl text-gray-800 !leading-10 !my-0"
          >
            Empower Your Tech Journey with Us!
          </Title>

          {/* Description */}
          <Typography.Text className="!w-4/5 md:!w-4/5 text-base lg:text-lg mb-4">
            Whether you're a novice tech enthusiast or a seasoned professional,
            our platform offers everything you need to stay ahead in the tech
            game. From in-depth tutorials to quick tips and industry news, we’ve
            got you covered.
          </Typography.Text>

          {/* Call to Action Button */}
          <Button type="primary" size="middle" href="/about">
            Get Started Today
          </Button>
          
        </div>

        {/* Right Side: Image */}
        <div className="text-end">
          <Image
            src="https://socialv.iqonic.design/wp-content/uploads/2023/03/Group-36648.png" // Replace with the path to your image
            alt="Hero Section Image"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </WrapperContainer>
    </div>
  );
};

export default Hero;
