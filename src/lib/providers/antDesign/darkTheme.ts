import { theme } from "antd";

// Dark theme tokens
export const darkTheme = {
  algorithm: theme.darkAlgorithm,
    token: {
      // -------- Color Tokens --------
      // Primary Colors
      colorPrimary: "#3B82F6", // Bright Blue for primary actions
      colorPrimaryBg: "#1E293B", // Background for primary buttons
      colorPrimaryHover: "#2563EB", // Hover state for primary buttons
      colorPrimaryTextHover: "#60A5FA", // Hover text color for primary buttons
      colorPrimaryText: "#FFFFFF", // Text color for primary buttons

      // Neutral Colors
      colorBgBase: "#1E293B", // Background color for the layout
      colorText: "#C9D1D9", // Base text color (Light Gray)
      colorTextHeading: "#58A6FF", // Text color for headings (Blue)
      colorTextSecondary: "#8B949E", // Text color for secondary text
      colorBorder: "#30363D", // Border color for dividers and components

      // Backgrounds
      colorBgContainer: "#161B22", // Container backgrounds (cards, modals, etc.)
      colorBgElevated: "#21262D", // Elevated component backgrounds (hovered states)

      // Success & Error
      colorSuccess: "#4CAF50", // Success color
      colorError: "#F85149", // Error color

      // -------- Typography Tokens --------
      fontFamily: "Inter, sans-serif", // Using 'Inter' as the primary font

      // Base Font Sizes
      fontSize: 16, // Base font size for body text (16px)
      fontSizeSM: 14, // Small text size (14px)
      fontSizeLG: 18, // Large text size (18px)
      fontSizeXL: 20, // Extra-large text size (20px)

      // Custom Heading Font Sizes
      fontSizeHeading1: 40, // H1 - 40px
      fontSizeHeading2: 32, // H2 - 32px
      fontSizeHeading3: 28, // H3 - 28px
      fontSizeHeading4: 24, // H4 - 24px
      fontSizeHeading5: 20, // H5 - 20px
      fontSizeHeading6: 16, // H6 - 16px

      // Line Heights
      lineHeightBase: 1.6, // Default line height for body text
      lineHeightHeading1: 1.3, // Line height for H1
      lineHeightHeading2: 1.4, // Line height for H2
      lineHeightHeading3: 1.4, // Line height for H3
      lineHeightHeading4: 1.5, // Line height for H4
      lineHeightHeading5: 1.5, // Line height for H5
      lineHeightHeading6: 1.6, // Line height for H6

      // Font Weights
      fontWeightBase: 400, // Base font weight (Regular)
      fontWeightHeading: 600, // Bold font weight for headings

      // -------- Component-Specific Styling --------
      // Button
      controlHeightSM: 32, // Small button height
      controlHeightLG: 48, // Large button height
      controlHeight: 40, // Default button height

      // Typography specific adjustments
      titleFontWeight: 600, // Default font weight for titles
      headingFontWeight: 700, // Default font weight for heading tags
    },
    components: {
      Layout:{
        headerBg: "#161B22",
        footerBg: "#161B22",
      }
    }
  };