"use client";
import { Avatar, Card, Input, theme, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';

const RightSidebar = () => {
    const { token } = theme.useToken();
    return (
        <div>
        {/* Right Sidebar */}
      <Sider width={320} className="right-0 top-0 h-full border-l shadow-sm px-4" style={{backgroundColor:token?.colorBgContainer, borderColor: token?.colorBorder}}>
        <div className="px-4 py-8">
          {/* Search Bar */}
          <Input.Search placeholder="Search..." className="mb-6" />
          {/* Additional Cards */}
          <Card className="mb-4">
            <Title level={4}>What's Happening</Title>
            <Typography.Text>Some interesting news or updates go here.</Typography.Text>
          </Card>
          <Card>
            <Title level={4}>Suggested Users</Title>
            <div className="flex items-center mb-4">
              <Avatar size="large" src="https://via.placeholder.com/150" />
              <div className="ml-3">
                <Title level={5} className="mb-0">
                  Jane Doe
                </Title>
                <Typography.Text type="secondary">@janedoe</Typography.Text>
              </div>
            </div>
            <div className="flex items-center">
              <Avatar size="large" src="https://via.placeholder.com/150" />
              <div className="ml-3">
                <Title level={5} className="mb-0">
                  Alex Smith
                </Title>
                <Typography.Text type="secondary">@alexsmith</Typography.Text>
              </div>
            </div>
          </Card>
        </div>
      </Sider>
        </div>
    );
};

export default RightSidebar;