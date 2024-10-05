import Content from "@/components/ui/shared/Content";
import Footer from "@/components/ui/shared/Footer";
import Header from "@/components/ui/shared/Header";
import { Flex } from "antd";

const layout = ({ children }: { children: React.ReactNode }) => {
  //   const {
  //     token: { colorBgContainer, borderRadiusLG },
  //   } = theme.useToken();
  return (
    <Flex vertical align="stretch" justify="space-between" className="min-h-screen max-w-[100vw]" style={{minHeight: "100vh", display:"flex"}}>
      <Header></Header>
      <Content>{children}</Content>
      <Footer></Footer>
    </Flex>
  );
};

export default layout;
