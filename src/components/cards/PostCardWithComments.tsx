"use client";
import React, { useState } from "react";
import {
  Card,
  Typography,
  Avatar,
  Divider,
  Space,
  Button,
  Tooltip,
  Modal,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  CommentOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns"; // To format date
import { IPostCard } from "@/types/post.type";
import Image from "next/image";
import CommentSection from "../dashboard/contentArea/CommentSection";

const { Title, Text, Paragraph } = Typography;

// PostCard Component to display a post and its comments
const PostCardWithComments = ({
  id,
  currentUserId,
  author,
  content,
  comments,
  createdAt,
  upVotes,
  downVotes,
  commentsCount,
  isOpen,
  setIsOpen
}: IPostCard & {isOpen:boolean, setIsOpen:CallableFunction}) => {
  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <Modal open={true} onClose={hideModal} onCancel={hideModal} width={800} footer={null} centered>
    <div className="w-full m-1 shadow-sm rounded-lg h-[85vh] overflow-y-scroll scrollbar-hide">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Avatar
            src={author.image}
            icon={!author.image && <UserOutlined />}
            size={48}
            className="mr-3"
          />
          <div>
            <Text strong className="block leading-[16px]">
              {author.name}
            </Text>
            <Text className="text-xs">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </Text>
          </div>
        </div>
        {/* Post Actions - Upvotes / Downvotes */}
      </div>

      {/* Post Content */}
      <Paragraph>{content.text}</Paragraph>
      {content.image && (
        <Image
          src={content.image}
          width={1000}
          height={450}
          alt="post content"
          className="w-full h-auto mb-3 rounded-lg"
        />
      )}
      <div className="flex items-center space-x-2">
        <Tooltip title="Upvote">
          <Button type="text" icon={<LikeOutlined />} size="small">
            {upVotes}
          </Button>
        </Tooltip>
        <Tooltip title="Downvote">
          <Button type="text" icon={<DislikeOutlined />} size="small">
            {downVotes}
          </Button>
        </Tooltip>
        {/* Comment Count */}
        <Tooltip title="Comments">
          <Button type="text" icon={<CommentOutlined />} size="small">
            {commentsCount}
          </Button>
        </Tooltip>
      </div>
      <div>
        <Divider className="my-4"></Divider>
        <div className="flex justify-evenly items-center">
          <Typography.Text className="flex items-center font-medium">
            <LikeOutlined className="[&&_svg]:size-6 mr-2" /> Upvote
          </Typography.Text>
          <Typography.Text className="flex items-center font-medium">
          <DislikeOutlined className="[&&_svg]:size-6 mr-2"/> Downvote
          </Typography.Text>
          <Typography.Text className="flex items-center font-medium">
          <CommentOutlined className="[&&_svg]:size-6 mr-2"/>
          Comment
          </Typography.Text>
        </div>
      </div>
      {/* Divider for Comments */}
      {comments.length > 0 && <Divider className="my-3" />}

      {/* Comments Section */}
      <CommentSection comments={comments}></CommentSection>
    </div>
    </Modal>
  );
};

export default PostCardWithComments;
