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
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns"; // To format date
import { IPost } from "@/types/post.type";
import Image from "next/image";
import ReactPlayer from "react-player";
import { useState } from "react";
// import CommentSection from "../../dashboard/contentArea/CommentSection";

const { Text, Paragraph } = Typography;

// PostCard Component to display a post and its comments
const PostCardWithComments = (
  {
    post,
    // isOpen,
    setIsOpen,
  }: {
    post: Partial<IPost>;
    isOpen: boolean;
    setIsOpen: CallableFunction;
  }) => {
    const [playerError, setPlayerError] = useState(false);

  const handleVideoError = () => {
    setPlayerError(true);
    // message.warning("Video cannot be played. Watch it on YouTube.");
  };
  const hideModal = () => {
    setIsOpen(false);
  };
  const { token } = theme.useToken();
  function getYoutubeVideoId(video: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <Modal
      open={true}
      onClose={hideModal}
      onCancel={hideModal}
      width={800}
      footer={null}
      centered
      style={{ backgroundColor: token?.colorBgContainer, borderRadius: "16px" }}
    >
      <div className="w-full m-1 shadow-sm rounded-lg h-[85vh] overflow-y-scroll scrollbar-hide">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar
              src={post?.author?.profilePicture}
              icon={!post?.author?.profilePicture && <UserOutlined />}
              size={48}
              className="mr-3"
            />
            <div>
              <Text strong className="block leading-[16px]">
                {post?.author?.name}
              </Text>
              <Text className="text-xs">
                {formatDistanceToNow(new Date( post?.createdAt as string), { addSuffix: true })}
              </Text>
            </div>
          </div>
          {/* Post Actions - Upvotes / Downvotes */}
        </div>

        {/* Post Content */}
        <Paragraph>{post?.content}</Paragraph>
        <div className="flex flex-wrap gap-4">
        {/* Video Player */}
        {!playerError && post?.video && (
          <ReactPlayer
            url={post?.video}
            width="100%"
            height="55vh"
            controls={true}
            onError={handleVideoError}
            className="!rounded-lg"
            style={{borderRadius: '12px !important'}}
          />
        )}

        {/* Fallback for Unavailable YouTube Video */}
        {playerError && post?.video && (
          <div
            className="relative w-full cursor-pointer"
            onClick={() => window.open(post?.video, "_blank")}
          >
            {/* Thumbnail Image (You can adjust the width/height as needed) */}
            <Image
              src={`https://img.youtube.com/vi/${getYoutubeVideoId(
                post?.video
              )}/hqdefault.jpg` || (post?.images![0] )}
              width={1000}
              height={400}
              // layout="fill"
              objectFit="cover"
              alt="Video Thumbnail"
              className={`rouded-lg w-full h-[55vh] object-cover mb-3 rounded-lg`}
            />

            {/* Play Button (Centered on the thumbnail) */}
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
        )}

        {/* Images */}
        {post?.images?.map((image, index) => (
          <Image
            key={image}
            src={image}
            width={1000}
            height={350}
            alt="Post content"
            className={`${
              index === 0 && !post?.video
                ? "w-full h-[50vh]"
                : "w-auto h-[8vh]"
            } object-cover mb-3 rounded-lg`}
          />
        ))}
      </div>
        <div className="flex items-center space-x-2 pt-4">
          <Tooltip title="Upvote">
            <Button type="text" icon={<LikeOutlined />} size="small">
              {post?.upvotes?.length}
            </Button>
          </Tooltip>
          <Tooltip title="Downvote">
            <Button type="text" icon={<DislikeOutlined />} size="small">
              {post?.downvotes?.length}
            </Button>
          </Tooltip>
          {/* Comment Count */}
          <Tooltip title="Comments">
            <Button type="text" icon={<CommentOutlined />} size="small">
              {post?.numberOfComments}
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
              <DislikeOutlined className="[&&_svg]:size-6 mr-2" /> Downvote
            </Typography.Text>
            <Typography.Text className="flex items-center font-medium">
              <CommentOutlined className="[&&_svg]:size-6 mr-2" />
              Comment
            </Typography.Text>
          </div>
        </div>
        {/* Divider for Comments */}
        {(post?.comments as string[]).length > 0 && <Divider className="my-3" />}

        {/* Comments Section */}
        {/* <CommentSection comments={comments}></CommentSection> */}
      </div>
    </Modal>
  );
};

export default PostCardWithComments;
