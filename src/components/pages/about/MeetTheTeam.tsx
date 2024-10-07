"use client";
import { Typography, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";

const { Title } = Typography;

const teamMembers = [
    {
      name: "Shuvo Baroi",
      position: "Founder & Lead Developer",
      image: "https://i.ibb.co.com/4JRDX8Z/profile-pic-4.webp",
      bio: "Shuvo is a Well known Full Stack Developer expertise in React JS, Next JS, SQL, MongoDB, WordPress & UI/UX.",
    },
    {
      name: "Jane Smith",
      position: "Community Manager",
      image: "https://via.placeholder.com/150",
      bio: "Jane is responsible for fostering our vibrant community and ensuring that everyone has a positive experience on our platform.",
    },
    {
      name: "Mike Anderson",
      position: "Content Strategist",
      image: "https://via.placeholder.com/150",
      bio: "Mike oversees the creation of our guides and tutorials, ensuring that every piece of content meets our high-quality standards.",
    },
];


const MeetTheTeam = () => {
  return (
    <section className="text-center pb-24">
            <Title level={2} className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Meet Our Team
            </Title>
            <div className="md:w-1/3 mx-auto">
            <Typography.Text className="text-base leading-relaxed md:!w-1/2 mx-auto">
            Our team is composed of experienced developers, educators, and tech enthusiasts who share a common passion for making technology accessible.
            </Typography.Text>
            </div>

            {/* Team Members Cards */}
            <div className="flex flex-wrap justify-center gap-10 !pt-12">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <Image
                      alt={member.name}
                      src={member.image}
                      width={300}
                      height={300}
                      className="h-48 object-contain bg-gray-500"
                    />
                  }
                  className="shadow-md hover:shadow-lg transition-shadow"
                >
                  <Meta
                    title={
                      <span className="text-xl font-medium">{member.name}</span>
                    }
                    description={
                      <>
                        <span className="text-secondary text-base">
                          {member.position}
                        </span>
                        <p className="text-base mt-2">
                          {member.bio}
                        </p>
                      </>
                    }
                  />
                </Card>
              ))}
            </div>
          </section>
  );
};

export default MeetTheTeam;
