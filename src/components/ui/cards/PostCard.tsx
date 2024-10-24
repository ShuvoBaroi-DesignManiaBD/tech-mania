"use client";
import {
  Card,
  Typography,
  Avatar,
  Divider,
  Button,
  Tooltip,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  CommentOutlined,
  LikeFilled,
  DislikeFilled,
  LeftOutlined,
  RightOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { IPost } from "@/types";
import Image from "next/image";
import PostCardWithComments from "./PostCardWithComments";
import ReactPlayer from "react-player";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { useState } from "react";

const { Text, Paragraph } = Typography;

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const handleVideoError = () => {
    setPlayerError(true);
  };

  const handleMediaSelect = (index: number) => {
    setSelectedMediaIndex(index);
  };

  const handleNext = () => {
    if (selectedMediaIndex < mediaArray.length - 1) {
      setSelectedMediaIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedMediaIndex > 0) {
      setSelectedMediaIndex((prev) => prev - 1);
    }
  };

  // Helper function to extract the video ID from the YouTube URL
  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|youtu\.be\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Create an array combining video and images for the slider
  const mediaArray = [
    ...(post?.video ? [post?.video] : []),
    ...(post?.images ? post?.images : []),
  ];

  return (
    <Card
      className="w-full m-1 shadow-sm rounded-lg"
      hoverable
      bordered
      title={
        <Typography.Title
          level={2}
          style={{ color: TokenProvider().colorText }}
          className="mt-4 pl-3 border-l-[4px] border-light-primary"
        >
          {post?.title}
        </Typography.Title>
      }
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Avatar
            src={post?.author?.profilePicture}
            icon={!post?.author?.profilePicture && <UserOutlined />}
            size={48}
            className="mr-3"
          />
          <div>
            <Text strong className="block leading-[16px]">
              {post?.author?.name || "Unknown Author"}
            </Text>
            <Text>
              {formatDistanceToNow(new Date(post?.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <Paragraph>{post?.content || "No content available"}</Paragraph>

      {/* Post Media Slider */}
      <div className="relative w-full">

        {/* Main Image/Video Display */}
        <div className="w-full h-[55vh] flex justify-center items-center relative">
        <div className="absolute w-full flex justify-between">
        {/* Left Navigation */}
        {selectedMediaIndex > 0 && (
          <Button
            className="absolute left-0 !py-8 transform z-10 bg-white"
            icon={<LeftOutlined />}
            onClick={handlePrev}
          />
        )}

        {/* Right Navigation */}
        {selectedMediaIndex < mediaArray.length - 1 && (
          <Button
            className="absolute !py-8 !right-0 transform z-10 bg-white"
            icon={<RightOutlined />}
            onClick={handleNext}
          />
        )}
        </div>
          {mediaArray[selectedMediaIndex].includes("youtube.com") ||
          mediaArray[selectedMediaIndex].includes("youtu.be") ? (
            !playerError ? (
              <ReactPlayer
                url={mediaArray[selectedMediaIndex]}
                width="100%"
                height="100%"
                controls={true}
                onError={handleVideoError}
                className="!rounded-lg"
              />
            ) : (
              <div
                className="relative w-full cursor-pointer"
                onClick={() =>
                  window.open(mediaArray[selectedMediaIndex], "_blank")
                }
              >
                <Image
                  src={`https://img.youtube.com/vi/${getYoutubeVideoId(
                    mediaArray[selectedMediaIndex]
                  )}/hqdefault.jpg`}
                  width={1000}
                  height={400}
                  objectFit="cover"
                  alt="Video Thumbnail"
                  className="w-full max-h-[55vh] object-cover rounded-lg"
                />
                <PlayCircleOutlined
                  className="absolute text-white"
                  style={{
                    fontSize: "64px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            )
          ) : (
            <Image
              src={mediaArray[selectedMediaIndex]}
              width={1000}
              height={400}
              alt="Post content"
              className="w-full h-[55vh] object-cover rounded-lg"
            />
          )}
        </div>

        {/* Thumbnails Navigation */}
        <div className="flex justify-center gap-2 mt-3">
          {mediaArray.map((media, index) => (
            <div
              key={index}
              className={`w-24 h-16 border-2 cursor-pointer ${
                index === selectedMediaIndex
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => handleMediaSelect(index)}
            >
              {media.includes("youtube.com") || media.includes("youtu.be") ? (
                <Image
                  src={`https://img.youtube.com/vi/${getYoutubeVideoId(
                    media
                  )}/default.jpg`}
                  width={100}
                  height={70}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Image
                  src={media}
                  width={100}
                  height={70}
                  alt="Post content"
                  className="object-cover rounded-lg h-[70px] w-auto"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center space-x-2 pt-4">
        <Tooltip title="Upvote">
          <Button type="text" icon={<LikeFilled />} size="small">
            {post?.upvotes?.length || 0}
          </Button>
        </Tooltip>

        <Tooltip title="Downvote">
          <Button type="text" icon={<DislikeFilled />} size="small">
            {post?.downvotes?.length || 0}
          </Button>
        </Tooltip>

        <Tooltip title="Comments">
          <Button type="text" icon={<CommentOutlined />} size="small">
            {post?.numberOfComments || 0}
          </Button>
        </Tooltip>
      </div>

      <Divider className="my-4" />

      <div className="flex justify-evenly items-center">
        <Typography.Text className="flex items-center font-medium">
          <LikeOutlined className="[&&_svg]:size-6 mr-2" /> Upvote
        </Typography.Text>
        <Typography.Text className="flex items-center font-medium">
          <DislikeOutlined className="[&&_svg]:size-6 mr-2" /> Downvote
        </Typography.Text>
        <Typography.Text
          className="flex items-center font-medium cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <CommentOutlined className="[&&_svg]:size-6 mr-2" />
          Comment
        </Typography.Text>
      </div>

      {/* Comments Section */}
      {isOpen && (
        <PostCardWithComments post={post} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </Card>
  );
};

export default PostCard;
