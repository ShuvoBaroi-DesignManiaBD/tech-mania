"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useDeleteAPostMutation, useGetPostsOfAUserQuery } from "@/redux/features/posts/postApi";
import { useAppSelector } from "@/redux/hooks";
import {
  Card,
  Skeleton,
  Tag,
  Typography,
  Button,
  Space,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PostEdit from "@/components/dashboard/profile/PostEdit";
import { useState } from "react";
import { IPost } from "@/types";
import { showMessage } from "@/components/ui/message";

const RightSidebar = ({ className = "" }): JSX.Element => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null); // Add selectedPost state
  const currentUser = useAppSelector(selectCurrentUser);
  const { data, isSuccess, isFetching } = useGetPostsOfAUserQuery({
    id: currentUser?._id as string,
    page: 1,
    limit: 5,
  });
  const [deleteAPost, {isSuccess:success}] = useDeleteAPostMutation();
  const posts = data?.data || [];

  const handleEdit = (post: IPost) => {
    setSelectedPost(post); // Set the selected post
    setShowPopup(true); // Show the edit popup
  };

  const handleDelete = (postId: string) => {
    try {
      console.log({ id: postId as string, userId: currentUser?._id as string });
      
      deleteAPost({ id: postId as string, userId: currentUser?._id as string });
      if(success) showMessage({type:"success", message:"Post deleted successfully!"});
    } catch (error) {
      console.log(error);
      showMessage({type:"error", message:"Couldn't delete the post!"});
    }
  };


  return (
    <div className={`${className}`}>
      <Card title="Recent Posts" bordered={false} className="rounded-8">
        <div className="space-y-5">
          {isSuccess &&
            posts.map((post) => (
              <Card
                key={post._id}
                type="inner"
                title={
                  <Typography.Text strong className="!text-lg">
                    {post.title}
                  </Typography.Text>
                }
                extra={<Tag color="blue">{post.category}</Tag>}
                className="mb-4"
              >
                <Paragraph>{post.content}</Paragraph>
                <Space>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(post._id)}
                    danger
                  >
                    Delete
                  </Button>
                </Space>
              </Card>
            ))}

          {/* Sample Loading Cards */}
          {isFetching &&
            [1, 2].map((id) => (
              <Card
                key={id}
                loading
                type="inner"
                title={
                  <Skeleton.Button
                    block
                    style={{ width: "100%" }}
                    className="!text-lg"
                    active
                  />
                }
                extra={<Skeleton.Button className="!ml-4" active />}
                className="mb-4"
              >
                <Paragraph>
                  The React Context API allows you to manage global state in a
                  simpler way than using state management libraries like Redux.
                </Paragraph>
              </Card>
            ))}
        </div>
      </Card>

      {/* Edit Post Modal */}
      {selectedPost && showPopup && <PostEdit post={selectedPost}  showPopup={showPopup} setShowPopup={setShowPopup} />}
    </div>
  );
};

export default RightSidebar;
