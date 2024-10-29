"use client";
import Button from "@/components/ui/button/Button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Card, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { format } from "date-fns";

const LeftSidebar = ({className=''}):JSX.Element => {
    const currentUser = useAppSelector(selectCurrentUser);
    return (
        <div
          className={`${className}`}
          style={{
            borderRadius: "8px",
          }}
        >
          <Card title="Profile Information" className="mb-4" bordered={false}>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              scelerisque euismod nunc ut feugiat. Vivamus suscipit justo nec
              odio fermentum, non viverra lorem venenatis.
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
                {currentUser?.createdAt
                  ? format(new Date(currentUser.createdAt), "MMMM dd, yyyy")
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