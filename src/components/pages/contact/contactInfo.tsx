"use client";
import WrapperContainer from "@/components/ui/shared/WrapperContainer.";
import {
  EnvironmentOutlined,
  FacebookFilled,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { theme, Tooltip, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const ContactInfo = () => {
  const { token } = theme.useToken();
  return (
    <WrapperContainer>
      <section className="flex flex-col-reverse md:flex-row flex-wrap md:flex-nowrap gap-10 justify-center items-stretch">
        {/* Contact Info */}
        <div
          style={{ backgroundColor: token.homeHeroBg }}
          className="w-full md:w-2/6 space-y-5 flex-grow bg-primary text-white rounded-md p-12"
        >
          <Title
            level={2}
            className="text-2xl md:text-3xl font-semibold text-white mb-4"
          >
            Contact Information
          </Title>
          <div className="flex items-center">
            <PhoneOutlined className="text-lg mr-2" style={{color:token?.colorTextHeading}}/>
            <Typography.Text className="text-base">
              +1 234 567 890
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <MailOutlined className="text-lg text-secondaryLight mr-2" style={{color:token?.colorTextHeading}}/>
            <Typography.Text className="text-base">
              info@example.com
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <EnvironmentOutlined className="text-lg text-secondaryLight mr-2" style={{color:token?.colorTextHeading}}/>
            <Typography.Text className="text-base">
              123 Main Street, Cityville, USA
            </Typography.Text>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 pt-10">
            <Tooltip title="Twitter">
              <Link href="https://twitter.com">
                <TwitterOutlined className="text-2xl text-secondary hover:text-secondaryLight cursor-pointer" />
              </Link>
            </Tooltip>
            <Tooltip title="Facebook">
              <Link href="https://facebook.com">
                <FacebookFilled className="text-2xl text-secondary hover:text-secondaryLight cursor-pointer" />
              </Link>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <Link href="https://linkedin.com">
                <LinkedinOutlined
                  className="text-2xl text-secondary hover:text-secondaryLight cursor-pointer"
                  href="https://linkedin.com"
                />
              </Link>
            </Tooltip>
          </div>
        </div>

        {/* Map */}
        <div className="w-full md:w-4/6 flex-grow">
          <iframe
            title="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58377.12978369251!2d90.22020857163918!3d23.869376660334947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd3d6df9569%3A0x277b3819d4da3e91!2sSavar%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1727510033323!5m2!1sen!2sus"
            width="100%"
            // height="500"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="rounded-md shadow-md h-[300px] md:h-[500px]"
          ></iframe>
        </div>
      </section>
    </WrapperContainer>
  );
};

export default ContactInfo;
