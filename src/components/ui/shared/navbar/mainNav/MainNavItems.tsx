// import { menuItem } from "@/types/menu.type";

import CustomLink from "@/components/ui/CustomLink";
import { MenuItemType } from "antd/es/menu/interface";

const MainNavItems: MenuItemType[] = [
  {
    key: 'home',
    label: <CustomLink href="/">Home</CustomLink>
  },
  {
    key: 'about',
    label: <CustomLink href="/about">About</CustomLink>,
  },
  {
    key: 'contact',
    label: <CustomLink href="/contact">contact</CustomLink>,
  },
];

export default MainNavItems;
