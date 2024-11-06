"use client";
import Button from "@/components/ui/button/Button";
import { voteType } from "@/constant";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAddDownvoteMutation, useAddUpvoteMutation } from "@/redux/features/vote/voteApi";
import { useAppSelector } from "@/redux/hooks";
import { TComment } from "@/types";
import { TVoteType } from "@/types/vote.type";
import { DislikeOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, theme, Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

const ReplyItem = ({

  reply,
}: {
  reply: TComment;
}) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const {token} = theme.useToken();
  const [addUpvote] = useAddUpvoteMutation();
  const [addDownvote] = useAddDownvoteMutation();
  const handleUpvote = () => {
    if (!currentUser) {
      return;
    }
    addUpvote({
      userId: currentUser._id,
      parentId: reply._id,
      type: voteType.upvote as TVoteType,
      parentType: 'Comment',
    });
  };

  const handleDownvote = () => {
    if (!currentUser) {
      return;
    }
    addDownvote({
      userId: currentUser._id,
      parentId: reply._id,
      type: voteType.downvote as TVoteType,
      parentType: 'Comment'
    });
  };
  return (
  <div className="">
    <div className="grid grid-cols-12 gap-0 items-start">
    <span className="h-[620px] -mt-[1120%] border-l-2 border-b-2 ml-3 top-5 rounded-bl-lg" style={{borderColor: token.secondaryBorder}}></span>
    <div className="col-span-11 flex gap-2 items-start justify-between mb-4 p-3 rounded-xl" style={{backgroundColor: token?.secondaryBorder}}>
        <div className="w-4/5 flex gap-2 items-start">
          <Avatar
            src={reply?.author?.profilePicture}
            className="mr-2 z-10 relative"
            alt={`${currentUser?.name}'s Profile`}
            style={{ backgroundColor: TokenProvider().colorBgElevated }}
          >
            {reply?.author?.profilePicture ? null : reply?.author?.name[0].toUpperCase()}
          </Avatar>
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
            <Button shape="default" icon={<LikeOutlined />} size="small" onClick={handleUpvote}>
              {reply?.upvoteCount}
            </Button>
          </Tooltip>
          <Tooltip title="Downvote">
            <Button shape="default" icon={<DislikeOutlined />} size="small" onClick={handleDownvote}>
              {reply?.downvoteCount}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
)};

export default ReplyItem;
