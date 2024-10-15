"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import {
  AlignRightOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCurrentTheme,
  setTheme,
} from "@/redux/features/theme/themeSlice";
import {
  setDeviceType,
  selectCurrentDevice,
} from "@/redux/features/device/deviceSlice";
import { setOffCanvasState } from "@/redux/features/ui/offCanvas/offCanvasSlice";
import CustomLink from "../ui/CustomLink";
import Logo from "../ui/Logo";
import OffCanvas from "../ui/shared/navbar/mobileNav/OffCanvas";
import { usePathname } from "next/navigation";
import dashboardTopNavItems from "../ui/shared/navbar/dashboardNav/dashboardTopNavItems copy";
import TopLoadingBar from "../ui/shared/TopLoadingBar";

const { Header: HeaderPart } = Layout;

const Header = ({ className = "" }: { className?: string }) => {
  const path = usePathname();
  const isMobile = useAppSelector(selectCurrentDevice);
  const [pathname, setPathName] = useState(path?.substring(1) || "dashboard");
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";

  useEffect(() => {
    setPathName(path?.substring(1).split("/")[1] || "dashboard");
  }, [path]);

  // Add useEffect to detect screen size and update device type
  useEffect(() => {
    // Detect screen size on the client side
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        dispatch(setDeviceType());
      }
    };

    // Initial check on component mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

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

  // Function to toggle the theme
  const toggleTheme = () => {
    dispatch(setTheme(undefined));
  };

  // User Avatar and Dropdown for desktop
  const renderUserDropdown = () => (
    <Dropdown
      menu={{ items: menuItems }}
      overlayClassName="w-[160px]"
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <Avatar
        style={{
          border: `3px solid ${token?.colorPrimary}`,
          backgroundColor: token.colorPrimary,
          fontSize: "24px",
          verticalAlign: "middle",
          width: "44px",
          height: "44px",
        }}
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
  );

  return (
    <>
      <TopLoadingBar></TopLoadingBar>
      <HeaderPart
        className={`${className} flex justify-between w-full sticky top-0 z-50 border-b shadow-sm`}
        style={{ borderColor: token?.colorBorder }}
      >
        <Space
          direction="horizontal"
          align="center"
          className="w-full flex justify-between items-center"
        >
          {/* Logo Section */}
          <Logo />

          {/* Main Navigation for Desktop */}
          {!isMobile && (
            <Menu
              mode="horizontal"
              selectedKeys={[pathname.length > 0 ? pathname : "dashboard"]}
              items={dashboardTopNavItems}
              className="hidden md:flex !border-0 !mr-5"
              style={{
                lineHeight: "inherit",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px", // Use spacing between items
              }}
            />
          )}

          {/* Action Buttons (Theme, User Profile, Off-Canvas) */}
          <div className="flex items-center justify-end gap-5 flex-grow">
            {/* Theme Toggle Button */}
            <Button
              size="small"
              type="default"
              shape="circle"
              icon={!isDark ? <MoonOutlined /> : <SunOutlined />}
              onClick={toggleTheme}
            />

            {/* User Profile Section */}
            {isMobile ? (
              <Button
                size="small"
                type="default"
                shape="circle"
                icon={<UserOutlined />}
                onClick={toggleTheme}
              />
            ) : (
              renderUserDropdown()
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
          {isMobile && <OffCanvas />}
        </Space>
      </HeaderPart>
    </>
  );
};

export default Header;
