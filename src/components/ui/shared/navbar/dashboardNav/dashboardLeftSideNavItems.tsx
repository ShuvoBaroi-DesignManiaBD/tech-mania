// import { menuItem } from "@/types/menu.type";

import CustomLink from "@/components/ui/CustomLink";
import {  HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { BiSupport } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";

type TChildItem = {
  key?: string;
  label?: string | ReactNode;
  type?: string;
  icon?: ReactNode;
};
// type TItem = MenuItemType & {
//   children?: TChildItem[];
// };

const dashboardNavItems: TChildItem[] = [
  {
    key: "dashboard",
    label: <CustomLink href="/dashboard">Dashboard</CustomLink>,
    icon: <HomeOutlined />
  },
  {
    key: "profile",
    label: <CustomLink href="/dashboard/profile">Profile</CustomLink>,
    icon: <UserOutlined />
  },
  {
    key: "groups",
    label: <CustomLink href="/dashboard/groups">Groups</CustomLink>,
    icon: <TeamOutlined />
  },
  { type: "divider" },
  { type: "group" },
  { key: "4", icon: <FaHandHoldingDollar />, label: <CustomLink href="pricing">Pricing</CustomLink> },
  { key: "5", icon: <TeamOutlined />, label: "About Us" },
  { key: "6", icon: <BiSupport />, label: "Support" },
];

export default dashboardNavItems;
