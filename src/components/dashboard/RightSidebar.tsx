"use client";
import {
  selectCurrentUser,
  selectCurrentUserData,
  setUserData,
} from "@/redux/features/auth/authSlice";
import {
  useFollowAUserMutation,
  useGetCurrentUserQuery,
  useGetSuggestedUsersQuery,
  useUnFollowAUserMutation,
} from "@/redux/features/users/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, theme, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
// import Button from "../ui/button/Button";
import UserCardSkeleton from "../ui/Skeletons/UserCardSkeleton";
import { MdVerified } from "react-icons/md";
import { IUser } from "@/types";
import Link from "next/link";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";

const RightSidebar = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: userData, refetch } = useGetCurrentUserQuery(
    currentUser?._id as string
  );
  dispatch(setUserData(userData?.data as IUser));
  const User = useAppSelector(selectCurrentUserData) || currentUser;
  console.log("user ==>", User);

  const { data, isFetching, isSuccess } = useGetSuggestedUsersQuery({
    id: currentUser?._id as string,
  });

  const [followAUser] = useFollowAUserMutation();
  const [unFollowAUser] = useUnFollowAUserMutation();
  const users = data?.data || [];
  const { token } = theme.useToken();

  const handleFollow = (userId: string) => {
    followAUser({ userId: userId });
    refetch();
  };

  const handleUnfollow = (userId: string) => {
    unFollowAUser({ userId: userId });
    refetch();
  };
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
          <div
            className={`flex flex-col divide-y-2 divide-dark-textSecondary/15`}
          >
            {!isFetching &&
              isSuccess &&
              users?.map((user) => (
                <div
                  key={user?._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 py-3">
                    <Link href={`/dashboard/${user?._id}`}>
                      <Avatar
                        src={user.profilePicture}
                        icon={user.profilePicture || <UserOutlined />}
                        size={40}
                        className="mr-3"
                      />
                    </Link>
                    <div>
                      <div className="font-semibold !flex items-center gap-1">
                        <Typography.Text className="leading-[14px] !text-sm" >
                          <Link href={`/dashboard/${user._id}`}>
                            {user?.name}
                          </Link>
                        </Typography.Text>{" "}
                        <span>
                          {user?.verified && (
                            <MdVerified className="text-light-primaryTextHover size-3" />
                          )}
                        </span>
                      </div>
                      <Typography.Text className="!text-xs opacity-80">
                        {user?.username}
                      </Typography.Text>
                    </div>
                  </div>

                  {User?.following?.includes(user?._id as string) ? (
                    <Button
                      type="default"
                      size="small"
                      className="!text-xs hover:before:content-['Unfollow'] hover:before:content-center hover:before:rounded-[4px] hover:before:text-red-500 before:w-full before:h-full before:absolute before:top-0 before:left-0 hover:before:bg-[#250000] hover:before:z-20 hover:!border-red-700 hover:text-transparent"
                      onClick={() => handleUnfollow(user?._id as string)}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="small"
                      className="!text-xs"
                      onClick={() => handleFollow(user?._id as string)}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              ))}
            {isFetching &&
              [1, 2, 3, 4, 5].map((i) => (
                <UserCardSkeleton key={i}></UserCardSkeleton>
              ))}
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default RightSidebar;
