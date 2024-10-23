"use client";
import PostCard from "@/components/ui/cards/PostCard";
import dynamic from "next/dynamic";
import { List, Typography } from "antd";
import { useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { postsData } from "@/lib/fakeData/posts";
const DynamicInfiniteScroll = dynamic(
  () => import("react-infinite-scroll-component"),
  {
    ssr: false,
  }
);
const PostsWithInfinitScroll = () => {
  const [posts, setPosts] = useState(postsData);
  const [hasMore, setHasMore] = useState(true);
  const loadMorePosts = () => {
    setTimeout(() => {
      if (posts.length >= 20) {
        setHasMore(false);
      } else {
        const newPosts = postsData;
        setPosts((prev) => [...prev, ...newPosts]);
      }
    }, 1000);
  };
  return (
    <div id="scrollableDiv" className="overflow-y-scroll scrollbar-hide pb-20">
      <DynamicInfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<Typography.Text>Loading more posts...</Typography.Text>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={posts}
          renderItem={(post) => (
            <List.Item className="!border-0">
              <PostCard
                key={post.id}
                id={post.id}
                currentUserId={post.currentUserId}
                author={post.author}
                content={post.content}
                upVotes={post.upVotes}
                downVotes={post.downVotes}
                commentsCount={post.commentsCount}
                comments={post.comments}
                createdAt={post.createdAt}
              />
            </List.Item>
          )}
        />
      </DynamicInfiniteScroll>
    </div>
  );
};

export default PostsWithInfinitScroll;
