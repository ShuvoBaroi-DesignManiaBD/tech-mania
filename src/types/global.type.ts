import { GlobalToken, MappingAlgorithm } from "antd";

export type TTheme = "light" | "dark";

// export type TCustomTheme = {
//   token: AliasToken & {
//     homeHeroBg: string;
//     heroBg: string;
//     secondaryBorder: string;
//     communitySectionBg: string;
//     fontSizeHeading6: number;
//     lineHeightHeading6: number;
//     fontWeightHeading: number;
//     fontWeightBase: number;
//     titleFontWeight: number;
//     headingFontWeight: number;
//   };
//   components?: ComponentTokenMap & {
//     Layout?: {
//       headerBg: string,
//       footerBg: string,
//     }
//   };
// };

// Utility type to allow deep partial for overriding specific parts of GlobalToken
// type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
// };

// Extend GlobalToken with your custom properties
// export type TCustomTheme = DeepPartial<GlobalToken> & {
//   homeHeroBg?: string;
//   heroBg?: string;
//   secondaryBorder?: string;
//   communitySectionBg?: string;
// };

export type TCustomTokens = {
  homeHeroBg?: string;
  heroBg?: string;
  secondaryBorder?: string;
  communitySectionBg?: string;
  lineHeightHeading6: number;
  fontWeightBase: number;
  fontWeightHeading: number;
  fontSizeHeading6: number;
  titleFontWeight: number;
  headingFontWeight: number;
  lineHeightBase?: number;
};
export type TCustomTheme = {
  algorithm?: MappingAlgorithm | MappingAlgorithm[] | undefined;
  token: Partial<GlobalToken> & TCustomTokens;
  components: { Layout: { headerBg: string; footerBg: string } };
} ;
