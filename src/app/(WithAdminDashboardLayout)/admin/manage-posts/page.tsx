/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { HiPlus } from "react-icons/hi"; 
import { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Popconfirm,
} from "antd";

import { useDeleteAPostMutation, useGetAllPostsQuery } from "@/redux/features/posts/postApi";
import { IPost } from "@/types";
import Image from "next/image";
import dynamic from "next/dynamic";

const PostEdit = dynamic(() => import("@/components/dashboard/profile/PostEdit"), { ssr: false });
const PostCreate = dynamic(() => import("./components/PostCreate"), { ssr: false });

const Page = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | ''>();
  const { data, isFetching } = useGetAllPostsQuery({
    page,
    limit,
    category: '',
    sort: '',
  });
  const [deleteAPost] = useDeleteAPostMutation();

  const posts = data?.data;

  const handleOpenAddPostModal = () => {
    setIsAddPostModalOpen(true);
  };

  const showEditModal = (post: IPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedPost(null);
//   };

  const columns:any = [
    {
      title: "Thumbnail",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) => (
        <Image src={images[0] || ""} alt="Post Thumbnail" width={60} height={60} />
      ),
      responsive: ["lg"],
    },
    {
      title: "Post ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      key: "status",
      render: (text: any, record: IPost) => {
        const status = record.isBlocked ? "Blocked" : record.isDeleted ? "Deleted" : "Active";
        const color = status === "Active" ? "green" : status === "Blocked" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: IPost) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this post?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteAPost({id:record._id, userId: ''})}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button type="primary" onClick={handleOpenAddPostModal}>
          Add Post <HiPlus size={17} />
        </Button>
      </div>

      <Table
        dataSource={posts}
        columns={columns}
        rowKey={(record) => record._id}
        loading={isFetching}
        pagination={{
          current: page,
          pageSize: limit,
          showSizeChanger: true,
          pageSizeOptions: ["10", "15", "20"],
          total: data?.totalPosts,
        }}
        onChange={handleTableChange}
        className="h-[80vh] overflow-y-scroll scrollbar-hide"
        scroll={{ x: "100%" }}
        size="small"
      />

      {/* Modal for adding post */}
      {isAddPostModalOpen && <PostCreate isModalVisible={isAddPostModalOpen} setIsModalVisible={setIsAddPostModalOpen} />}
      {selectedPost && <PostEdit postData={selectedPost} showPopup={isModalOpen} setShowPopup={setIsModalOpen} />}
    </div>
  );
};

export default Page;
