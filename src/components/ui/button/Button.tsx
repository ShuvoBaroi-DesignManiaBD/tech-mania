"use client";
import { Button as AntButton } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import Link from "next/link";
import { ReactNode } from "react";

type TButton = {
  type?: BaseButtonProps["type"];
  icon?: ReactNode,
  size?: BaseButtonProps["size"];
  href?: string;
  children?: string | ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const Button = ({
  type = "default",
  size = "middle",
  href,
  icon=null,
  children,
  onClick,
  className = '',
  style = {}
}: TButton) => {
  // If `href` is provided, render the button with a `Link` wrapper
  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <AntButton type={type} size={size} className={className} style={style} icon={icon}>
          {children}
        </AntButton>
      </Link>
    );
  }

  return (
    <AntButton type={type} size={size} onClick={onClick} className={className} style={style} icon={icon}>
      {children}
    </AntButton>
  );
};

export default Button;
