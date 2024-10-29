"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetPostsOfAUserQuery } from "@/redux/features/posts/postApi";
import { useAppSelector } from "@/redux/hooks";
import { Card, Skeleton, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const RightSidebar = ({className=''}):JSX.Element => {
    const currentUser = useAppSelector(selectCurrentUser);
    const { data, isSuccess, isFetching } = useGetPostsOfAUserQuery({ id:currentUser?._id as string ,page: 1, limit: 5 });
    const posts = data?.data || [];
    return (
    <div className={`${className}`}>
          <Card title="Recent Posts" bordered={false} className="rounded-8">
            <div className="space-y-5">
                {isSuccess && posts.map((post) => (
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
                      <Paragraph>
                        {post.content}
                      </Paragraph>
                    </Card>
                ))}

              {/* Sample Post */}
              {isFetching && [1,2].map((id) => (
              <Card
              key={id}
              loading
                type="inner"
                title={
                  <Skeleton.Button block style={{ width: "100%" }} className="!text-lg " active>
                    
                  </Skeleton.Button>
                }
                extra={<Skeleton.Button className="!ml-4" active></Skeleton.Button>}
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
        </div>
    );
};

export default RightSidebar;