"use client";
import { Spin } from "antd";

export default function loading() {
    return (
      <div>
      <div className="flex justify-center items-center !h-[60vh] !w-full !mx-auto">
        <Spin size="large" />
      </div>
    </div>
    );
  }