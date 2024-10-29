"use client";
import { Card, Typography, Avatar, Divider, Button, Tooltip, Tag } from "antd";
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
import { IPost, TPostInteractions } from "@/types";
import Image from "next/image";
// import PostCardWithComments from "./PostCardWithComments";
// import ReactPlayer from "react-player";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Quill's snow theme CSS
import "quill-emoji/dist/quill-emoji.css";
import { useAddDownvoteMutation, useAddUpvoteMutation } from "@/redux/features/vote/voteApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { voteType } from "@/constant";
import { TVoteType } from "@/types/vote.type";
import { useGetAPostInteractionsQuery } from "@/redux/features/posts/postApi";
import dynamic from "next/dynamic";

// Dynamic import to prevent SSR for the ReactPlayer component
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const PostCardWithComments = dynamic(() => import("./PostCardWithComments"), { ssr: false });

const { Text } = Typography;

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  console.log(post);
  
  const currentUser = useAppSelector(selectCurrentUser);
  const [addUpvote] = useAddUpvoteMutation();
  const [addDownvote] = useAddDownvoteMutation();
  const { data:interactions } = useGetAPostInteractionsQuery(post?._id);
  const postInteractions = interactions?.data || [];
  const [isOpen, setIsOpen] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const handleVideoError = () => {
    setPlayerError(true);
  };

  // ============= Vote Actions =============

  const handleUpvote = () => {
    if (!currentUser) {
      return;
    }
    addUpvote({
      userId: currentUser._id,
      parentId: post._id,
      type: voteType.upvote as TVoteType,
      parentType: 'Post',
    });
  };

  const handleDownvote = () => {
    if (!currentUser) {
      return;
    }
    addDownvote({
      userId: currentUser._id,
      parentId: post._id,
      type: voteType.downvote as TVoteType,
      parentType: 'Post'
    });
  };

  // ============= Media Slider =============
  const handleMediaSelect = (index: number) => setSelectedMediaIndex(index);
  const handleNext = () => selectedMediaIndex < mediaArray.length - 1 && setSelectedMediaIndex((prev) => prev + 1);
  const handlePrev = () => selectedMediaIndex > 0 && setSelectedMediaIndex((prev) => prev - 1);

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
      className="w-full m-1 shadow-sm rounded-lg !relative"
      hoverable
      bordered
      title={
        <div className="flex items-center">
          <Typography.Title
            level={2}
            style={{ color: TokenProvider().colorText }}
            className="mt-4 pl-3 border-l-[4px] border-light-primary"
          >
            {post?.title}
          </Typography.Title>
          <Tag
            color="blue-inverse"
            className="!absolute -right-2.5 -top-0.5 !px-4 !py-1 !rounded-lg !rounded-tl-none !rounded-br-none !border-none"
          >
            {post?.category}
          </Tag>
        </div>
      }
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Avatar
            src={
              post.author && typeof post.author === "object"
                ? post.author.profilePicture
                : ""
            }
            icon={
              (post.author &&
                typeof post.author === "object" &&
                post.author?.profilePicture) || <UserOutlined />
            }
            size={48}
            className="mr-3"
          />
          <div>
            <Text strong className="block leading-[16px]">
              {(typeof post.author === "object" && post.author?.name) ||
                "Unknown Author"}
            </Text>
            <Text className="!text-sm">
              {formatDistanceToNow(new Date(post?.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <Typography className="flex gap-2">
        <div
          dangerouslySetInnerHTML={{
            __html: post?.content || "No content available",
          }}
          className="line-clamp-3"
        />
        <Button
          onClick={() => setIsOpen(true)}
          className="mt-4 underline !p-0 !text-light-primaryTextHover"
          type="link"
        >
          Read more
        </Button>
      </Typography>

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
          <Button
            type="text"
            icon={<LikeFilled />}
            size="small"
          >
            { (postInteractions as TPostInteractions).upvotes || 0}
          </Button>
        </Tooltip>

        <Tooltip title="Downvote">
          <Button type="text" icon={<DislikeFilled />} size="small" >
          { (postInteractions as TPostInteractions).downvotes || 0}
          </Button>
        </Tooltip>

        <Tooltip title="Comments">
          <Button type="text" icon={<CommentOutlined />} size="small">
            { (postInteractions as TPostInteractions).comments || 0}
          </Button>
        </Tooltip>
      </div>

      <Divider className="my-4" />

      <div className="flex justify-evenly items-center">
        <Typography.Text className="flex items-center font-medium" onClick={handleUpvote}>
          <LikeOutlined className="[&&_svg]:size-6 mr-2" /> Upvote
        </Typography.Text>
        <Typography.Text className="flex items-center font-medium" onClick={handleDownvote}>
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
        <PostCardWithComments
          post={post}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </Card>
  );
};

export default PostCard;
