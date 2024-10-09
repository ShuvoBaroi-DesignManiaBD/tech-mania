import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { ReactNode } from 'react';

const ContentArea = ({children}:{children:ReactNode}) => {
    const { token } = theme.useToken();
    return (
        <Layout className="overflow-y-scroll scrollbar-hide" style={{backgroundColor:token?.colorBgBase}}>
        <Content className="w-[1080px] mx-auto h-full py-8 px-6" style={{backgroundColor:token?.colorBgBase}}>
          {children}
        </Content>
      </Layout>
    );
};

export default ContentArea;