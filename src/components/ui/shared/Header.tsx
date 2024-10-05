"use client";
import { Button, Layout, Menu, Space } from "antd";
import Logo from "../Logo";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCurrentTheme,
  setTheme,
} from "@/redux/features/theme/themeSlice";
const { Header: HeaderPart } = Layout;

const menuItems = [
  {
    key: "home",
    label: (
      <Link rel="home" href="/">
        Home
      </Link>
    ),
  },
  {
    key: "about",
    label: (
      <Link rel="about" href="/about">
        About
      </Link>
    ),
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";

  // const items: MenuProps["items"] = [
  //   {
  //     key: 1,
  //     label: (
  //       <span
  //         rel="light"
  //         onClick={() => (isDark ? dispatch(setTheme("")) : "")}
  //       >
  //         Light
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 2,
  //     label: (
  //       <span
  //         rel="dark"
  //         onClick={() => (!isDark ? dispatch(setTheme("")) : "")}
  //       >
  //         Dark
  //       </span>
  //     ),
  //   },
  // ];
  return (
    <HeaderPart className="flex justify-between max-w-[100vw]">
      <Space
        direction="horizontal"
        align="center"
        className="w-full flex justify-between items-center !max-w-screen-xl mx-auto"
      >
        <Logo></Logo>
        <div className="flex items-center justify-end gap-5 flex-grow">
          <Menu
            mode="inline"
            defaultSelectedKeys={["about"]}
            items={menuItems}
            className="md:!flex !border-0 !mr-5 [&&_li]:!px-4 [&&_li]:!h-10"
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
