"use client";
import { Layout, Menu, Space, Button as AntButton, Avatar, Typography } from "antd";
import Logo from "../../Logo";
import {
  AlignRightOutlined,
  LogoutOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  TeamOutlined,
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
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import verifyToken from "@/utils/verifyToken";
import UserDropdown from "../../dropdowns/UserDropdown";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { navigate } from "@/actions/navigate";
import Title from "antd/es/typography/Title";
import CustomLink from "../../CustomLink";
const { Header: HeaderPart } = Layout;

const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const verifiedToken = token ? verifyToken(token) : null;
  console.log(verifiedToken, "veryToken");
  
  const path = usePathname();
  const profilePhoto = currentUser?.profilePicture ||
    currentUser?.name[0].toUpperCase() || <UserOutlined />;
  const isMobile = useAppSelector(selectCurrentDevice);

  const [pathname, setPathName] = useState(path?.substring(1));

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
  const handleLogout = async () => {
    dispatch(logout());
    await navigate("/login?logout=true");
  }
const menuItems = [
    {
      key: "user-info",
      label: (
        <div
          className="flex items-center justify-start gap-3 p-3 shadow-sm !border-0 !rounded-none"
          style={{borderColor: TokenProvider().colorBorder}}
        >
          <Avatar size={52} src={currentUser?.profilePicture} />
          <div className="flex flex-col !gap-0">
            <Title level={5} className="mb-0 !text-[15px] !leading-[15px]" style={{color: TokenProvider().colorText}}>
              {currentUser?.name}
            </Title>
            <Typography.Text type="secondary" className="!text-sm">
             {currentUser?.email}
            </Typography.Text>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      label: <CustomLink href="/user/profile">Profile</CustomLink>,
      icon: <UserOutlined />,
    },
    {
      key: "groups",
      label: <CustomLink href="/user/groups">Groups</CustomLink>, // Full text label
      icon: <TeamOutlined />,
    },
    {
      key: "settings",
      label: <CustomLink href="/user/settings">Settings</CustomLink>, // Full text label
      icon: <SettingOutlined />,
    },
    {
      key: "logout",
      label: (
        <Button
          color="danger"
          onClick={handleLogout}
          className="w-full !bg-red-500 border-0 hover:border-0 hover:!text-white"
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      ), // Full text label
    },
  ];

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
            {!isMobile && (
              <Menu
                mode="horizontal" // Set the menu mode to horizontal
                selectedKeys={[
                  pathname && pathname.length > 0 ? pathname : "home",
                ]}
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
            )}
          </div>
          <div className="flex items-center justify-end gap-5 flex-grow">
            <Button
              size="small"
              type="default"
              shape="circle"
              icon={!isDark ? <MoonOutlined /> : <SunOutlined />}
              onClick={() => dispatch(setTheme(undefined))}
            />
            {/* User Profile Section */}
            {currentUser ? (
              <UserDropdown
              ></UserDropdown>
            ) : (
              <Button
                href="/login"
                type="primary"
                size="middle"
                className="!text-sm"
              >
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
