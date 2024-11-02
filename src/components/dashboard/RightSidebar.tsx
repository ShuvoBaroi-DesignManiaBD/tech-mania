"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useFollowAUserMutation, useGetSuggestedUsersQuery } from "@/redux/features/users/userApi";
import { useAppSelector } from "@/redux/hooks";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input, theme, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import Button from "../ui/button/Button";
import UserCardSkeleton from "../ui/Skeletons/UserCardSkeleton";
import { MdVerified } from "react-icons/md";

const RightSidebar = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  console.log(currentUser);
  
  const { data, isFetching, isSuccess } = useGetSuggestedUsersQuery({
    id: currentUser?._id as string,
  });

  const  [followAUser]  = useFollowAUserMutation();
  const users = data?.data || [];
  const { token } = theme.useToken();

  const handleFollow = (userId: string) => {
    followAUser({userId: userId})
  }
  return (
    <div>
      {/* Right Sidebar */}
      <Sider
        width={320}
        className="right-0 top-0 h-full border-l shadow-sm px-4"
        style={{
          backgroundColor: token?.colorBgContainer,
          borderColor: token?.colorBorder,
        }}
      >
        <div className="px-3 py-8">
          {/* Search Bar */}
          <Input.Search placeholder="Search..." className="mb-6" />
          <Title level={4}>People you may like</Title>
          <div className={`flex flex-col divide-y-2 divide-dark-textSecondary/15`}>
          {!isFetching && isSuccess && users?.map((user) => (
            <div key={user?._id} className="flex items-center justify-between">
              <div className="flex items-center gap-0 py-3">
                <Avatar
                  src={user.profilePicture}
                  icon={user.profilePicture || <UserOutlined />}
                  size={40}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold !flex items-center gap-1">
                    <Typography.Text className="leading-[14px] !text-sm">{user?.name}</Typography.Text> <span>{user?.verified && <MdVerified className="text-light-primaryTextHover size-3"/>}</span>
                  </div>
                  <Typography.Text className="!text-xs opacity-80">{user?.username}</Typography.Text>
                </div>
              </div>
              <Button type="primary" size="small" className="!text-xs" onClick={() => handleFollow(user?._id as string)}>
                Follow
              </Button>
            </div>
          ))}
          {isFetching && [1,2,3, 4, 5].map((i) => (
            <UserCardSkeleton key={i}></UserCardSkeleton>
          ))}
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default RightSidebar;
