"use client";
import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import dynamic from "next/dynamic";
import { useGetAllPostsQuery } from "@/redux/features/posts/postApi";
import { IPost } from "@/types";
import MenuItem from "antd/es/menu/MenuItem";
import { Space, Spin } from "antd";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";

// Dynamic imports
const Input = dynamic(() => import("antd").then((mod) => mod.Input), {
  ssr: false,
});
const Dropdown = dynamic(() => import("antd").then((mod) => mod.Dropdown), {
  ssr: false,
});
const Menu = dynamic(() => import("antd").then((mod) => mod.Menu), {
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
const PostCard = dynamic(() => import("@/components/ui/cards/PostCard"), {
  ssr: false,
});
const PostCreate = dynamic(
  () => import("@/components/dashboard/contentArea/PostCreateSection"),
  { ssr: false }
);
const NotFound = dynamic(() => import("@/components/ui/NotFound"), {
  ssr: false,
});
const PostCardSkeleton = dynamic(
  () => import("@/components/ui/Skeletons/PostCardSkeleton"),
  { ssr: false }
);

const categories = ["Web", "AI", "Gadgets", "Software Engineering", "Apps"];

const Page = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Initial loading state to true
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Most Recent");
  const [searchTerm, setSearchTerm] = useState("");
  const loader = useRef<HTMLDivElement | null>(null);

  const { data, isFetching, isError, refetch } = useGetAllPostsQuery({
    page,
    limit: 3,
    category: filter === "All" ? null : filter,
    sort: sortOrder,
    searchTerm: searchTerm.length > 0 ? searchTerm : null,
  });

  console.log(filter, isError, isFetching, hasMore);
  // Handle new data fetched
  useEffect(() => {
    console.log("error ==>", isError);

    if (data && data.success === true && data.data.length > 0 && !isError) {
      console.log("inside if ==>", data);
      
      setPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((post) => post._id));
        const newPosts = data.data.filter((post) => !existingIds.has(post._id));
        return [...prevPosts, ...newPosts];
      });
      setLoading(false);
      setHasMore(data.success);
    } else {
      console.log("inside else if ==>", data);
      setHasMore(false);
    }
  }, [data, isError]);

  // Intersection Observer to trigger fetch on scroll
  useEffect(() => {
    const refetchPosts = async () => {
      if (hasMore) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        console.log("Intersecting");

        refetchPosts();
      }
    };

    const observer = new IntersectionObserver(onIntersection);
    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  // Search and filter handlers
  const handleSearch = debounce((value: string) => {
    if(value.length > 2) {
      setPosts([]);
      setHasMore(true);
      setPage(1);
      setLoading(true);
      setSearchTerm(value);
      console.log(posts);
    } else if (value.length < 3) {
      setSearchTerm("");
      console.log("inside else", value.length);
      setPosts([]);
      setHasMore(true);
      setPage(1);
    }
    
  }, 300);

  const handleFilterChange = ({ key }: { key: string }) => {
    setLoading(true);
    setHasMore(true);
    setPosts([]);
    if (key === "All") {
      setPosts([]);
      setFilter("All");
      refetch();
    } else {
      setPosts([]);
      setFilter(key);
      setPage(1);
    }
  };

  const handleSortChange = ({ key }: { key: string }) => {
    setPosts([]);
    setPage(1);
    setLoading(true);
    setHasMore(true);
    setSortOrder(key);
  };

  const sortMenu = (
    <Menu onClick={handleSortChange}>
      <MenuItem key="Most Recent">Most Recent</MenuItem>
      <MenuItem key="Oldest">Oldest</MenuItem>
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
      <PostCreate />
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search for tips, guides, or tutorials..."
          prefix={<SearchOutlined />}
          allowClear
          onClear={() => setSearchTerm("")}
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

      <div className="grid grid-cols-1 gap-8 pb-32">
        {posts?.length > 0
          ? posts.map((post) => <PostCard key={post._id} post={post} />)
          :  !isFetching && isError ? (
              <NotFound message="No posts found!" className="-mt-20" />
            ) : (
              <Spin size="large" className="!py-20"/>
            )}
        {!isError && hasMore && !isFetching && data?.success === true && (
          <div ref={loader} className="space-y-8">
            <PostCardSkeleton repeat={[1, 2]} />
          </div>
        )}

        {/* {hasMore && (
          <div >
            <Spin />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Page;
