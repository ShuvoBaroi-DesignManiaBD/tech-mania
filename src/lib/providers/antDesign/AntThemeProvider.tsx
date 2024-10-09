"use client";
import { ReactNode } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentTheme } from "@/redux/features/theme/themeSlice";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const AntThemeProvider = ({ children }: { children: ReactNode }) => {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";
  const { token } = theme?.useToken();
  return (
    <ConfigProvider theme={isDark ? darkTheme : lightTheme}>
      <div className={`antialiased min-h-screen`}>
        <AntdRegistry>
          <Layout className="!min-h-screen">{children}</Layout>
        </AntdRegistry>
      </div>
    </ConfigProvider>
  );
};

export default AntThemeProvider;
