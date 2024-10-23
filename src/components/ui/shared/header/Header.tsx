"use client";
import { Layout, Menu, Space } from "antd";
import Logo from "../../Logo";
import {
  AlignRightOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCurrentTheme,
  setTheme,
} from "@/redux/features/theme/themeSlice";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  selectCurrentDevice,
  setDeviceType,
} from "@/redux/features/device/deviceSlice";
import MainNavItems from "../navbar/mainNav/MainNavItems";
import OffCanvas from "../navbar/mobileNav/OffCanvas";
import { setOffCanvasState } from "@/redux/features/ui/offCanvas/offCanvasSlice";
import TopLoadingBar from "../TopLoadingBar";
import Button from "../../button/Button";
const { Header: HeaderPart } = Layout;

const Header = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const isMobile = useAppSelector(selectCurrentDevice);

  const [pathname, setPathName] = useState(path?.substring(1));

  useEffect(() => {
    setPathName(path?.substring(1));
  }, [path]);

  useEffect(() => {
    setPathName(path?.substring(1));
  }, [path]);

  // Detect screen size and update device type
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        dispatch(setDeviceType());
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  // const menuItems = [
  //   {
  //     key: "home",
  //     label: <CustomLink href="/">Home</CustomLink>,
  //   },
  //   {
  //     key: "about",
  //     label: <CustomLink href="/about">About</CustomLink>,
  //   },
  //   {
  //     key: "contact",
  //     label: <CustomLink href="/contact">Contact Us</CustomLink>, // Full text label
  //   },
  // ];

  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";

  return (
    <>
    <TopLoadingBar />
    
    <HeaderPart className="flex justify-between !max-w-[100vw] !px-5 sticky top-0 z-50 shadow-sm">
      <Space
        direction="horizontal"
        align="center"
        className="!w-full flex justify-between items-center !max-w-screen-xl mx-auto"
      >
        <Logo />
        <div className="flex items-center justify-end gap-5 flex-grow">
          <Menu
            mode="horizontal" // Set the menu mode to horizontal
            selectedKeys={[pathname && pathname.length > 0 ? pathname : "home"]}
            items={MainNavItems}
            className="md:!flex !border-0 !mr-5 !hidden"
            style={{
              lineHeight: "inherit",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px", // Use spacing between items
            }}
            // Ensure no padding is added to the list items
          />
          <Button
            size="small"
            type="default"
            shape="circle"
            icon={!isDark ? <MoonOutlined /> : <SunOutlined />}
            onClick={() => dispatch(setTheme(undefined))}
          />
          {isMobile && isMobile ? (
            <Button
              size="small"
              type="default"
              shape="circle"
              icon={<UserOutlined></UserOutlined>}
              onClick={() => dispatch(setTheme(undefined))}
            />
          ) : (
            <Button href="/login" type="primary" size="middle" className="!text-sm">
              Login/register
            </Button>
          )}
          {isMobile && (
            <Button
              size="small"
              type="default"
              shape="circle"
              icon={<AlignRightOutlined />}
              onClick={() => dispatch(setOffCanvasState())}
            />
          )}
          <OffCanvas></OffCanvas>
        </div>
      </Space>
    </HeaderPart>
    </>
  );
};

export default Header;
