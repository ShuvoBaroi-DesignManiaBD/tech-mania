"use client";
import React, { useEffect, useState } from "react";
import {
  Button as AntButton,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
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
import {
  setDeviceType,
  selectCurrentDevice,
} from "@/redux/features/device/deviceSlice";
import { setOffCanvasState } from "@/redux/features/ui/offCanvas/offCanvasSlice";
import Logo from "../ui/Logo";
import OffCanvas from "../ui/shared/navbar/mobileNav/OffCanvas";
import { usePathname } from "next/navigation";
import dashboardTopNavItems from "../ui/shared/navbar/dashboardNav/dashboardTopNavItems";
import TopLoadingBar from "../ui/shared/TopLoadingBar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/types";
import UserDropdown from "../ui/dropdowns/UserDropdown";
import MenuItems from "./MenuItems";
import { navigate } from "@/actions/navigate";

const { Header: HeaderPart } = Layout;

const Header = ({ className = "" }: { className?: string }) => {
  const path = usePathname();
  const isMobile = useAppSelector(selectCurrentDevice);
  const currentUser: IUser | null = useAppSelector(selectCurrentUser);
  console.log(currentUser?.name[0].toUpperCase());
  
  const [pathname, setPathName] = useState(path?.substring(1) || "dashboard");
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";
  console.log(currentUser);

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

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("?logout=true");
  // }

  // const menuItems = [
  //   {
  //     key: "user-info",
  //     label: (
  //       <div
  //         className="flex items-center justify-start gap-3 p-3 shadow-sm !border-0 !rounded-none"
  //         style={{borderColor: TokenProvider().colorBorder}}
  //       >
  //         <Avatar size={52} src={currentUser?.profilePicture} />
  //         <div className="flex flex-col !gap-0">
  //           <Title level={5} className="mb-0 !text-[15px] !leading-[15px]" style={{color: TokenProvider().colorText}}>
  //             {currentUser?.name}
  //           </Title>
  //           <Typography.Text type="secondary" className="!text-sm">
  //            {currentUser?.email}
  //           </Typography.Text>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     key: "profile",
  //     label: <CustomLink href="/profile">Profile</CustomLink>,
  //     icon: <UserOutlined />,
  //   },
  //   {
  //     key: "groups",
  //     label: <CustomLink href="/groups">Groups</CustomLink>, // Full text label
  //     icon: <TeamOutlined />,
  //   },
  //   {
  //     key: "settings",
  //     label: <CustomLink href="/settings">Settings</CustomLink>, // Full text label
  //     icon: <SettingOutlined />,
  //   },
  //   {
  //     key: "logout",
  //     label: (
  //       <Button
  //         color="danger"
  //         onClick={() => handleLogout()}
  //         className="w-full !bg-red-500 border-0 hover:border-0 hover:!text-white"
  //         icon={<LogoutOutlined />}
  //       >
  //         Logout
  //       </Button>
  //     ), // Full text label
  //   },
  // ];

  const { token } = theme.useToken();

  // Function to toggle the theme
  const toggleTheme = () => {
    dispatch(setTheme(undefined));
  };


  return (
    <>
      <TopLoadingBar></TopLoadingBar>
      <HeaderPart
        className={`${className} flex justify-between w-full sticky top-0 z-50 border-b shadow-sm !px-8`}
        style={{ borderColor: token?.colorBorder }}
      >
        <Space
          direction="horizontal"
          align="center"
          className="w-full flex justify-between items-center"
        >
          {/* Logo Section */}
          <Logo width={180} height={40} />

          {/* Main Navigation for Desktop */}
          {!isMobile && !path.includes("/admin") && (
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
            <AntButton
              size="small"
              type="default"
              shape="circle"
              icon={!isDark ? <MoonOutlined /> : <SunOutlined />}
              onClick={toggleTheme}
            />

            {/* User Profile Section */}
            {!currentUser ? (
              <AntButton
                size="small"
                type="default"
                shape="circle"
                icon={<UserOutlined />}
                onClick={() => navigate("/login")}
              />
            ) : (
              <UserDropdown></UserDropdown>
            )}

            {/* Off-Canvas Button for Mobile Navigation */}
            {isMobile && (
              <AntButton
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
