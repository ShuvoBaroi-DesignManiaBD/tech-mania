/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import { IUser } from '@/types';
import dynamic from 'next/dynamic';
// import ProfileHeader from './layout/ProfileHeader';
// import LeftSidebar from './layout/LeftSidebar';
// import RightSidebar from './layout/RightSidebar';

// Dynamically import components
const ProfileHeader = dynamic(() => import("./layout/ProfileHeader"), { ssr: false });
const LeftSidebar = dynamic(() => import("./layout/LeftSidebar"), { ssr: false });
const RightSidebar = dynamic(() => import("./layout/RightSidebar"), { ssr: false });

export default function Page ({ params: { userId } }: { params: { userId: string } }) {
    // const params = new URLSearchParams(searchParams);
    // const userId = params.get("userId"); 
    console.log( userId);
    

  return (
    <div className="columns-1 space-y-8 pb-32">
      <ProfileHeader userId={userId}/>

      <div className="grid grid-cols-6 gap-8">
        {/* Left Sidebar: Profile Details */}
        <LeftSidebar userId={userId} className="col-span-2" />

        {/* Right Content: User's Posts */}
        <RightSidebar userId={userId} className="col-span-4"></RightSidebar>
      </div>
    </div>
  );
};
