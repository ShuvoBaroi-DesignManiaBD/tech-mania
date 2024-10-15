"use client";
import Button from "@/components/ui/button/Button";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Space,
  Tag,
  Typography,
  Button as AntButton,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

const Page = () => {
  return (
    <div className="columns-1 space-y-5">
      <Card
        className="shadow-md mb-8 p-0"
        bordered={false}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center gap-32">
          <div className="flex gap-5">
            {/* Profile Picture */}
            <div className="text-center mb-4 sm:mb-0">
              <Avatar
                size={120}
                src="https://i.ibb.co/4JRDX8Z/profile-pic-4.webp"
                className="border-2 border-gray-300"
                alt={`Shuvo's Profile`}
              />
            </div>

            {/* User Info */}
            <div className="">
              <div className="flex flex-col gap-2">
                {/* User Name & Verified Badge */}
                <Title
                  level={4}
                  className="flex items-center !mb-0 !leading-0 gap-1"
                >
                  Shuvo
                 
                    <CheckCircleOutlined className="text-light-primary size-5" />
                  
                </Title>
                <Typography.Text className="!text-sm leading-0 mb-2 -mt-1">
                  @{`shuvobaroi`}
                </Typography.Text>

                {/* Buttons for Actions */}
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    type="primary"
                    size="small"
                    className="text-[14px]"
                  >
                    Edit
                  </Button>
                  <Button type="default" size="small" className="text-sm">
                    Settings
                  </Button>
                </Space>
              </div>
            </div>
          </div>

          {/* Post, Followers, and Following Counts */}
            <div className="mt-4 sm:mt-0 text-center sm:text-left flex gap-10 flex-grow justify-center">
              <div className="flex-grow">
                <Title level={4}>13</Title>
                <Typography.Text>Posts</Typography.Text>
              </div>
              <div className="flex-grow">
                <Title level={4}>30K+</Title>
                <Typography.Text>Followers</Typography.Text>
              </div>
              <div className="flex-grow">
                <Title level={4}>500+</Title>
                <Typography.Text>Following</Typography.Text>
              </div>
            </div>
        </div>
      </Card>

      <div className="flex gap-5">
        {/* Left Sidebar: Profile Details */}
        <div className="w-1/2" style={{
              borderRadius: "8px",
            }}>
          <Card
            title="Profile Information"
            className="mb-4"
            bordered={false}
          >
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              scelerisque euismod nunc ut feugiat. Vivamus suscipit justo nec
              odio fermentum, non viverra lorem venenatis.
            </Paragraph>
            <Paragraph>
              Email:{" "}
              <Typography.Text strong>john.doe@example.com</Typography.Text>
            </Paragraph>
            <Paragraph>
              Location:{" "}
              <Typography.Text strong>San Francisco, CA</Typography.Text>
            </Paragraph>
            <Paragraph>
              Member since:{" "}
              <Typography.Text strong>January 2020</Typography.Text>
            </Paragraph>
          {/* Follow & Message Buttons */}
          <div
            className="mt-12"
          >
            <AntButton type="primary" block>
              Follow
            </AntButton>
            <AntButton block className="mt-2">
              Message
            </AntButton>
          </div>
          </Card>

        </div>

        {/* Right Content: User's Posts */}
        <div>
          <Card
            title="Recent Posts"
            bordered={false}
            className="rounded-8"
          >
            <div className="space-y-5">
            {/* Sample Post */}
            <Card
              type="inner"
              title={
                <Typography.Text strong className="!text-lg">
                  Understanding React Context API
                </Typography.Text>
              }
              extra={<Tag color="blue">Tech</Tag>}
              className="mb-4"
            >
              <Paragraph>
                The React Context API allows you to manage global state in a
                simpler way than using state management libraries like Redux.
              </Paragraph>
            </Card>

            {/* Sample Post */}
            <Card
              type="inner"
              title={
                <Typography.Text strong className="!text-lg">
                  5 Tips for Better JavaScript Code
                </Typography.Text>
              }
              extra={<Tag color="green">Programming</Tag>}
            >
              <Paragraph>
                Writing clean and efficient JavaScript is crucial for building
                scalable web applications. Here are some tips to get started.
              </Paragraph>
            </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
