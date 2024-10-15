"use client";
import WrapperContainer from "@/components/ui/shared/WrapperContainer.";
import { HeartOutlined, RocketOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, theme, Typography } from "antd";

const { Title } = Typography;

const OurMission = () => {
  const { token } = theme.useToken();
  return (
    <WrapperContainer className="py-16">
      {/* Mission Statement */}
      <section className="our-mission-section text-gray-600 body-font">
        <div className="md:w-1/3 mx-auto text-center mb-16">
          <Title
            level={2}
            className="sm:text-3xl text-2xl font-medium title-font text-gray-900"
          >
            Our Mission
          </Title>
          <Typography.Text className="text-base leading-relaxed xl:!w-1/4 lg:!w-1/4 mx-auto">
            At our core, we strive to create a positive impact through our dedication and values. Our mission is shaped by the following principles:
          </Typography.Text>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mission 1: Driving Innovation */}
              <Card
                hoverable
                cover={
                  <RocketOutlined
                    style={{
                      fontSize: "40px",
                      color: token?.colorPrimary,
                      padding: "20px",
                    }}
                  />
                }
                bordered={false}
                className="mission-card text-center py-3"
              >
                <div className="space-y-2 -mt-4">
                  <h4 className="text-xl font-semibold">Driving Innovation</h4>
                  <p className="">
                    We believe in transforming ideas into reality by constantly pushing the boundaries of technology and creativity. Our innovative solutions aim to inspire progress, making a tangible difference in the way industries and communities function.
                  </p>
                </div>
              </Card>

            {/* Mission 2: Building Compassion */}
              <Card
                hoverable
                cover={
                  <HeartOutlined
                    style={{
                      fontSize: "40px",
                      color: token?.colorPrimary,
                      padding: "20px",
                    }}
                  />
                }
                bordered={false}
                className="mission-card text-center py-3"
              >
                <div className="space-y-2 -mt-4">
                  <h4 className="text-xl font-semibold">Building Compassion</h4>
                  <p className="">
                    Compassion is at the heart of everything we do. Our goal is to prioritize people over profits, fostering a culture that values empathy and strives to uplift individuals and communities through meaningful initiatives.
                  </p>
                </div>
              </Card>

            {/* Mission 3: Fostering Collaboration */}
              <Card
                hoverable
                cover={
                  <TeamOutlined
                    style={{
                      fontSize: "40px",
                      color: token?.colorPrimary,
                      padding: "20px",
                    }}
                  />
                }
                bordered={false}
                className="mission-card text-center py-3"
              >
                <div className="space-y-2 -mt-4">
                  <h4 className="text-xl font-semibold">
                    Fostering Collaboration
                  </h4>
                  <p className="self-stretch">
                    Collaboration is the cornerstone of our success. We believe in the power of teamwork—building strong partnerships and nurturing relationships with clients, colleagues, and communities to achieve shared goals and drive mutual growth.
                  </p>
                </div>
              </Card>
          </div>
        </div>
      </section>
    </WrapperContainer>
  );
};

export default OurMission;
