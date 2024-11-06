"use client";
import TokenProvider from '@/lib/providers/antDesign/TokenProvider';
import { Avatar, Button, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import CustomLink from '../ui/CustomLink';
import { LogoutOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, selectCurrentUser } from '@/redux/features/auth/authSlice';
import { IUser } from '@/types';
import { navigate } from '@/actions/navigate';

const MenuItems = () => {
    const dispatch = useAppDispatch();
    const currentUser: IUser | null = useAppSelector(selectCurrentUser);
    const handleLogout = async () => {
        dispatch(logout());
        await navigate("?logout=true");
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
          label: <CustomLink href="/dashboard/profile">Profile</CustomLink>,
          icon: <UserOutlined />,
        },
        {
          key: "groups",
          label: <CustomLink href="/dashboard/groups">Groups</CustomLink>, // Full text label
          icon: <TeamOutlined />,
        },
        {
          key: "settings",
          label: <CustomLink href="/dashboard/settings">Settings</CustomLink>, // Full text label
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
    return menuItems
};

export default MenuItems;