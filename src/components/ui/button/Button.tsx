"use client";
import { Button as AntButton } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import Link from "next/link";
import { ReactNode } from "react";

type TButton = {
  type?: BaseButtonProps["type"];
  size?: BaseButtonProps["size"];
  href?: string;
  children?: string | ReactNode
};

const Button = ({ type = "default", size = "middle", href = "/", children }: TButton) => {
  return (
    <AntButton type={type} size={size}>
      <Link href={href}>{children}</Link>
    </AntButton>
  );
};

export default Button;
