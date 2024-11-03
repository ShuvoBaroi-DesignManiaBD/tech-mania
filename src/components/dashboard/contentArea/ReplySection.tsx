'use client';
import { Typography } from "antd";
import ReplyItem from "./ReplyItem";
import { useGetAllRepliesOfACommentQuery } from "@/redux/features/comments/commentApi";

const ReplySection = ({parentCommentId}: {parentCommentId: string}) => {
    const {data} = useGetAllRepliesOfACommentQuery({parentCommentId: parentCommentId, page: 1, limit: 6});
    const replies = data?.data;
    
    const repliesCount = data?.data.length;
    // const {token} = useRe;
    return (
        <div className="ml-5 -mt-3 space-y-4">
          <Typography.Text className="!text-xs pl-8">
            {repliesCount} {repliesCount === 1 ? "Reply" : "Replies"}
          </Typography.Text>
          {replies && replies.map((reply, index) => (
            <ReplyItem key={index} reply={reply} />
          ))}
        </div>
    );
};

export default ReplySection;