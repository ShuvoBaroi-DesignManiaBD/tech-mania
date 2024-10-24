// "use client";
// import PostCard from "@/components/ui/cards/PostCard";
// import dynamic from "next/dynamic";
// import { List, Typography } from "antd";
// import { useState } from "react";
// // import InfiniteScroll from "react-infinite-scroll-component";
// import { postsData } from "@/lib/fakeData/posts";
// import { useGetAllPostsQuery } from "@/redux/features/posts/postApi";
// const DynamicInfiniteScroll = dynamic(
//   () => import("react-infinite-scroll-component"),
//   {
//     ssr: false,
//   }
// );
// const PostsWithInfinitScroll = () => {
//   const [posts, setPosts] = useState(postsData);
//   const [hasMore, setHasMore] = useState(true);
//   const { data, isFetching } = useGetAllPostsQuery({ page, limit: 1 });
//   const loadMorePosts = () => {
//       if (posts.length >= 20) {
//         setHasMore(false);
//       } else {
//         const newPosts = postsData;
//         setPosts((prev) => [...prev, ...newPosts]);
//       }
//   };
//   return (
//     <div id="scrollableDiv" className="overflow-y-scroll scrollbar-hide pb-20">
//       <DynamicInfiniteScroll
//         dataLength={posts.length}
//         next={loadMorePosts}
//         hasMore={hasMore}
//         loader={<Typography.Text>Loading more posts...</Typography.Text>}
//         scrollableTarget="scrollableDiv"
//       >
//         <List
//           dataSource={posts}
//           renderItem={(item) => (
//             <List.Item className="!border-0">
//               <PostCard
//                 post={item} 
//               />
//             </List.Item>
//           )}
//         />
//       </DynamicInfiniteScroll>
//     </div>
//   );
// };

// export default PostsWithInfinitScroll;
