"use client";
import { MdVerified } from "react-icons/md";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import {
  selectCurrentUser,
  selectCurrentUserData,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import ProfileEditPopup from "../components/ProfileEditPopup";

const ProfileHeader = () => {
  const user = useAppSelector(selectCurrentUser);
  const [showEditPopup, setShowEditPopup] = useState(false);
  // dispatch(setUserData(data?.data as IUser));
  const currentUser = useAppSelector(selectCurrentUserData) || user;
  const profilePhoto = currentUser?.profilePicture;
  const fallbackInitial = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : null;

  return (
    <Card
      className="shadow-md mb-8 p-0"
      bordered={false}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        color: TokenProvider().colorText,
      }}
    >
      <div className="flex justify-between items-center gap-32">
        <div className="flex gap-5">
          {/* Profile Picture */}
          <div className="text-center mb-4 sm:mb-0">
            <Avatar
              size={110}
              src={currentUser?.profilePicture}
              className="border-2 border-gray-300 !text-[70px]"
              alt={`${currentUser?.name}'s Profile`}
              style={{ backgroundColor: TokenProvider().colorBgElevated }}
            >
              {profilePhoto ? null : fallbackInitial}
            </Avatar>
          </div>

          {/* User Info */}
          <div className="">
            <div className="flex flex-col gap-2">
              {/* User Name & Verified Badge */}
              <Title
                level={4}
                className="flex items-center !mb-0 !leading-0 gap-1"
                style={{ color: TokenProvider().colorText }}
              >
                {currentUser?.name}
                {currentUser?.verified && (
                  <MdVerified className="text-light-primaryTextHover size-5" />
                )}
              </Title>
              <Typography.Text className="!text-sm leading-0 mb-2 -mt-1">
                {currentUser?.username
                  ? `@${currentUser?.username}`
                  : currentUser?.email}
              </Typography.Text>

              {/* Buttons for Actions */}
              <Space>
                <Button
                  icon={<EditOutlined />}
                  type="primary"
                  size="small"
                  className="text-[14px]"
                  onClick={() => setShowEditPopup(true)}
                >
                  Edit
                </Button>
                <Button type="default" size="small" className="text-sm">
                  Settings
                </Button>
              </Space>
            </div>
          </div>
        </div>

        {/* Post, Followers, and Following Counts */}
        <div className="mt-4 sm:mt-0 text-center sm:text-left flex gap-10 flex-grow justify-evenly">
          <div className="flex-grow text-center">
            <Title level={4}>
              {user?.numberOfPosts === 0 ? "N/A" : currentUser?.numberOfPosts}
            </Title>
            <Typography.Text>Posts</Typography.Text>
          </div>
          <div className="flex-grow text-center">
            <Title level={4}>
              {currentUser?.followers?.length === 0
                ? "N/A"
                : currentUser?.followers?.length}
            </Title>
            <Typography.Text>Followers</Typography.Text>
          </div>
          <div className="flex-grow text-center">
            <Title level={4}>
              {currentUser?.following?.length === 0
                ? "N/A"
                : currentUser?.following?.length}
            </Title>
            <Typography.Text>Following</Typography.Text>
          </div>
        </div>
      </div>
      {showEditPopup && (
        <ProfileEditPopup
          userId={currentUser?._id || ""}
          show={showEditPopup}
          setShow={setShowEditPopup}
        />
      )}
    </Card>
  );
};

export default ProfileHeader;
