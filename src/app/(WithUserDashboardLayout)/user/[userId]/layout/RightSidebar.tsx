"use client";
import {
  useGetPostsOfAUserQuery,
} from "@/redux/features/posts/postApi";
import { Card, Empty, Skeleton, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import PostCard from "@/components/ui/cards/PostCard";


const RightSidebar = ({
  className = "",
  userId,
}: {
  className?: string;
  userId: string;
}) => {
  const { data, isSuccess, isFetching } = useGetPostsOfAUserQuery({
    id: userId as string,
    page: 1,
    limit: 5,
  });
  const posts = data?.data || [];

  return (
    <div className={`${className}`}>
      <Typography.Title level={2} className="!mb-6 !text-2xl">
        {" "}
        Recent posts
      </Typography.Title>

      <div className="flex flex-col gap-8">
        {isSuccess && posts.length > 0 &&
          posts.map((post) => (
            <PostCard key={post._id} post={post} height={300}/>
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
    </div>
  );
};

export default RightSidebar;
