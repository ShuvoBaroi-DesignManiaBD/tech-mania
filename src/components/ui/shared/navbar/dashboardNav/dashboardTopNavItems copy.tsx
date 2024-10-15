// import { menuItem } from "@/types/menu.type";

import { HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { MenuItemType } from "antd/es/menu/interface";
// import { MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";
// import { ReactNode } from "react";

export type menuItemType = 'submenu' | 'otherType';

// type TChildItem = MenuItemType & {
//   key?: string;
//   label?: string | ReactNode;
//   type?: string;
// }
// type TItem = MenuItemType & {
//   children?: TChildItem[];
// };

const dashboardTopNavItems: MenuItemType[] = [
  {
    key: "dashboard",
    icon: <Link href="/dashboard"><HomeOutlined className="[&&_svg]:w-[70px] [&&_svg]:h-7 text-center pl-3"/></Link>
  },
  {
    key: "profile",
    icon: <Link href="/dashboard/profile"><UserOutlined className="[&&_svg]:w-[70px] [&&_svg]:h-7 text-center pl-3"/></Link>
  },
  {
    key: "groups",
    icon: <Link href="/dashboard/groups"><TeamOutlined className="[&&_svg]:w-[70px] [&&_svg]:h-7 text-center pl-3"/></Link>
  },
];

export default dashboardTopNavItems;
