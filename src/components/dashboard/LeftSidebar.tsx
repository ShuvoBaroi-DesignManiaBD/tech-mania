"use client";
import { ImPriceTags } from "react-icons/im";
import { Button, Card, Menu, theme, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import dashboardNavItems from "../ui/shared/navbar/dashboardNav/dashboardLeftSideNavItems";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetCurrentUserQuery } from "@/redux/features/users/userApi";
import { IUser } from "@/types";
import CheckoutModel from "@/app/(WithUserDashboardLayout)/pricing/component/CheckoutModel";
import { MessageOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { navigate } from "@/actions/navigate";

const LeftSidebar = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isFetching } = useGetCurrentUserQuery(
    currentUser?._id as string
  );
  const userData = data?.data as IUser;
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
        <div className="px-4 py-8 h-full flex flex-col justify-between items-stretch">
          {/* <Logo></Logo> */}
          {/* Navigation Menu */}
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={dashboardNavItems}
            className="!border-0"
            style={{ border: 0 }}
          />
          {/* Subscription Info Card */}
          <div className="space-y-5">

          {currentUser?.role === "admin" && (
            <Button type="primary" block icon={<RightOutlined />} iconPosition="end" onClick={() => navigate("/admin/dashboard")}>admin dashboard</Button>
          )}
          <Card
            title={
              <Title level={4} style={{ color: TokenProvider().colorText }}>
                Subscription
              </Title>
            }
            loading={isFetching}
            className=""
            style={{
              backgroundColor: TokenProvider()?.colorBgContainer,
              borderColor: TokenProvider()?.colorBorder,
              color: TokenProvider()?.colorText,
            }}
            styles={{ body: { padding: 16, margin: 0 }, title: { padding: 0 } }}
            >
            <div className="flex flex-col gap-2">
              <Typography.Title
                level={5}
                className="mb-0 flex items-center gap-2"
              >
                <ImPriceTags
                  size={20}
                  style={{ color: TokenProvider().colorPrimary }}
                />
                {userData?.verified ? "Premium Plan" : "Free Plan"}
              </Typography.Title>

              <Typography.Text
                type="secondary"
                className="flex items-center gap-2 mt-2"
              >
                <MessageOutlined
                  style={{ color: TokenProvider().colorPrimary }}
                />
                {userData?.verified
                  ? "Post credits: Unlimited"
                  : `Post credits: ${userData?.postCredit}`}
              </Typography.Text>

              <Typography.Text
                type="secondary"
                className="flex items-center gap-2 mt-1"
              >
                <UserOutlined style={{ color: TokenProvider().colorPrimary }} />
                {userData?.verified
                  ? "Follow credits: Unlimited"
                  : `Follow credits: ${userData?.followCredit}`}
              </Typography.Text>

              {userData?.verified === false && (
                <Button
                  type="primary"
                  className="mt-4"
                  onClick={() => setIsModalVisible(true)}
                >
                  Upgrade Plan
                </Button>
              )}
              <CheckoutModel
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            </div>
          </Card>
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default LeftSidebar;
