"use client";
import { Button, Card, Menu, theme, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import dashboardNavItems from "../ui/shared/navbar/dashboardNav/dashboardLeftSideNavItems";
// import { useAppSelector } from "@/redux/hooks"; // Assuming you use Redux to get the subscription info
// import { selectCurrentUser } from "@/redux/features/auth/authSlice";

/**
 * A LeftSidebar component for the dashboard layout.
 *
 * This component will render a fixed left sidebar with a navigation menu and
 * a card containing subscription information at the bottom.
 *
 * @returns A React component for the left sidebar of the dashboard layout.
 */
const LeftSidebar = () => {
  const { token } = theme.useToken();

  // Assuming you have subscription info in the Redux store
  // const subscription = useAppSelector(selectCurrentUser);

  return (
    <div>
      {/* Left Sidebar */}
      <Sider
        width={280}
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
        {/* Subscription Info Card */}
        <div
          className="absolute bottom-4 left-4 w-[90%] flex items-center justify-start gap-3 p-3 border-t shadow-sm rounded-lg"
          style={{ backgroundColor: token?.colorPrimaryBg }}
        >
          <Card
            title="Subscription Plan"
            className="w-full"
            style={{ backgroundColor: token?.colorPrimaryBg }}
          >
            <div className="flex flex-col">
              <Title level={5} className="mb-0">
                 "Premium Plan"
                {/* {subscription?.planName || "Free Plan"} */}
              </Title>
              <Typography.Text type="secondary">
                {`$${20}/month`}
                {/* {subscription?.price ? `$${subscription.price}/month` : "Free"} */}
              </Typography.Text>
              <Button type="primary" className="mt-2">
                Upgrade Plan
              </Button>
            </div>
          </Card>
        </div>
      </Sider>
    </div>
  );
};

export default LeftSidebar;
