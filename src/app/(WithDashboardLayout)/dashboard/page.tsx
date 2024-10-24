/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Ensure this is included for client-side rendering
import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import dynamic from "next/dynamic";
import { useGetAllPostsQuery } from "@/redux/features/posts/postApi";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { IPost } from "@/types/post.type";
import { Spin } from "antd";

// Dynamic imports for Ant Design components
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

// Dynamic imports for custom components
const PostCard = dynamic(() => import("@/components/ui/cards/PostCard"), {
  ssr: false,
});
const PostCreate = dynamic(
  () => import("@/components/dashboard/contentArea/PostCreate"),
  { ssr: false }
);
// const DynamicInfiniteScroll = dynamic(
//   () => import("react-infinite-scroll-component"),
//   { ssr: false }
// );

const categories = ["Tutorials", "Guides", "Tips", "Tech News"];

const Page = () => {
  const [posts, setPosts] = useState<IPost[]>([]); // State to store posts
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Track if more posts are available
  const [filter, setFilter] = useState("All"); // Filter state
  const [sortOrder, setSortOrder] = useState("Most Recent"); // Sort state
  const [, setSearchTerm] = useState(""); // Search state
  const observer = useRef<IntersectionObserver | null>(null); // Ref for IntersectionObserver

  // Fetch posts based on page and limit
  const { data, isFetching } = useGetAllPostsQuery({ page, limit: 1 });

  // Effect to append new posts to the state when data changes
  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, ...data.data]); // Append posts
      setLoading(false); // Stop loading once data is fetched
      if (data?.success === false || (posts.length > (data as any)?.totalPosts) || data.data.length <= (data as any)?.totalPosts) {
        setLoading(false); // Start loading more if more posts are available
        setHasMore(false); // Stop loading more if no new posts or less than limit
      }
    }
  }, []);

  // Load more posts when the user scrolls to the bottom
  const loadMorePosts = () => {
  if (hasMore && !isFetching) {
    setLoading(true);
    setPage((prevPage) => prevPage + 1); // Increment page to fetch more posts
  }
};

useEffect(() => {
  if (data) {
    setPosts((prevPosts) => [...prevPosts, ...data.data]); // Append posts
    setLoading(false); // Stop loading once data is fetched

    // Determine if there are more posts to load
    if (!data.success || data.data.length < 1) {
      setHasMore(false); // Stop loading more if no new posts
    }
  }
}, [data]);

  // IntersectionObserver to trigger loadMorePosts when last post is in view
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts(); // Load more posts when the last post is in view
      }
    };

    if (observer.current) observer.current.disconnect(); // Disconnect any previous observer
    observer.current = new IntersectionObserver(observerCallback);
    const lastPostElement = document.querySelector("#last-post");
    if (lastPostElement) {
      observer.current.observe(lastPostElement); // Observe the last post element
    }

    return () => {
      if (lastPostElement) {
        observer?.current?.unobserve(lastPostElement); // Clean up observer on unmount
      }
    };
  }, [posts, hasMore]);

  // Search handler (debounced for better performance)
  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  // Filter change handler
  const handleFilterChange = ({ key }: { key: string }) => {
    setFilter(key);
  };

  // Sort change handler
  const handleSortChange = ({ key }: { key: string }) => {
    setSortOrder(key);
  };

  // Menus for sorting and filtering
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
    <div className="max-w-screen-lg mx-auto">
      <PostCreate /> {/* Component for creating a new post */}
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
      {/* <div
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
              const post = item as IPost;
              return (
                <ListItem className="!border-0">
                  <PostCard {...post} key={post._id} />
                </ListItem>
              );
            }}
          />
        </DynamicInfiniteScroll>
      </div> */}
      <div className="grid grid-cols-1 gap-8 pb-32">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

          {/* Dummy div to trigger IntersectionObserver */}
          {hasMore && !isFetching && (
            <div id="last-post" style={{ height: "20px" }} />
          )}

        {/* Loading Spinner */}
        {loading && <Spin />}
      </div>
    </div>
  );
};

export default Page;
