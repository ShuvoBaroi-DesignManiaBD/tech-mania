"use client";
import { Button as AntButton } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import Link from "next/link";
import { ReactNode } from "react";

type TButton = {
  type?: BaseButtonProps["type"];
  color?: BaseButtonProps["color"];
  htmlType?: "submit" | "reset" | "button";
  icon?: ReactNode,
  size?: BaseButtonProps["size"];
  href?: string;
  children?: string | ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  shape?: BaseButtonProps["shape"];
};

const Button = ({
  type = "default",
  htmlType = "button",
  size = "middle",
  href,
  icon=null,
  children,
  onClick,
  className = '',
  style = {},
  shape = "default",
  color='default',
}: TButton) => {
  // If `href` is provided, render the button with a `Link` wrapper
  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <AntButton type={type} size={size} className={className} style={style} icon={icon} htmlType={htmlType} shape={shape} color={color}>
          {children}
        </AntButton>
      </Link>
    );
  }

  return (
    <AntButton type={type} size={size} onClick={onClick} className={className} style={style} icon={icon} htmlType={htmlType} color={color}>
      {children}
    </AntButton>
  );
};

export default Button;
