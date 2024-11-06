/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, Avatar, message, UploadFile } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CldUploadButton } from "next-cloudinary"; // Import Cloudinary upload button
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import {
  useGetAUserQuery,
  useUpdateAUserProfileMutation,
} from "@/redux/features/users/userApi";

function ProfileEditPopup({
  userId,
  show,
  setShow,
}: {
  userId: string;
  show: boolean;
  setShow: CallableFunction;
}) {
  const { data, refetch } = useGetAUserQuery(userId);
  const [updateAUserProfile, { isSuccess, isLoading }] =
    useUpdateAUserProfileMutation();
  const user = data?.data;
  const [fileList, setFileList] = useState<{ uid: string; name: string; status: string; url: string }[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio || "No bio yet",
      });
      if (user.profilePicture) {
        setFileList([
          {
            uid: "-1",
            name: "Profile Picture",
            status: "done",
            url: user.profilePicture,
          },
        ]);
      }
    }
  }, [user, form]);

  const handleUploadSuccess = (result: any) => {
    const uploadedFile = {
      uid: result.info.asset_id,
      name: result.info.original_filename,
      status: "done",
      url: result.info.secure_url,
    };
    setFileList([uploadedFile]); // Replace file instead of adding
    message.success("File uploaded successfully.");
  };

  const handleUpdate = async (values) => {
    const updatedData = {
      name: values.name,
      bio: values.bio,
      profilePicture: fileList[0]?.url || user?.profilePicture,
    };
    try {
      await updateAUserProfile({
        userId: userId,
        updatedData: updatedData,
      }).unwrap();
      if (isSuccess) {
        message.success("Profile updated successfully.");
        await refetch();
        setShow(false);
      }
    } catch (error) {
      console.log(error);
      
      message.error("Failed to update profile!");
    }
  };

  return (
    <Modal
      open={show}
      onCancel={() => setShow(false)}
      closable
      width="40vw"
      footer={null}
      centered
      style={{
        backgroundColor: TokenProvider()?.colorBgContainer,
        borderRadius: "16px",
      }}
    >
      <div style={{ padding: "16px" }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: user?.name,
            username: user?.username,
            email: user?.email,
            bio: user?.bio || "No bio yet",
          }}
          className="grid grid-cols-6 gap-x-3"
          onFinish={handleUpdate}
        >
          <Form.Item label="Profile Photo" className="col-span-full">
            <div className="flex gap-3 items-center">
              <Avatar
                size={120}
                src={fileList[0]?.url || user?.profilePicture}
                icon={<UserOutlined />}
              />
              <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList as UploadFile[]}
                showUploadList={false}
                openFileDialogOnClick={false}
              >
                <CldUploadButton
                  uploadPreset="tech_mania_upload"
                  options={{
                    maxFiles: 3,
                    maxFileSize: 1024 * 1024,
                    multiple: true,
                  }}
                  onSuccess={handleUploadSuccess}
                  className="size-full"
                ></CldUploadButton>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="col-span-3"
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item label="Username" name="username" className="col-span-3">
            <Input placeholder="Username" readOnly disabled />
          </Form.Item>

          <Form.Item label="Email" name="email" className="col-span-full">
            <Input placeholder="Email" readOnly disabled />
          </Form.Item>

          <Form.Item label="Bio" name="bio" className="col-span-full">
            <Input.TextArea rows={3} placeholder="Tell us about yourself" />
          </Form.Item>

          <Form.Item className="col-span-full">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%" }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default ProfileEditPopup;
