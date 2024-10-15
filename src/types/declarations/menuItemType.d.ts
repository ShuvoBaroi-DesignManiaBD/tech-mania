// File where you want to extend MenuItemType (TChildItem.ts)

import 'antd/es/menu/interface'; // Path to the original MenuItemType file

declare module 'antd/es/menu/interface' {
  interface MenuItemType {
    key?: string;
    label?: string | React.ReactNode;
    type?: string;
  }
}

// Now you can define TChildItem that automatically has the new properties
// export interface TChildItem extends MenuItemType {
  
// }
