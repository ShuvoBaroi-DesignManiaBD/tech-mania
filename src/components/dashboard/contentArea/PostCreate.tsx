"use client";
// @typescript-eslint/no-unused-vars
import { Avatar, Button, Card, Form, Input, Modal,} from "antd";
import dynamic from "next/dynamic";
import React, { useState} from "react";
import "react-quill/dist/quill.snow.css"; // Quill's snow theme CSS
import "quill-emoji/dist/quill-emoji.css"; // Emoji plugin CSS
// Import Quill and the emoji module
import { Quill as GlobalQuill } from "react-quill";
import Emoji from "quill-emoji";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import Image from "next/image";
import Link from "next/link";

// Import ReactQuill dynamically to avoid SSR issues in Next.js
const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  { ssr: false }
);

// Register the emoji module only once
if (typeof window !== "undefined" && GlobalQuill) {
  GlobalQuill.register("modules/emoji", Emoji);
}

const PostCreate = () => {
  const [content, setContent] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  console.log(content);
  
  const handleChange = (value: string) => {
    setContent(value);
  };

  const handlePopup = () => {
    return setShowPopup(!showPopup)
  }
  // Define the toolbar options including emoji support
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["emoji"], // Emoji support
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
      <div
        className="quickPost mb-8 p-5 rounded-lg shadow-md"
        style={{
          backgroundColor: TokenProvider()?.colorBgContainer,
          borderColor: TokenProvider()?.colorBorder,
        }}
      >
        <div
          className="flex gap-3 pb-5 border-b"
          style={{
            borderColor: TokenProvider()?.colorBorder,
          }}
        >
          <Link href="/dashboard/profile">
          
          <Avatar
            style={{
              border: `3px solid ${TokenProvider()?.colorPrimary}`,
              backgroundColor: TokenProvider()?.colorPrimary,
              fontSize: "24px",
              verticalAlign: "middle",
              width: "52px",
              height: "52px",
            }}
            src={
              <Image
                src="https://i.ibb.co/4JRDX8Z/profile-pic-4.webp"
                alt="profile_photo"
                width={52}
                height={52}
              />
            }
          >
            S
          </Avatar>
          </Link>
          <Input
            placeholder="What's on your mind Shuvo?"
            className="ml-3 rounded-full"
            style={{
              backgroundColor: TokenProvider()?.colorBgBase,
            }}
            onClick={handlePopup}
          ></Input>
        </div>
        <div className="flex justify-between items-center pt-4 px-20">
          <Button type="text" onClick={handlePopup} icon={<Image src="/video.png" alt="video_icon" width={30} height={30}></Image>}>Live video</Button>
          <Button type="text" onClick={handlePopup} icon={<Image src="/image.png" alt="video_icon" width={30} height={30}></Image>}>Photo/Video</Button>
          <Button type="text" onClick={handlePopup} icon={<Image src="/emoji.png" alt="video_icon" width={30} height={30}></Image>}>Feeling/Activity</Button>
        </div>
      </div>
      <Modal open={showPopup}
        onClose={handlePopup}
        onCancel={handlePopup}
        width={700}
        footer={null}
        style={{ borderRadius: "16px", padding: 0}}
        styles={{body:{padding: 0}}}
        className="[&&_.ant-modal-content]:p-0"
        centered>
          <Card bordered={false} className="mb-8 shadow-md !bg-transparent [&&_.ant-card-head-title]:text-center [&&_.ant-card-head-title]:text-2xl " title="Create post">
        <Form layout="vertical" className="h-full content-center">
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
                backgroundColor: TokenProvider()?.colorBgContainer, // Quill editor background
                borderColor: TokenProvider()?.colorBorder, // Quill editor border color
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Post
            </Button>
          </Form.Item>
        </Form>
      </Card>
        </Modal>
    </div>
  );
};

export default PostCreate;
