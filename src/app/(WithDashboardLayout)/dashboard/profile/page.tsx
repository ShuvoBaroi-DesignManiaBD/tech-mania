"use client";
import ProfileHeader from "./layout/ProfileHeader";
import LeftSidebar from "./layout/LeftSidebar";
import RightSidebar from "./layout/RightSidebar";
import { useGetAUserQuery } from "@/redux/features/users/userApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/types";

const Page = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  console.log(currentUser);
  
  const { data, isSuccess , isFetching} = useGetAUserQuery(currentUser?._id as string);
  
  return (
    <div className="columns-1 space-y-5 pb-32">
      <ProfileHeader user={data?.data as IUser} success={isSuccess} fetching={isFetching}/>

      <div className="grid grid-cols-6 gap-5">
        {/* Left Sidebar: Profile Details */}
        <LeftSidebar className="col-span-2"/>

        {/* Right Content: User's Posts */}
        <RightSidebar className="col-span-4"></RightSidebar>
      </div>
    </div>
  );
};

export default Page;
