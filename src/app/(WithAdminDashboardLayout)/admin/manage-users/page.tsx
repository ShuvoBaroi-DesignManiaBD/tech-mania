/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { HiPlus } from "react-icons/hi"; 
import { useState } from "react";
import { Table, Tag, Button, Popconfirm, Avatar } from "antd";

import PostEdit from "@/components/dashboard/profile/PostEdit";
import UserCreatePopup from "./components/UserCreatePopup";
import { IUser } from "@/types";
import { useDeleteAUserMutation, useGetAllUsersQuery } from "@/redux/features/users/userApi";
import ProfileEditPopup from "@/app/(WithUserDashboardLayout)/user/profile/components/ProfileEditPopup";
import { UserOutlined } from "@ant-design/icons";

const Page = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data, isFetching } = useGetAllUsersQuery({ page, limit });
  const [deleteAUser] = useDeleteAUserMutation();

  const users = (data as any)?.data;

  const handleOpenAddPostModal = () => {
    setIsAddPostModalOpen(true);
  };

  const showEditModal = (user: IUser) => {
    setSelectedUser(user?._id as string);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (profilePicture: string) => (
        <Avatar src={profilePicture} alt="User Profile" style={{ borderRadius: "50%", width: "50px" }} icon={<UserOutlined />} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "blue" : "green"}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (text: any, record: IUser) => {
        const status = record.isBlocked ? "Blocked" : record.isDeleted ? "Deleted" : "Active";
        const color = status === "Active" ? "green" : status === "Blocked" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: IUser) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteAUser(record._id as string)}
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
          Add User <HiPlus size={17} />
        </Button>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record._id as string}
        loading={isFetching}
        pagination={{
          current: page,
          pageSize: limit,
          showSizeChanger: true,
          pageSizeOptions: ["10", "15", "20"],
          total: data?.totalUsers,
        }}
        onChange={handleTableChange}
        className="h-[80vh] overflow-y-scroll scrollbar-hide"
        scroll={{ x: "100%" }}
        size="small"
      />

      {/* Modal for adding user */}
      {isAddPostModalOpen && <UserCreatePopup visible={isAddPostModalOpen} setVisible={setIsAddPostModalOpen} />}
      {selectedUser && <ProfileEditPopup userId={selectedUser as string} show={isModalOpen} setShow={setIsModalOpen} />}
    </div>
  );
};

export default Page;
