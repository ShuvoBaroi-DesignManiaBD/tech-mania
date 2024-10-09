"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { AlignRightOutlined, MoonOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentTheme, setTheme } from "@/redux/features/theme/themeSlice";
import { selectCurrentDevice } from "@/redux/features/device/deviceSlice";
import { setOffCanvasState } from "@/redux/features/ui/offCanvas/offCanvasSlice";
import CustomLink from "../ui/CustomLink";
import Logo from "../ui/Logo";
import MainNavItems from "../ui/shared/navbar/mainNav/MainNavItems";
import OffCanvas from "../ui/shared/navbar/mobileNav/OffCanvas";
import { usePathname } from "next/navigation";

const { Header: HeaderPart } = Layout;

const Header = ({className=''}:{className?:string}) => {
  const path = usePathname();
  const isMobile = useAppSelector(selectCurrentDevice);
  const [pathname, setPathName] = useState(path?.substring(1) || "home");
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";

  useEffect(() => {
    setPathName(path?.substring(1) || "home");
  }, [path]);

  const menuItems = [
    {
      key: "home",
      label: <CustomLink href="/">Home</CustomLink>,
    },
    {
      key: "about",
      label: <CustomLink href="/about">About</CustomLink>,
    },
    {
      key: "contact",
      label: <CustomLink href="/contact">Contact Us</CustomLink>, // Full text label
    },
  ];

  const { token } = theme.useToken();

  return (
    <HeaderPart className={`${className} flex justify-between !w-[100vw] sticky border-b-[1px] top-0 z-50 shadow-sm`} style={{borderColor: token?.colorBorder}}>
      <Space direction="horizontal" align="center" className="!w-full flex justify-between items-center">
        {/* Logo Section */}
        <Logo />

        {/* Main Navigation and Action Buttons */}
        <div className="flex items-center justify-end gap-5 flex-grow">
          {/* Desktop Navigation Menu */}
          {!isMobile && (
            <Menu
              mode="horizontal"
              selectedKeys={[pathname && pathname.length > 0 ? pathname : "home"]}
            items={MainNavItems}
            className="md:!flex !border-0 !mr-5 !hidden"
            style={{
              lineHeight: "inherit",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px", // Use spacing between items
            }}
            />
          )}

          {/* Theme Toggle Button */}
          <Button
            size="small"
            type="default"
            shape="circle"
            icon={!isDark ? <MoonOutlined /> : <SunOutlined />}
            onClick={() => dispatch(setTheme(""))}
          />

          {/* User Profile Section */}
          {isMobile ? (
            // Show User Icon in Mobile View
            <Button
              size="small"
              type="default"
              shape="circle"
              icon={<UserOutlined />}
              onClick={() => dispatch(setTheme(""))}
            />
          ) : (
            // Show Avatar Dropdown in Desktop View
            <Dropdown
              menu={{ items: menuItems }}
              overlayClassName="w-[160px]"
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <Avatar
                style={{ border: `3px solid ${token?.colorPrimary}`, backgroundColor: token.colorPrimary, fontSize: "24px", verticalAlign: "middle", width: "48px" }}
                src={
                  <Image
                    src="https://i.ibb.co/4JRDX8Z/profile-pic-4.webp"
                    alt="profile_photo"
                    width={48}
                    height={48}
                  />
                }
              >
                S
              </Avatar>
            </Dropdown>
          )}

          {/* Off-Canvas Button for Mobile Navigation */}
          {isMobile && (
            <Button
              size="small"
              type="default"
              shape="circle"
              icon={<AlignRightOutlined />}
              onClick={() => dispatch(setOffCanvasState())}
            />
          )}
        </div>

        {/* Mobile OffCanvas Navigation */}
        <OffCanvas />
      </Space>
    </HeaderPart>
  );
};

export default Header;
