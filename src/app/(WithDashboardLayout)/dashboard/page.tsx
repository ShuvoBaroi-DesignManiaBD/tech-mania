"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Dropdown,
  Menu,
  Space,
  Button,
  Form,
  Avatar,
  List,
  Typography,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash/debounce";
import PostCard from "@/components/cards/PostCard";
import { IPostCard } from "@/types/post.type";
import { postsData } from "@/lib/fakeData/posts";




const { Title, Paragraph, Text } = Typography;

const categories = ["Tutorials", "Guides", "Tips", "Tech News"];

const NewsFeedPage: React.FC = () => {
  const [posts, setPosts] = useState(postsData); // Initialize with sample posts
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Most Recent");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    loadMorePosts();
  }, []);

  // Handle Post Search with Debouncing
  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    // Trigger search API or filtering logic here
  }, 300);

  // Handle Filter Change
  const handleFilterChange = ({ key }: any) => {
    setFilter(key);
  };

  // Handle Sort Order Change
  const handleSortChange = ({ key }: any) => {
    setSortOrder(key);
  };

  // Load More Posts (Infinite Scroll)
  const loadMorePosts = () => {
    setTimeout(() => {
      if (posts.length >= 20) {
        setHasMore(false);
      } else {
        // Adding new posts logic or fetch from an API
        const newPosts = postsData; // Adjust as needed for dynamic content
        setPosts((prev) => [...prev, ...newPosts]);
      }
    }, 1000);
  };

  // Dropdown Menu for Sorting Options
  const sortMenu = (
    <Menu onClick={handleSortChange}>
      <Menu.Item key="Most Recent">Most Recent</Menu.Item>
      <Menu.Item key="Most Upvoted">Most Upvoted</Menu.Item>
      <Menu.Item key="Most Helpful">Most Helpful</Menu.Item>
    </Menu>
  );

  // Dropdown Menu for Filter Options
  const filterMenu = (
    <Menu onClick={handleFilterChange}>
      <Menu.Item key="All">All</Menu.Item>
      {categories.map((category) => (
        <Menu.Item key={category}>{category}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      {/* Post Creation Section */}
      <Card bordered={false} className="mb-8 shadow-md">
        <Form layout="vertical">
          <Form.Item>
            <Input.TextArea
              rows={4}
              placeholder="Share your latest tech tips or guides..."
            />
          </Form.Item>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Post
            </Button>
            <Button type="default" icon={<PlusOutlined />}>
              Upload Image
            </Button>
          </Space>
        </Form>
      </Card>

      {/* Search & Sorting Options */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <Input
          placeholder="Search for tips, guides, or tutorials..."
          prefix={<SearchOutlined />}
          className="max-w-sm"
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Filter & Sort Options */}
        <Space>
          {/* Filter Dropdown */}
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button icon={<FilterOutlined />}>
              Filter: {filter} <DownOutlined />
            </Button>
          </Dropdown>

          {/* Sort Dropdown */}
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <Button icon={<DownOutlined />}>
              Sort: {sortOrder} <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>

      {/* News Feed List with Infinite Scroll */}
      <div
        id="scrollableDiv"
        className="overflow-y-scroll scrollbar-hide pb-20"
      >
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<Text>Loading more posts...</Text>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={postsData}
            // className="!flex !flex-col !gap-1"
            renderItem={(post) => (
              <List.Item className="!border-0">
                {/* Using PostCard component instead of Ant Design Card */}
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
                {/* Pass the post data to the PostCard */}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default NewsFeedPage;
