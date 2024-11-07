import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { ReactNode } from 'react';

const ContentArea = ({children, width="1080px", className=""}:{children:ReactNode, width?:string, className?:string}) => {
    const { token } = theme.useToken();
    return (
        <Layout className="overflow-y-scroll scrollbar-hide" style={{ backgroundColor: token?.colorBgBase }}>
            <Content
                className={`mx-auto h-full py-8 px-6 ${className}`}
                style={{
                    backgroundColor: token?.colorBgBase,
                    width: width, // Set the width dynamically here
                }}
            >
                {children}
            </Content>
        </Layout>
    );
};

export default ContentArea;
