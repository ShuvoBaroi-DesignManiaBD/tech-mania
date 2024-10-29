"use client";
import Button from "@/components/ui/button/Button";
import { TComment } from "@/types";
import { DislikeOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, theme, Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

const ReplyItem = ({

  reply,
}: {
  reply: TComment;
}) => {
  const {token} = theme.useToken();
  return (
  <div className="">
    <div className="grid grid-cols-12 gap-0 items-start">
    <span className="h-[620px] -mt-[1120%] border-l-2 border-b-2 ml-3 top-5 rounded-bl-lg" style={{borderColor: token.secondaryBorder}}></span>
    <div className="col-span-11 flex gap-2 items-start justify-between mb-4 p-3 rounded-xl" style={{backgroundColor: token?.secondaryBorder}}>
        <div className="w-4/5 flex gap-2 items-start">
          <Avatar
            src={reply?.author?.profilePicture}
            icon={!reply?.author.profilePicture && <UserOutlined />}
            className="mr-2 z-10 relative"
          />
        <span className='w-16 h-[68%] border-l-2 absolute left-8 top-5 rounded-lg' style={{borderColor: token.secondaryBorder}}></span>
          <div>
            <Typography.Text strong>
              {reply?.author.name || "Unknown Author"}
            </Typography.Text>
            <Paragraph className="mb-1">{reply?.content}</Paragraph>
          </div>
        </div>
        {/* Upvote / Downvote Buttons */}
        <div className="w-1/5 flex items-center space-x-2">
          <Tooltip title="Upvote">
            <Button shape="default" icon={<LikeOutlined />} size="small">
              {reply?.upvoteCount}
            </Button>
          </Tooltip>
          <Tooltip title="Downvote">
            <Button shape="default" icon={<DislikeOutlined />} size="small">
              {reply?.downvoteCount}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
)};

export default ReplyItem;
