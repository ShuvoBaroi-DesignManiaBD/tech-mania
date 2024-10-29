/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Typography,
  Avatar,
  Divider,
  Button,
  Tooltip,
  Modal,
  theme,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  CommentOutlined,
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns"; // To format date
import { IAuthor, IPost, TPostInteractions } from "@/types/post.type";
import Image from "next/image";
import ReactPlayer from "react-player";
import { useState } from "react";
import CommentSection from "@/components/dashboard/contentArea/CommentSection";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { useAddDownvoteMutation, useAddUpvoteMutation } from "@/redux/features/vote/voteApi";
import { useGetAPostInteractionsQuery } from "@/redux/features/posts/postApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { voteType } from "@/constant";
import { TVoteType } from "@/types/vote.type";
// import CommentSection from "../../dashboard/contentArea/CommentSection";

const { Text, Paragraph } = Typography;

// PostCard Component to display a post and its comments
const PostCardWithComments = ({
  post,
  // isOpen,
  setIsOpen,
}: {
  post: Partial<IPost>;
  isOpen: boolean;
  setIsOpen: CallableFunction;
}) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [playerError, setPlayerError] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [addUpvote] = useAddUpvoteMutation();
  const [addDownvote] = useAddDownvoteMutation();
  const { data:interactions } = useGetAPostInteractionsQuery(post?._id as string);
  console.log(post?._id);
  const postInteractions = interactions?.data || [];

  const handleUpvoteForPost = () => {
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

  const handleUpvoteForComment = () => {
    if (!currentUser) {
      return;
    }
    addUpvote({
      userId: currentUser._id,
      parentId: post._id,
      type: voteType.upvote as TVoteType,
      parentType: 'Comment',
    });
  };

  const handleDownvoteForPost = () => {
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

  const handleDownvoteForComment = () => {
    if (!currentUser) {
      return;
    }
    addDownvote({
      userId: currentUser._id,
      parentId: post._id,
      type: voteType.downvote as TVoteType,
      parentType: 'Comment'
    });
  };

  const handleVideoError = () => {
    setPlayerError(true);
    // message.warning("Video cannot be played. Watch it on YouTube.");
  };
  const hideModal = () => {
    setIsOpen(false);
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
  const { token } = theme.useToken();
  // function getYoutubeVideoId(video: string) {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <Modal
      open={true}
      onClose={hideModal}
      onCancel={hideModal}
      width="75vw"
      footer={null}
      centered
      style={{ backgroundColor: token?.colorBgContainer, borderRadius: "16px" }}
    >
      <div className="flex gap-6 items-stretch justify-stretch w-full m-1 shadow-sm rounded-lg h-[90vh] overflow-y-scroll scrollbar-hide ">
        <div className="w-6/12 overflow-y-scroll scrollbar-hide">

        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <Avatar
              src={post.author && (post.author as IAuthor).profilePicture}
              icon={
                !(post.author as IAuthor).profilePicture && <UserOutlined />
              }
              size={48}
              className="mr-3"
            />
            <div>
              <Text strong className="block leading-[16px]">
                {(post.author as IAuthor).name}
              </Text>
              <Text className="!text-sm">
                {formatDistanceToNow(new Date(post?.createdAt as string), {
                  addSuffix: true,
                })}
              </Text>
            </div>
          </div>
          {/* Post Actions - Upvotes / Downvotes */}
        </div>

        {/* Post Media Slider */}
        <div className="relative w-full">
          {/* Main Image/Video Display */}
          <div className="w-full h-[45vh] flex justify-center items-center relative">
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
                    className="w-full max-h-[45vh] object-cover rounded-lg"
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
                className="w-full h-[45vh] object-cover rounded-lg"
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
        <Typography.Text className="flex items-center font-medium cursor-pointer" onClick={handleUpvoteForPost}>
          <LikeOutlined className="[&&_svg]:size-6 mr-2" /> Upvote
        </Typography.Text>
        <Typography.Text className="flex items-center font-medium cursor-pointer" onClick={handleDownvoteForPost}>
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
        <CommentSection postId={post?._id as string}></CommentSection>
        </div>
        {/* Post Content */}
        <Typography className="flex flex-col w-6/12 gap-2 p-7 rounded-lg overflow-y-hidden scrollbar-hide" style={{backgroundColor: TokenProvider()?.secondaryBorder}}>
        <Typography.Title level={2} className="mb-4">
          {post?.title}
        </Typography.Title>
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content || "No content available",
            }}
            className=""
          />
          {/* <Button
            onClick={() => setIsOpen(true)}
            className="mt-4 underline !p-0 !text-light-primaryTextHover"
            type="link"
          >
            Read more
          </Button> */}
        </Typography>
      </div>
    </Modal>
  );
};

export default PostCardWithComments;
