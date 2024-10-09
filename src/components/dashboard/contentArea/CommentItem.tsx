import { DislikeOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import ReplyItem from "./ReplyItem";

const CommentItem = ({
  author,
  comment,
  upVotes,
  downVotes,
  repliesCount,
  replies,
}: {
  author: { id: string; image: string; name: string | null };
  comment: string;
  upVotes: number;
  downVotes: number;
  repliesCount: number;
  replies: {
    author: { id: string; image: string; name: string | null };
    reply: string;
  }[];
}) => {
  return (
    <div className="relative mb-4 border-gray-200">
      {/* Main Comment */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start">
          <Avatar
            src={author.image}
            icon={!author.image && <UserOutlined />}
            className="mr-2 z-10 relative"
          />
        <span className='w-16 h-[68%] border-l-2 absolute left-5 top-5 rounded-lg'></span>
          <div>
            <Typography.Text strong>
              {author.name || "Unknown Author"}
            </Typography.Text>
            <Paragraph className="mb-1">{comment}</Paragraph>
          </div>
        </div>
        {/* Upvote / Downvote Buttons */}
        <div className="flex items-center space-x-2">
          <Tooltip title="Upvote">
            <Button shape="default" icon={<LikeOutlined />} size="small">
              {upVotes}
            </Button>
          </Tooltip>
          <Tooltip title="Downvote">
            <Button shape="default" icon={<DislikeOutlined />} size="small">
              {downVotes}
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Replies and Replies Count */}
      {replies && replies.length > 0 && (
        <div className="ml-5 -mt-5 space-y-3">
          <Typography.Text className="text-xs pl-8">
            {repliesCount} {repliesCount === 1 ? "Reply" : "Replies"}
          </Typography.Text>
          {replies.map((reply, index) => (
            <ReplyItem key={index} author={reply.author} reply={reply.reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
