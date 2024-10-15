// File where you want to extend MenuItemType (TChildItem.ts)

import "antd"; // Path to the original MenuItemType file
import { TCustomTokens } from "../global.type";
import  "antd/es/theme/interface";

// declare module "antd" {
//   interface ThemeConfig {
//     token?: Partial<AliasToken> & Partial<TCustomTokens>;
//   }
// }

declare module "antd/es/theme/interface" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AliasToken extends TCustomTokens {}
}


// Now you can define TChildItem that automatically has the new properties
// export interface TChildItem extends MenuItemType {
  
// }
