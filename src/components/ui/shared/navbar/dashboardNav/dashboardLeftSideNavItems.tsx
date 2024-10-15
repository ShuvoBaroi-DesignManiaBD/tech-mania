// import { menuItem } from "@/types/menu.type";

import CustomLink from "@/components/ui/CustomLink";
import { HomeOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { ReactNode } from "react";

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
  { key: "4", icon: <SettingOutlined />, label: "About Us" },
  { key: "5", icon: <SettingOutlined />, label: "Support" },
];

export default dashboardNavItems;
