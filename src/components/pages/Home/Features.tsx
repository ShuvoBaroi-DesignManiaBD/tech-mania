"use client";
import { Typography, Card, Flex } from 'antd';
import { DesktopOutlined, TeamOutlined, BellOutlined, DashboardOutlined } from '@ant-design/icons';
import "./feature.css"
import WrapperContainer from '@/components/ui/shared/WrapperContainer.';
const { Title, Text } = Typography;

const features = [
  {
    title: 'Expert Insights',
    description: 'Access detailed tutorials and insider knowledge curated by industry experts.',
    icon: <DesktopOutlined style={{ fontSize: '36px', color: '#1890ff' }} />,
  },
  {
    title: 'Community Support',
    description: 'Connect with like-minded enthusiasts, share your tips, and solve challenges together.',
    icon: <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />,
  },
  {
    title: 'Stay Updated',
    description: 'Never miss an update with our news feed featuring the latest in tech, trends, and innovations.',
    icon: <BellOutlined style={{ fontSize: '36px', color: '#eb2f96' }} />,
  },
  {
    title: 'Personalized Dashboard',
    description: 'Create a personalized profile to save your favorite tips and track your learning progress.',
    icon: <DashboardOutlined style={{ fontSize: '36px', color: '#fa8c16' }} />,
  },
];

const KeyFeatures = () => {
  return (
    <Flex className="w-full flex flex-col" >
      <WrapperContainer className='px-16 py-20 md:px-0'>

      {/* Section Title */}
      <div className="text-center mb-12">
        <Title level={2}>Why Join <br></br>Tech Tips & Tricks Hub?</Title>
        <Text className="">
          Explore the key features that make our platform the go-to place for tech enthusiasts.
        </Text>
      </div>

      {/* Feature Cards */}
      <div className='grid md:grid-cols-4 gap-5'>
        {features.map((feature, index) => (
            <Card
            key={index+1}
              hoverable
              className="shadow-md !self-stretch !h-full text-center md:text-left"
              style={{ borderRadius: '10px', padding: 28, height: '100%', alignSelf: "stretch !important" }}
              styles={{body: {padding: 0, margin: 0}  }}
              cover={<div className="flex justify-center items-center mb-5">{feature.icon}</div>}
              // loading
            >
              <Card.Meta
                title={<Title level={5}>{feature.title}</Title>}
                description={<Text>{feature.description}</Text>}
                className='!gap-0'
              />
            </Card>
        ))}
      </div>
      </WrapperContainer>
    </Flex>
  );
};

export default KeyFeatures;
