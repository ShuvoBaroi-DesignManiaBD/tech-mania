"use client";
import { Typography, Card } from "antd";

const { Title, Paragraph } = Typography;

const CoreValues = () => {
  return (
    <section className="mb-12">
      <Title level={2}>What We Stand For</Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Value 1 */}
        <Card className="text-center">
          <Title level={3}>Accessibility</Title>
          <Paragraph>
            We aim to make tech learning available to everyone, with resources that cater to various skill levels and learning styles.
          </Paragraph>
        </Card>
        {/* Value 2 */}
        <Card className="text-center">
          <Title level={3}>Community</Title>
          <Paragraph>
            We foster a positive and inclusive environment where people from all walks of life can share, support, and grow together.
          </Paragraph>
        </Card>
        {/* Value 3 */}
        <Card className="text-center">
          <Title level={3}>Quality Content</Title>
          <Paragraph>
            We prioritize creating in-depth, accurate, and practical content that brings real value to our users.
          </Paragraph>
        </Card>
      </div>
    </section>
  );
};

export default CoreValues;
