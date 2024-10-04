"use client";
import { setTheme } from "@/redux/features/theme/themeSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

export default function Home() {
  const dispatch = useAppDispatch();
  
  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Welcome to the Tech Blog</Title>
      <Title level={2}>Latest in Technology</Title>
      <Paragraph>
        Stay up to date with the latest in technology, coding best practices, and industry trends.
        Whether youre a beginner or a seasoned professional, we provide insights and tutorials to
        enhance your knowledge and skills.
      </Paragraph>
      <Typography.Text> Bringing the best insights to you.</Typography.Text>
      <Button type="primary" style={{ marginTop: '20px' }} onClick={()=>dispatch(setTheme(''))}>Read More</Button>

    </div>
  );
}
