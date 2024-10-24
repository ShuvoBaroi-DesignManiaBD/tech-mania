"use client";
import { Flex, Spin } from "antd";

export default function loading() {
  return (
    <div>
      <Flex align="center" gap="middle" className="flex justify-center items-center !h-[60vh] !w-full !mx-auto">
        <Spin size="large" />
      </Flex>
    </div>
  );
}
