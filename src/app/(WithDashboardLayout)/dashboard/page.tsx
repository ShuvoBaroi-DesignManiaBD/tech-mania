"use client"; // Ensure this is included for client-side rendering
import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import dynamic from "next/dynamic";
import { postsData } from "@/lib/fakeData/posts";
import { IPostCard } from "@/types/post.type";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";

// Dynamically import Ant Design components from 'antd'
const Input = dynamic(() => import("antd").then((mod) => mod.Input), {
  ssr: false,
});
const Dropdown = dynamic(() => import("antd").then((mod) => mod.Dropdown), {
  ssr: false,
});
const Menu = dynamic(() => import("antd").then((mod) => mod.Menu), {
  ssr: false,
});
const MenuItem = dynamic(() => import("antd").then((mod) => mod.Menu.Item), {
  ssr: false,
});
const Space = dynamic(() => import("antd").then((mod) => mod.Space), {
  ssr: false,
});
const Button = dynamic(() => import("antd").then((mod) => mod.Button), {
  ssr: false,
});
const List = dynamic(() => import("antd").then((mod) => mod.List), {
  ssr: false,
});
const ListItem = dynamic(() => import("antd").then((mod) => mod.List.Item), {
  ssr: false,
});
// const Typography = dynamic(() => import("antd").then((mod) => mod.Typography), { ssr: false });
const Text = dynamic(() => import("antd").then((mod) => mod.Typography.Text), {
  ssr: false,
});
const SearchOutlined = dynamic(
  () => import("@ant-design/icons/SearchOutlined"),
  { ssr: false }
);
const FilterOutlined = dynamic(
  () => import("@ant-design/icons/FilterOutlined"),
  { ssr: false }
);
const DownOutlined = dynamic(() => import("@ant-design/icons/DownOutlined"), {
  ssr: false,
});

// Dynamic import of other components
const PostCard = dynamic(() => import("@/components/ui/cards/PostCard"), {
  ssr: false,
});
const PostCreate = dynamic(
  () => import("@/components/dashboard/contentArea/PostCreate"),
  { ssr: false }
);
const DynamicInfiniteScroll = dynamic(
  () => import("react-infinite-scroll-component"),
  { ssr: false }
);

const categories = ["Tutorials", "Guides", "Tips", "Tech News"];

const Page = () => {
  const [posts, setPosts] = useState(postsData);
  const [, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Most Recent");
  const [hasMore, setHasMore] = useState(true);
  const [isClient, setIsClient] = useState(false); // Check if rendering on client

  useEffect(() => {
    // Ensure the code runs only on the client
    setIsClient(true);
  }, []);

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handleFilterChange = ({ key }: { key: string }) => {
    setFilter(key);
  };

  const handleSortChange = ({ key }: { key: string }) => {
    setSortOrder(key);
  };

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

  const sortMenu = (
    <Menu onClick={handleSortChange}>
      <MenuItem key="Most Recent">Most Recent</MenuItem>
      <MenuItem key="Most Upvoted">Most Upvoted</MenuItem>
      <MenuItem key="Most Helpful">Most Helpful</MenuItem>
    </Menu>
  );

  const filterMenu = (
    <Menu onClick={handleFilterChange}>
      <MenuItem key="All">All</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category}>{category}</MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <PostCreate />

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search for tips, guides, or tutorials..."
          prefix={<SearchOutlined />}
          className="max-w-sm"
          style={{ color: TokenProvider().colorText }}
          styles={{ input: { color: TokenProvider().colorText } }}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Space>
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button icon={<FilterOutlined />}>
              Filter: {filter} <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <Button icon={<DownOutlined />}>
              Sort: {sortOrder} <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>

      {/* Only render the infinite scroll when on the client */}
      {isClient && (
        <div
          id="scrollableDiv"
          className="overflow-y-scroll scrollbar-hide pb-20"
        >
          <DynamicInfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={<Text>Loading more posts...</Text>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={posts}
              renderItem={(item: unknown) => {
                const post = item as IPostCard;
                return (
                  <ListItem className="!border-0">
                    <PostCard
                      key={post?.id}
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
                  </ListItem>
                );
              }}
            />
          </DynamicInfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Page;
