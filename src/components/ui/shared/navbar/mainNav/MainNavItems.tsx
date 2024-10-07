// import { menuItem } from "@/types/menu.type";

import { MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";

const MainNavItems: MenuItemType[] = [
  {
    key: 1,
    label: <Link href="/">Home</Link>
  },
  {
    key: 2,
    label: <Link href="/about">About</Link>,
  },
  {
    key: 4,
    label: <Link href="/contact">contact</Link>,
  },
];

export default MainNavItems;
