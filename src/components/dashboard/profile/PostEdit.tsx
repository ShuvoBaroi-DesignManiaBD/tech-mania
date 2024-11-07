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
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { Quill as GlobalQuill } from "react-quill";
import Emoji from "quill-emoji";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { UploadOutlined } from "@ant-design/icons";
import { CldUploadButton } from "next-cloudinary";
import { showMessage } from "@/components/ui/message";
import { IPost, TPostCategory } from "@/types";
import { useGetAPostQuery, useUpdateAPostMutation } from "@/redux/features/posts/postApi";

const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  { ssr: false }
);

if (typeof window !== "undefined" && GlobalQuill) {
  GlobalQuill.register("modules/emoji", Emoji);
}

const PostEdit = ({
  postData,
  setShowPopup,
  showPopup,
}: {
  postData: IPost;
  setShowPopup: CallableFunction;
  showPopup: boolean;
}) => {
  const [updateAPost, { isLoading }] = useUpdateAPostMutation();
  const { data, refetch, isFetching } = useGetAPostQuery(postData?._id || "");
  const post = (data as any)?.data || {};
//   const currentUser = useAppSelector(selectCurrentUser);
  const [content, setContent] = useState<string>(post?.content || "");
  const [videoURL, setVideoURL] = useState<string>(post?.video || "");
  const [fileList, setFileList] = useState<any[]>(
    post?.images?.map((url, index) => ({
      uid: index.toString(),
      name: `Image ${index + 1}`,
      status: "done",
      url,
    })) || []
  );
  const [category, setCategory] = useState<string>(post?.category || "");

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handlePopup = () => {
    setShowPopup(false);
  };

  const handleThumbnailURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoURL(e.target.value);
  };

  const handlePost = async (formData: { title: string }) => {
    const data = {
      title: formData.title,
      content: content,
      video: videoURL,
      images: fileList.map((file) => file.url) as string[],
      category: category as TPostCategory,
    };
    try {
      await updateAPost({ postId: post._id, updatedPost: data }).unwrap();
      showMessage({ type: "success", message: "Post updated successfully!" });
    } catch (error) {
      console.log(error);
      showMessage({ type: "error", message: "Something went wrong!" });
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

  useEffect(() => {
    if (postData) {
      setFileList(
        postData?.images?.map((url, index) => ({
          uid: index.toString(),
          name: `Image ${index + 1}`,
          status: "done",
          url,
        })) || []
      )
      setContent(postData?.content || "");
      setVideoURL(postData?.video || "");
      setCategory(postData?.category || "");
      // refetch();
    }
  }, [postData]);

  return (
    <div>
      <Modal
        open={showPopup}
        loading={isFetching}
        onClose={handlePopup}
        onCancel={handlePopup}
        className="[&&_.ant-modal-content]:p-0 overflow-hidden h-[95vh]"
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
          <Form layout="vertical" className="h-full" onFinish={handlePost}>
            <div className="max-h-[80vh] overflow-y-scroll scrollbar-hide">
              <Form.Item
                label={
                  <h4 style={{ color: TokenProvider()?.colorText }}>
                    Post Title
                  </h4>
                }
                name="title"
                initialValue={post?.title}
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
                  initialValue={post?.category}
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
                  initialValue={post?.video}
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
                  onRemove={(file) => {
                    setFileList((prevFileList) =>
                      prevFileList.filter((item) => item.uid !== file.uid)
                    );
                  }}
                  showUploadList={{ showPreviewIcon: false }}
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
                    />
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
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isLoading}>
                Update post
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default PostEdit;
