"use client";
import Button from '@/components/ui/button/Button';
import { theme, Typography } from 'antd';

const { Title, Text } = Typography;

const CommunitySection = () => {
    const { token } = theme?.useToken();

  return (
    <div className="w-full py-20 flex justify-center" style={{backgroundColor: token?.communitySectionBg}}>
      <div className="max-w-6xl w-full px-6 flex flex-col gap-8 md:gap-32 md:flex-row items-center md:justify-between">
        {/* Left Side: Title and Description */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <Title level={2} className="text-3xl mb-4 !text-dark-primaryText">
            Join the Conversation
          </Title>
          <Text className="!text-dark-primaryText">
            Engage with our thriving community—ask questions, share tips, and connect with tech enthusiasts worldwide.
          </Text>
        </div>

        {/* Right Side: Call-to-Action Button */}
        <div className="flex justify-center md:justify-start">
          <Button
            type="default"
            size="large"
            href='/dashboard/feed'
            className='bg-dark-primary'
          >
            Visit the Community Forum
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
