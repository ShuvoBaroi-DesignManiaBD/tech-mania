"use client";

import { Divider, Layout, theme, Typography } from "antd";
import Link from "next/link";
import Logo from "../Logo";
import Title from "antd/es/typography/Title";
import useToken from "antd/es/theme/useToken";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentTheme } from "@/redux/features/theme/themeSlice";
import { FacebookFilled, GithubFilled, InstagramFilled, InstagramOutlined, LinkedinFilled, TwitterOutlined } from "@ant-design/icons";

const { Footer:FooterPart } = Layout;
const Footer = ({ className }: {className?:string}) => {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";
    const {
      token
    } = theme.useToken();
  console.log(token);
  
  return (
    <FooterPart className={`${className}`}>
      <div className="container max-w-screen-xl mx-auto text-text text-center sm:text-left pt-20">
        <div className="mx-auto">
          {/* =========== Top Part =========== */}
          <div className="grid grid-cols-1 justify-items-center sm:justify-items-start sm:grid-cols-8 sm:gap-4 sm:justify-between sm:items-stretch pb-20">
            <div className="sm:max-w-[60%] md:max-w-[70%] mb-20 sm:mb-0 sm:col-span-4 sm:pr-20 space-y-6">
              <Logo className="!mb-5 m-auto sm:m-0"></Logo>
              <Typography.Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit ipsa officia dolores ab autem. Animi dolorum tempore sed dignissimos praesentium quidem magnam</Typography.Text>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 sm:col-span-4">
              <div>
                <Title level={5} className="!mb-5 !text-base font-semibold uppercase">
                  Quick Links
                </Title>
                <ul>
                  <li className="mb-4">
                    <Link
                      href="/"
                    >
                      <Typography style={{color:!isDark ? token.colorText:'', fontWeight:400}}>Home</Typography>
                      
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                    >
                       <Typography style={{color:!isDark ? token.colorText:'', fontWeight:400}}>About</Typography>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
              <Title level={5} className="!mb-5 !text-base font-semibold uppercase">
              Follow us
                </Title>
                <ul className="">
                  <li className="mb-4">
                    <Link
                      href="/"
                    >
                       <Typography style={{color:!isDark ? token.colorText:'', fontWeight:400}}>Github</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                    >
                       <Typography style={{color:!isDark ? token.colorText:'', fontWeight:400}}>Discord</Typography>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
              <Title level={5} className="!mb-5 !text-base font-semibold uppercase">Legal</Title>
                <ul className="">
                  <li className="mb-4">
                    <Link
                      href="/"
                    >
                       <Typography style={{color:!isDark ? token.colorText:'', fontWeight:400}}>Privacy Policy</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                    >
                       <Typography style={{color:!isDark ? token.colorText:'', fontWeight:400}}>Terms &amp; Conditions</Typography>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Divider />
          {/* =========== Bottom Part ============ */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm sm:text-center">
              Copyright
              © {new Date(Date.now()).getFullYear()}{" "}
              <Link
                href="/"
              >
                Tech Mania
              </Link>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 justify-center sm:mt-0">
              <Link
                href="/"
              >
                <FacebookFilled></FacebookFilled>
              </Link>
              <Link
                href="/"
              >
                <InstagramOutlined></InstagramOutlined>
              </Link>
              <Link
                href="/"
              >
                <TwitterOutlined></TwitterOutlined>
              </Link>
              <Link
                href="/"
              >
                <GithubFilled></GithubFilled>
              </Link>
              <Link
                href="/"
              >
                <LinkedinFilled></LinkedinFilled>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FooterPart>
  );
};

export default Footer;
