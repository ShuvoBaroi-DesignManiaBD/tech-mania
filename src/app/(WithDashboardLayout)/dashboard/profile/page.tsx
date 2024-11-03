// "use client";

import dynamic from 'next/dynamic';

// Dynamically import components
const ProfileHeader = dynamic(() => import("./layout/ProfileHeader"), { ssr: false });
const LeftSidebar = dynamic(() => import("./layout/LeftSidebar"), { ssr: false });
const RightSidebar = dynamic(() => import("./layout/RightSidebar"), { ssr: false });

const Page = () => {
  return (
    <div className="columns-1 space-y-5 pb-32">
      <ProfileHeader />

      <div className="grid grid-cols-6 gap-5">
        {/* Left Sidebar: Profile Details */}
        <LeftSidebar className="col-span-2" />

        {/* Right Content: User's Posts */}
        <RightSidebar className="col-span-4"></RightSidebar>
      </div>
    </div>
  );
};

export default Page;
