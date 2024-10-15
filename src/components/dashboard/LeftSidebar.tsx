"use client";
import { Avatar, Menu, theme, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import dashboardNavItems from "../ui/shared/navbar/dashboardNav/dashboardLeftSideNavItems";

/**
 * A LeftSidebar component for the dashboard layout.
 *
 * This component will render a fixed left sidebar with a navigation menu and
 * a user profile card at the bottom.
 *
 * @returns A React component for the left sidebar of the dashboard layout.
 */
const LeftSidebar = () => {
  const { token } = theme.useToken();
  return (
    <div>
      {/* Left Sidebar */}
      <Sider
        width={250}
        className="!h-[calc(100vh-80px)] left-0 bottom-0 z-40 border-r shadow-sm overflow-hidden"
        style={{
          backgroundColor: token?.colorBgContainer,
          borderColor: token?.colorBorder,
        }}
      >
        <div className="px-4 py-8">
          {/* <Logo></Logo> */}
          {/* Navigation Menu */}
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={dashboardNavItems}
            className="!border-0"
            style={{ border: 0 }}
          />
        </div>
        {/* User Profile Card */}
        <div
          className="absolute bottom-4 left-4 w-[90%] flex items-center justify-start gap-3 p-3 border-t shadow-sm rounded-lg"
          style={{ backgroundColor: token?.colorPrimaryBg }}
        >
          <Avatar size={52} src="https://via.placeholder.com/150" />
          <div className="flex flex-col !gap-0">
            <Title level={5} className="mb-0 !text-[15px] !leading-[15px]">
              John Doe
            </Title>
            <Typography.Text type="secondary" className="!text-sm">
              @johndoe
            </Typography.Text>
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default LeftSidebar;
