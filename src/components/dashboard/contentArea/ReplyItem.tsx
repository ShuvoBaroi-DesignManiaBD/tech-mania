import { UserOutlined } from "@ant-design/icons";
import { Avatar, theme, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

const ReplyItem = ({
  author,
  reply,
}: {
  author: { id: string; image: string; name: string | null };
  reply: string;
}) => {
  const {token} = theme.useToken();
  return (
  <div className="">
    <div className="grid grid-cols-12 gap-0 items-start">
    <span className="h-[620px] -mt-[980%] border-l-2 border-b-2 ml-3 top-5 rounded-bl-lg" style={{borderColor: token.secondaryBorder}}></span>
    <div className="flex gap-10 col-span-10 p-3 rounded-xl -mt-2 mb-2" style={{backgroundColor: token.secondaryBorder}}>
      <Avatar
        src={author.image}
        icon={!author.image && <UserOutlined />}
        className="z-10 !w-9 !h-9"
      />
      <div className=" w-full -ml-8">
        <Typography.Text strong>
          {author.name || "Unknown Author"}
        </Typography.Text>
        <Paragraph className="">{reply}</Paragraph>
      </div>
    </div>
    </div>
  </div>
)};

export default ReplyItem;
