"use client";
import { Button, Layout, Menu, Space } from "antd";
import Logo from "../Logo";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import CustomLink from "../CustomLink";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentTheme, setTheme } from "@/redux/features/theme/themeSlice";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
const { Header: HeaderPart } = Layout;

const Header = () => {
  const path = usePathname();
  const [pathname, setPathName] = useState(path?.substring(1));

  useEffect(() => {
    // Update pathname whenever the route changes
    setPathName(path?.substring(1));
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
  ];

  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";

  return (
    <HeaderPart className="flex justify-between !w-[100vw] !px-5">
      <Space
        direction="horizontal"
        align="center"
        className="!w-full flex justify-between items-center !max-w-screen-xl mx-auto"
      >
        <Logo />
        <div className="flex items-center justify-end gap-5 flex-grow">
          <Menu
            mode="inline" // Set the menu mode to horizontal
            selectedKeys={[pathname && pathname.length > 0 ? pathname : "home"]} // Dynamically update selected key
            items={menuItems}
            className="md:!flex !border-0 !mr-5 [&&_li]:!px-4 [&&_li]:!h-10 hidden"
          />
          <Button
            size="small"
            type="default"
            shape="circle"
            icon={!isDark ? <MoonOutlined /> : <SunOutlined />}
            onClick={() => dispatch(setTheme(""))}
          />
          <Button type="primary" size="middle" className="!text-sm">
            Login/register
          </Button>
        </div>
      </Space>
    </HeaderPart>
  );
};

export default Header;
