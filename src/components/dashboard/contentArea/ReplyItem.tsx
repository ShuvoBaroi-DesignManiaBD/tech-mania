import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

const ReplyItem = ({
  author,
  reply,
}: {
  author: { id: string; image: string; name: string | null };
  reply: string;
}) => (
  <div className="border-gray-200">
    <div className="grid grid-cols-12 gap-0 items-start">
    <span className="!w-full h-[620px] -mt-[980%] border-l-2 border-b-2 left-6 top-5 rounded-bl-lg"></span>
      <Avatar
        src={author.image}
        icon={!author.image && <UserOutlined />}
        className="-ml-4 z-10 !w-9 !h-9"
      />
      <div className="col-span-10 w-full -ml-8">
        <Typography.Text strong>
          {author.name || "Unknown Author"}
        </Typography.Text>
        <Paragraph className="">{reply}</Paragraph>
      </div>
    </div>
  </div>
);

export default ReplyItem;
