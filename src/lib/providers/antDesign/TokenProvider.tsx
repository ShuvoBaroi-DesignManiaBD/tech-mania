"use client";
import { GlobalToken, theme } from "antd";

const TokenProvider = () => {
  const { token }:{token:GlobalToken} = theme.useToken();
  return token;
};

export default TokenProvider;
