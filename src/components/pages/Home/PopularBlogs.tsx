"use client";
import React from "react";
import { Card, Button, Typography, theme, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import Title from "antd/es/typography/Title";
import WrapperContainer from "@/components/ui/shared/WrapperContainer.";

const { Meta } = Card;

const blogs = [
  {
    title: "Mastering React State Management",
    description:
      "Explore different state management techniques in React, including Context API, Redux, and more.",
    link: "/tutorials/react-state-management",
    category: "React",
  },
  {
    title: "Boost Your Productivity with Keyboard Shortcuts",
    description:
      "Unlock the full potential of your system with our comprehensive list of shortcuts for Windows and Mac.",
    link: "/tutorials/keyboard-shortcuts",
    category: "Productivity",
  },
  {
    title: "Beginner’s Guide to Git and GitHub",
    description:
      "Get started with version control and learn how to collaborate on code effortlessly.",
    link: "/tutorials/git-github",
    category: "Git & GitHub",
  },
];

const PopularBlogs = () => {
  const { token } = theme?.useToken();
  return (
    <div style={{ backgroundColor: token?.colorBgLayout }} className={`w-full text-center`}>
      <WrapperContainer className="!pt-0">
        {/* Section Title */}
        <Title level={2} className="font-bold mb-4">
          Popular Blogs
        </Title>
        <Typography.Text>Check out our top-rated guides, handpicked by the community.</Typography.Text>

        {/* Tutorial Cards Container */}
        <div className={`grid grid-cols-1 md:grid-cols-3 justify-center gap-8 !mt-10`}>
          {blogs.map((tutorial, index) => (
              <Card
              key={index+1}
                hoverable
                className="shadow-md text-start flex flex-col justify-between"
                styles={{body:{gap:10}}}
                cover={
                  <Image
                    alt={tutorial.title}
                    src={`https://via.placeholder.com/300x150?text=${encodeURIComponent(tutorial.title)}`}
                    width={500}
                    height={500}
                  />
                }
              >
                {/* Category Tag */}
                <div className="mb-2">
                  <Tag color="blue">{tutorial.category}</Tag>
                </div>

                <Meta title={tutorial.title} description={<p className="line-clamp-2">{tutorial.description}</p>} className="[&&_.ant-card-meta-detail]:space-y-2 !mt-5"/>

                {/* Learn More Button */}
                <div className="!pt-6">
                  <Link href={tutorial.link}>
                    <Button type="primary" block>
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="mt-12">
          <Link href="/tutorials">
            <Button>Browse All Tutorials</Button>
          </Link>
        </div>
      </WrapperContainer>
    </div>
  );
};

export default PopularBlogs;
