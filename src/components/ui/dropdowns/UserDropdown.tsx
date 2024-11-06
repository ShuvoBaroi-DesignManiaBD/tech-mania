"use client";
import { navigate } from "@/actions/navigate";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { logout, selectCurrentUserData } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types";
import { Avatar, Button, Dropdown, Typography } from "antd";
import Title from "antd/es/typography/Title";
import CustomLink from "../CustomLink";
import { LogoutOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

const UserDropdown = () => {
    const dispatch = useAppDispatch();
    const currentUser: IUser | null = useAppSelector(selectCurrentUserData);
    const profilePhoto = currentUser?.profilePicture;
    const fallbackInitial = currentUser?.name ? currentUser.name[0].toUpperCase() : null;
  
    const handleLogout = async () => {
        dispatch(logout());
        await navigate("/login?logout=true");
    };
  
    const menuItems = [
        {
          key: "user-info",
          label: (
            <div
              className="flex items-center justify-start gap-3 p-1 shadow-sm !border-0 !rounded-none"
              style={{borderColor: TokenProvider().colorBorder}}
            >
              <Avatar size={46} src={profilePhoto} icon={!profilePhoto && !fallbackInitial && <UserOutlined />}>
                {profilePhoto ? null : fallbackInitial}
              </Avatar>
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
          label: <CustomLink href="/user/groups">Groups</CustomLink>, 
          icon: <TeamOutlined />,
        },
        {
          key: "settings",
          label: <CustomLink href="/user/settings">Settings</CustomLink>, 
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
          ), 
        },
      ];

    return (
        <Dropdown
      menu={{ items: menuItems }}
      overlayClassName="max-w-content"
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <Avatar
        style={{
          border: `3px solid ${TokenProvider()?.colorPrimary}`,
          backgroundColor: TokenProvider().colorPrimary,
          fontSize: "24px",
          verticalAlign: "middle",
          width: "44px",
          height: "44px",
          cursor: "pointer",
        }}
        src={profilePhoto}
        icon={!profilePhoto && !fallbackInitial && <UserOutlined />}
      >
        {profilePhoto ? null : fallbackInitial}
      </Avatar>
    </Dropdown>
    );
};

export default UserDropdown;
