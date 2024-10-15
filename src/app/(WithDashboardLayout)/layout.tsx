"use client";
import { ReactNode } from "react";
import Header from "@/components/dashboard/header";
import LeftSidebar from "@/components/dashboard/LeftSidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";
import ContentArea from "@/components/dashboard/contentArea/ContentArea";
import { Layout as AntdLayout } from "antd";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";

// const { Title, Text, Paragraph } = Typography;

const Layout = ({children}:{children:ReactNode}) => {
  // Sample Data
  // const user = {
  //   name: "John Doe",
  //   username: "johndoe",
  //   profilePicture:
  //     "https://i.pravatar.cc/150?img=3", // Replace with user's profile picture URL
  //   isVerified: true,
  //   posts: 45,
  //   followers: 1200,
  //   following: 180,
  // };

  return (
    <AntdLayout style={{backgroundColor:TokenProvider()?.colorBgBase}}>
    <Header className="px-8"></Header>
    <AntdLayout className="h-screen fixed w-screen top-20">
      {/* Left Sidebar */}
      <LeftSidebar></LeftSidebar>

      {/* Main Content */}
      <ContentArea>{children}</ContentArea>
      {/* <Layout className="overflow-y-scroll scrollbar-hide" style={{backgroundColor:token?.colorBgBase}}>
        <Content className="w-[1080px] mx-auto h-full py-8 px-6" style={{backgroundColor:token?.colorBgBase}}>
          {children}
        </Content>
      </Layout> */}

      {/* Right Sidebar */}
      <RightSidebar></RightSidebar>
    </AntdLayout>
    </AntdLayout>
      
  );
};

export default Layout;
