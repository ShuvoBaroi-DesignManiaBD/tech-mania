"use client";
import Button from "@/components/ui/button/Button";
import { selectCurrentUser, selectCurrentUserData } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Card, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { format } from "date-fns";

const LeftSidebar = ({className=''}):JSX.Element => {
  const user = useAppSelector(selectCurrentUser);
  // dispatch(setUserData(data?.data as IUser));
    const currentUser = useAppSelector(selectCurrentUserData) || user;
    return (
        <div
          className={`${className}`}
          style={{
            borderRadius: "8px",
          }}
        >
          <Card title="Profile Information" className="mb-4" bordered={false}>
            <Paragraph>
              {currentUser?.bio}
            </Paragraph>
            <Paragraph strong>
              Email:{" "}
              <Typography.Text className="font-normal">{currentUser?.email}</Typography.Text>
            </Paragraph>
            <Paragraph strong>
              Location:{" "}
              <Typography.Text className="font-normal">San Francisco, CA </Typography.Text>
            </Paragraph>
            <Paragraph strong>
              Member since:{" "}
              <Typography.Text className="[&&_strong]:font-normal">
                {user?.createdAt
                  ? format(new Date(user.createdAt), "MMMM dd, yyyy")
                  : "Unknown"}
              </Typography.Text>
            </Paragraph>

            {/* Follow & Message Buttons */}
            <div className="mt-12">
              <Button type="primary" className="w-full">
                Follow
              </Button>
              <Button className="mt-2 w-full">
                Message
              </Button>
            </div>
          </Card>
        </div>
    );
};

export default LeftSidebar;