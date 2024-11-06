"use client";
import { selectCurrentUser, selectCurrentUserData } from "@/redux/features/auth/authSlice";
import { useFollowAUserMutation, useGetAUserQuery, useGetCurrentUserQuery, useUnFollowAUserMutation } from "@/redux/features/users/userApi";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types";
import { Button, Card, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { format } from "date-fns";
import { use, useEffect, useState } from "react";

const LeftSidebar = ({userId, className=''}:{userId?: string, className?: string}) => {
  const { data, isSuccess, refetch} = useGetAUserQuery(userId as string);
  const userData = data?.data;
  // const [userData, setUserData] = useState(data?.data);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setUserData(data?.data);
  //   }
  // }, [data, isSuccess]);
  // console.log('fetchedData ===>',data, userData);
  
  const user = useAppSelector(selectCurrentUser);
  // dispatch(setUserData(data?.data as IUser));
  const loggedInUser = useAppSelector(selectCurrentUserData);
  console.log('loggedInUser ==> ', loggedInUser);
  
  const [followAUser] = useFollowAUserMutation();
  const [unFollowAUser] = useUnFollowAUserMutation();
  const handleFollow = (userId: string) => {
    followAUser({ userId: userId });
    refetch();
  };

  const handleUnfollow = (userId: string) => {
    unFollowAUser({ userId: userId });
    refetch();
  };
    return (
        <div
          className={`${className}`}
          style={{
            borderRadius: "8px",
          }}
        >
          <Card title="Profile Information" className="mb-4" bordered={false}>
            <Paragraph>
              {userData?.bio}
            </Paragraph>
            <Paragraph strong>
              Email:{" "}
              <Typography.Text className="font-normal">{userData?.email}</Typography.Text>
            </Paragraph>
            <Paragraph strong>
              Location:{" "}
              <Typography.Text className="font-normal">{userData?.location || "Unknown"} </Typography.Text>
            </Paragraph>
            <Paragraph strong>
              Member since:{" "}
              <Typography.Text className="[&&_strong]:font-normal">
                {userData?.createdAt
                  ? format(new Date(userData.createdAt), "MMMM dd, yyyy")
                  : "Unknown"}
              </Typography.Text>
            </Paragraph>

            {/* Follow & Message Buttons */}
            <div className="mt-12">
            {loggedInUser?.following?.includes(userData?._id as string) ? (
                    <Button
                      type="default"
                      size="middle"
                      block
                      className="hover:before:content-['Unfollow'] hover:before:content-center hover:before:rounded-[4px] hover:before:text-red-500 before:w-full before:h-full before:absolute before:top-0 before:left-0 hover:before:bg-[#250000] hover:before:z-20 hover:!border-red-700 hover:text-transparent"
                      onClick={() => handleUnfollow(userData?._id as string)}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="middle"
                      block
                      className=""
                      onClick={() => handleFollow(userData?._id as string)}
                    >
                      Follow
                    </Button>
                  )}
              <Button className="mt-2 w-full">
                Message
              </Button>
            </div>
          </Card>
        </div>
    );
};

export default LeftSidebar;