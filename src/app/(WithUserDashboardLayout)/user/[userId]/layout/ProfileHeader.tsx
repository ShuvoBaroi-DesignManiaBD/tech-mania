"use client";
import { MdVerified } from "react-icons/md"; 
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { Avatar, Card, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useGetAUserQuery } from "@/redux/features/users/userApi";

const ProfileHeader = ({userId=''}: {userId?: string}) => {
  const { data } = useGetAUserQuery(userId || '');
  const userData = data?.data;
  const profilePhoto = userData?.profilePicture;
    const fallbackInitial = userData?.name ? userData?.name[0].toUpperCase() : null;
  // dispatch(setUserData(data?.data as IUser));
    
    return (
        <Card
        className="shadow-md mb-8 p-0"
        bordered={false}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          color: TokenProvider().colorText
        }}
      >
        <div className="flex justify-between items-center gap-32">
          <div className="flex gap-3 items-center">
            {/* Profile Picture */}
            <div className="text-center mb-4 sm:mb-0">
              <Avatar
                size={80}
                src={userData?.profilePicture}
                className="border-2 border-gray-300 !text-[50px]"
                alt={`${userData?.name}'s Profile`}
              style={{ backgroundColor: TokenProvider().colorBgElevated }}
            >
              {profilePhoto ? null : fallbackInitial}
            </Avatar>
            </div>

            {/* User Info */}
            <div className="">
              <div className="flex flex-col gap-3">
                {/* User Name & Verified Badge */}
                <Title
                  level={4}
                  className="flex items-center !mb-0 !leading-0 gap-1"
                  style={{color: TokenProvider().colorText}}
                >
                  {userData?.name}
                  {userData?.verified && <MdVerified className="text-light-primaryTextHover size-4"/>}
                </Title>
                <Typography.Text className="!text-sm leading-0 mb-2 -mt-1">
                  {userData?.username ? `@${userData?.username}` : userData?.email}
                </Typography.Text>
               
              </div>
            </div>
          </div>

          {/* Post, Followers, and Following Counts */}
          <div className="mt-4 sm:mt-0 text-center sm:text-left flex gap-10 flex-grow justify-evenly">
            <div className="flex-grow text-center">
              <Title level={4}>{userData?.numberOfPosts === 0 ? "N/A" : userData?.numberOfPosts}</Title>
              <Typography.Text>Posts</Typography.Text>
            </div>
            <div className="flex-grow text-center">
              <Title level={4}>{userData?.followers?.length === 0 ? "N/A" : userData?.followers?.length}</Title>
              <Typography.Text>Followers</Typography.Text>
            </div>
            <div className="flex-grow text-center">
              <Title level={4}>{userData?.following?.length === 0 ? "N/A" : userData?.following?.length}</Title>
              <Typography.Text>Following</Typography.Text>
            </div>
          </div>
        </div>
      </Card>
    );
};

export default ProfileHeader;