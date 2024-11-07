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
  Empty,
  Badge,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PostEdit from "@/components/dashboard/profile/PostEdit";
import { useState } from "react";
import { IPost } from "@/types";
import { showMessage } from "@/components/ui/message";
import PostCard from "@/components/ui/cards/PostCard";

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
      
      deleteAPost({ id: postId as string, userId: currentUser?._id as string });
      if(success) showMessage({type:"success", message:"Post deleted successfully!"});
    } catch (error) {
      console.log(error);
      
      showMessage({type:"error", message:"Couldn't delete the post!"});
    }
  };


  return (
    <div className={`${className}`}>
      <Typography.Title level={2} className="!mb-6 !text-2xl">
        {" "}
        Recent posts
      </Typography.Title>

      <div className="flex flex-col gap-8">

        {isSuccess && posts.length > 0 &&
          posts.map((post) => (
            <Badge.Ribbon key={post._id} className="!mt-12" text={<Button.Group><Space direction="vertical"><EditOutlined onClick={() => handleEdit(post)} /><DeleteOutlined onClick={() => handleDelete(post._id)} /></Space></Button.Group>} color="orange">
              <PostCard post={post} height={300}/>
            </Badge.Ribbon>
            // <Card
            //   key={post._id}
            //   cover={<Image alt="example" className="!object-cover h-[300px]" width={200} height={200} src={post?.images ? post?.images[0] : ""} />}
            //   type="inner"
            //   title={
            //     <Typography.Text strong className="!text-lg">
            //       {post.title}
            //     </Typography.Text>
            //   }
            //   extra={<Tag color="blue">{post.category}</Tag>}
            //   className="mb-4"
            // >
            //   <Paragraph>{post.content}</Paragraph>

            // </Card>
          ))
        }
        {
         ( !isFetching && posts.length < 1) && (
            <Empty
              description="User haven't posted anything yet!"
            />
          )
        }
      </div>

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

      {/* Edit Post Modal */}
      {selectedPost && showPopup && <PostEdit postData={selectedPost}  showPopup={showPopup} setShowPopup={setShowPopup} />}
    </div>
  );
};

export default RightSidebar;
