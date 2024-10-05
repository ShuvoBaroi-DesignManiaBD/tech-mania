"use client";
import { Layout} from "antd";
import WrapperContainer from "./WrapperContainer.";

const { Content:ContentPart} = Layout;

const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <ContentPart style={{maxWidth:"100vw"}}>
            <WrapperContainer>
            {children}
            </WrapperContainer>
        </ContentPart>
    );
};

export default Content;