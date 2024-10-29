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
import { UploadOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { CldUploadButton } from "next-cloudinary";
import { showMessage } from "@/components/ui/message";
import { TPostCategory } from "@/types";
import { useAddAPostMutation } from "@/redux/features/posts/postApi";

const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  { ssr: false }
);

if (typeof window !== "undefined" && GlobalQuill) {
  GlobalQuill.register("modules/emoji", Emoji);
}

const PostCreate = () => {
  const [addAPost, { isLoading,data }] = useAddAPostMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const [content, setContent] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [premium, setPremimum] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleThumbnailURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoURL(e.target.value);
  };

  const handlePost = async(formData: { title: string }) => {
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
      const result = await addAPost({data:data}).unwrap();
      console.log(result);
      showMessage({ type: "success", message: "Post created successfully" });
    } catch (error) {
      console.log(error);
      showMessage({ type: "error", message: "Post created successfully" });
    }

    setShowPopup(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
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
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "emoji",
  ];

  return (
    <div>
      <div className="quickPost mb-8 p-5 rounded-lg shadow-md" style={{
        backgroundColor: TokenProvider()?.colorBgContainer,
        borderColor: TokenProvider()?.colorBorder,
      }}>
        <div className="flex gap-3 pb-5 border-b" style={{
          borderColor: TokenProvider()?.colorBorder,
        }}>
          <Link href="/dashboard/profile">
            <Avatar style={{
              border: `3px solid ${TokenProvider()?.colorPrimary}`,
              backgroundColor: TokenProvider()?.colorPrimary,
              fontSize: "24px",
              verticalAlign: "middle",
              width: "52px",
              height: "52px",
            }} src={
              <Image
                src={currentUser?.profilePicture || (currentUser?.name[0].toUpperCase() as string)}
                alt="profile_photo"
                width={52}
                height={52}
              />
            }>S</Avatar>
          </Link>
          <Input
            placeholder={`What's on your mind ${currentUser?.name || ""}?`}
            className="ml-3 rounded-full"
            style={{
              backgroundColor: TokenProvider()?.colorBgBase,
            }}
            onClick={handlePopup}
          />
        </div>
        <div className="flex justify-between items-center pt-4 px-20">
          <Button type="text" onClick={handlePopup} icon={<Image src="/video.png" alt="video_icon" width={30} height={30} />}>Live video</Button>
          <Button type="text" onClick={handlePopup} icon={<Image src="/image.png" alt="image_icon" width={30} height={30} />}>Photo/Video</Button>
          <Button type="text" onClick={handlePopup} icon={<Image src="/emoji.png" alt="emoji_icon" width={30} height={30} />}>Feeling/Activity</Button>
        </div>
      </div>

      <Modal
        open={showPopup}
        onClose={handlePopup}
        onCancel={handlePopup}
        className="[&&_.ant-modal-content]:p-0 overflow-y-scroll scrollbar-hide"
        width={800}
        footer={null}
        style={{ borderRadius: "16px", padding: 0 }}
        centered
      >
        <Card bordered={false} className="mb-8 shadow-md !bg-transparent [&&_.ant-card-head-title]:text-center [&&_.ant-card-head-title]:text-2xl" title="Create post">
          <Form layout="vertical" className="h-full content-center" onFinish={handlePost}>
            <Form.Item label={<h4 style={{ color: TokenProvider()?.colorText }}>Post Title</h4>} name="title">
              <Input placeholder="Enter the post title" />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4 w-full">
            <Form.Item label={<h4 style={{ color: TokenProvider()?.colorText }}>Category</h4>} name="category">
              <Select placeholder="Select category" onChange={(value) => setCategory(value)}>
                <Select.Option value="Web">Web</Select.Option>
                <Select.Option value="Software Engineering">Software Engineering</Select.Option>
                <Select.Option value="AI">AI</Select.Option>
                <Select.Option value="Gadgets">Gadgets</Select.Option>
                <Select.Option value="Apps">Apps</Select.Option>
              </Select>
            </Form.Item>
              <Form.Item label={<h4 style={{ color: TokenProvider()?.colorText }}>Video URL</h4>} name="videoURL">
                <Input placeholder="Enter video URL" value={videoURL} onChange={handleThumbnailURLChange} />
              </Form.Item>
            </div>
              <Form.Item label={<h4 style={{ color: TokenProvider()?.colorText }}>Upload Thumbnail</h4>}>
                <Upload accept="image/*,video/*" listType="picture-card" fileList={fileList} openFileDialogOnClick={false}>
                  <CldUploadButton
                    uploadPreset="tech_mania_upload"
                    options={{ maxFiles: 3, maxFileSize: 1024 * 1024, multiple: true }}
                    className="px-6 py-2 rounded-md text-white w-full h-full"
                    onSuccess={(result: any) => {
                      const uploadedFile = {
                        uid: result.info.asset_id,
                        name: result.info.original_filename,
                        status: "done",
                        url: result.info.secure_url,
                      };
                      setFileList((prevFileList) => [...prevFileList, uploadedFile]);
                      message.success("File uploaded successfully.");
                    }}
                  ><UploadOutlined className="text-4xl"></UploadOutlined></CldUploadButton>
                </Upload>
              </Form.Item>

            <Form.Item>
              <ReactQuill value={content} onChange={handleChange} placeholder="Share your latest tech tips or guides..." modules={modules} formats={formats} className="h-[60vh] mb-10" theme="snow" style={{
                color: TokenProvider()?.colorPrimaryText,
                backgroundColor: TokenProvider()?.colorBgContainer,
                borderColor: TokenProvider()?.colorBorder,
              }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isLoading}>Post</Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default PostCreate;
