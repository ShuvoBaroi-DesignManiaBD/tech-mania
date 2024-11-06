"use client";
import React, { useState } from "react";
import { Avatar, Input, Button, Divider, Tooltip } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import CommentItem from "./CommentItem";
import { useAddACommentMutation, useGetAllCommentsOfAPostQuery } from "@/redux/features/comments/commentApi";
import EmojiPicker from "emoji-picker-react"; // Assuming you have an emoji picker library installed
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import CommentSkeleton from "@/components/ui/Skeletons/CommentSkeleton";
import { showMessage } from "@/components/ui/message";
// import TokenProvider from "@/lib/providers/antDesign/TokenProvider";

const { TextArea } = Input;

const CommentSection = ({ postId }: { postId: string }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data, isSuccess, isFetching } = useGetAllCommentsOfAPostQuery({ postId });
  const [addAComment, ] = useAddACommentMutation();
  const comments = data?.data;
  const [commentText, setCommentText] = useState("");
  const [, setShowEmojiPicker] = useState(false);

  const profilePhoto = currentUser?.profilePicture;
    const fallbackInitial = currentUser?.name ? currentUser.name[0].toUpperCase() : null;
  // const handleCollapse = () => setIsExpanded(false);

  const handleCommentChange = (e) => setCommentText(e.target.value);

  const handleEmojiClick = (emojiObject) => {
    setShowEmojiPicker(false);
    return setCommentText(commentText + emojiObject.emoji);
  };

  const handleSubmit = async() => {
    // Handle comment submission logic here
    const formData = {
      postId: postId,
      content: commentText,
      author: currentUser?._id,
    }

    try {
      const result = await addAComment(formData).unwrap();
      showMessage({ type: "success", message: "Comment added successfully" });
      console.log(result);
    } catch (error) {
      console.log(error);
      showMessage({ type: "error", message: "Something went wrong. Comment didn't added" });
    }

    setCommentText("");
  };

  return (
    <div className="self-stretch pb-20">
      {isSuccess && <Divider className="my-3" />}
      <div className="overflow-hidden">
        {isFetching && [1].map((id) => <CommentSkeleton key={id} repeat={[1, 2, 3]} />)}
        {!isFetching && isSuccess &&
          comments?.map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}
      </div>

      <div className="w-[47%] flex gap-2 items-start mt-4 absolute bottom-5 p-3 rounded-lg z-50 shadow-lg" style={{ backgroundColor: TokenProvider().colorBgContainer }}>
        <Avatar
          src={currentUser?.profilePicture}
          size="large"
          className="mr-3 !text-2xl"
          alt={`${currentUser?.name}'s Profile`}
          style={{ backgroundColor: TokenProvider().colorPrimary }}
        >
          {profilePhoto ? null : fallbackInitial}
        </Avatar>
        <div className="flex-1 cursor-text">
          <div className="flex gap-2">
            <TextArea
              value={commentText}
              size="large"
              onChange={handleCommentChange}
              autoSize={{ minRows: 1, maxRows: 4 }}
              aria-controls="rows"
              placeholder="Write a comment..."
              className="!w-[80%] mb-2"
            />
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center">
                <Tooltip title={<EmojiPicker
                onEmojiClick={handleEmojiClick}
                className="!fixed bottom-20"
              />}>
                  <Button
                    type="default"
                    icon={<SmileOutlined />}
                    size="large"
                  ></Button>
                </Tooltip>
                {/* Add more buttons for other options if needed */}
              </div>
              <Button
                type="primary"
                size="large"
                className="!px-4 !text-base"
                onClick={handleSubmit}
                disabled={!commentText.trim()}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
