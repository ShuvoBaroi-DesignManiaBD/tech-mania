/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Upload,
  Select,
  message,
} from "antd";
import dynamic from "next/dynamic";
import React, { use, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Quill's snow theme CSS
import "quill-emoji/dist/quill-emoji.css"; // Emoji plugin CSS
import { Quill as GlobalQuill } from "react-quill";
import Emoji from "quill-emoji";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import Image from "next/image";
import Link from "next/link";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentUser,
  selectCurrentUserData,
} from "@/redux/features/auth/authSlice";
import { CldUploadButton } from "next-cloudinary";
import { showMessage } from "@/components/ui/message";
import { TPostCategory } from "@/types";
import { useAddAPostMutation } from "@/redux/features/posts/postApi";
import CheckoutModel from "@/app/(WithUserDashboardLayout)/pricing/component/CheckoutModel";

const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  { ssr: false }
);

if (typeof window !== "undefined" && GlobalQuill) {
  GlobalQuill.register("modules/emoji", Emoji);
}

const PostCreate = ({isModalVisible, setIsModalVisible}:{isModalVisible: boolean, setIsModalVisible: CallableFunction}) => {
  const [addAPost, { isLoading, data }] = useAddAPostMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserData = useAppSelector(selectCurrentUserData);
  const [content, setContent] = useState<string>("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [videoURL, setVideoURL] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [premium, setPremimum] = useState<boolean>(false);

  const profilePhoto = currentUser?.profilePicture;
  const fallbackInitial = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : null;
  const handleChange = (value: string) => {
    setContent(value);
  };

  const handlePopup = () => {
      return setIsModalVisible(!isModalVisible);
  };

  const handleThumbnailURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoURL(e.target.value);
  };

  const handlePost = async (formData: { title: string }) => {
    const data = {
      author: currentUser?._id || "",
      title: formData.title,
      content: content,
      video: videoURL,
      images: fileList.map((file) => file.url) as string[],
      category: category as TPostCategory,
      isPremimum: currentUser?.verified === false ? false : premium,
    };
    console.log(data);
    try {
      const result = await addAPost({ data: data }).unwrap();
      console.log(result);
      showMessage({ type: "success", message: "Post created successfully" });
    } catch (error) {
      console.log(error);
      showMessage({ type: "error", message: "Post created successfully" });
    }

    setShowPopup(false);
  };

  const font = GlobalQuill.import("formats/font");
  font.whitelist = ["sans-serif", "serif", "monospace"];
  GlobalQuill.register(font, true);
  const modules = {
    toolbar: [
      [{ font: font.whitelist }],
      [{ header: [3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["emoji"],
      ["clean"],
    ],
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "align",
    "bullet",
    "link",
    "image",
    "video",
    "emoji",
  ];

  return (
    <div>
      <Modal
        open={isModalVisible}
        onClose={handlePopup}
        onCancel={handlePopup}
        className="[&&_.ant-modal-content]:p-0 overflow-y-scroll scrollbar-hide"
        width={800}
        footer={null}
        style={{ borderRadius: "16px", padding: 0 }}
        centered
      >
        <Card
          bordered={false}
          className="mb-8 shadow-md !bg-transparent [&&_.ant-card-head-title]:text-center [&&_.ant-card-head-title]:text-2xl"
          title="Create post"
        >
          <Form
            layout="vertical"
            className="h-full content-center"
            onFinish={handlePost}
          >
            <Form.Item
              label={
                <h4 style={{ color: TokenProvider()?.colorText }}>
                  Post Title
                </h4>
              }
              name="title"
            >
              <Input placeholder="Enter the post title" />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Form.Item
                label={
                  <h4 style={{ color: TokenProvider()?.colorText }}>
                    Category
                  </h4>
                }
                name="category"
              >
                <Select
                  placeholder="Select category"
                  onChange={(value) => setCategory(value)}
                >
                  <Select.Option value="Web">Web</Select.Option>
                  <Select.Option value="Software Engineering">
                    Software Engineering
                  </Select.Option>
                  <Select.Option value="AI">AI</Select.Option>
                  <Select.Option value="Gadgets">Gadgets</Select.Option>
                  <Select.Option value="Apps">Apps</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <h4 style={{ color: TokenProvider()?.colorText }}>
                    Video URL
                  </h4>
                }
                name="videoURL"
              >
                <Input
                  placeholder="Enter video URL"
                  value={videoURL}
                  onChange={handleThumbnailURLChange}
                />
              </Form.Item>
            </div>
            <Form.Item
              label={
                <h4 style={{ color: TokenProvider()?.colorText }}>
                  Upload Thumbnail
                </h4>
              }
            >
              <Upload
                accept="image/*,video/*"
                listType="picture-card"
                fileList={fileList}
                openFileDialogOnClick={false}
              >
                <CldUploadButton
                  uploadPreset="tech_mania_upload"
                  options={{
                    maxFiles: 3,
                    maxFileSize: 1024 * 1024,
                    multiple: true,
                  }}
                  className="px-6 py-2 rounded-md text-white w-full h-full"
                  onSuccess={(result: any) => {
                    const uploadedFile = {
                      uid: result.info.asset_id,
                      name: result.info.original_filename,
                      status: "done",
                      url: result.info.secure_url,
                    };
                    setFileList((prevFileList) => [
                      ...prevFileList,
                      uploadedFile,
                    ]);
                    message.success("File uploaded successfully.");
                  }}
                >
                  <UploadOutlined
                    className="text-4xl"
                    style={{ color: TokenProvider()?.colorText }}
                  ></UploadOutlined>
                </CldUploadButton>
              </Upload>
            </Form.Item>

            <Form.Item>
              <ReactQuill
                value={content}
                onChange={handleChange}
                placeholder="Share your latest tech tips or guides..."
                modules={modules}
                formats={formats}
                className="h-[60vh] mb-10"
                theme="snow"
                style={{
                  color: TokenProvider()?.colorPrimaryText,
                  backgroundColor: TokenProvider()?.colorBgContainer,
                  borderColor: TokenProvider()?.colorBorder,
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Post
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
      {currentUser?.role !== "admin" && <CheckoutModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      ></CheckoutModel>}
    </div>
  );
};

export default PostCreate;
