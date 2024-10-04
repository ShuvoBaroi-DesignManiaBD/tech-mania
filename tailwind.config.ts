import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Colors
        dark: {
          primary: "#3B82F6", // Bright Blue for primary actions
          primaryBg: "#1E293B", // Background for primary buttons
          primaryHover: "#2563EB", // Hover state for primary buttons
          primaryTextHover: "#60A5FA", // Hover text color for primary buttons
          primaryText: "#FFFFFF", // Text color for primary buttons

          bgBase: "#161B22", // Background color for the layout
          text: "#C9D1D9", // Base text color (Light Gray)
          textHeading: "#58A6FF", // Text color for headings (Blue)
          textSecondary: "#8B949E", // Text color for secondary text
          border: "#30363D", // Border color for dividers and components

          bgContainer: "#161B22", // Container backgrounds (cards, modals, etc.)
          bgElevated: "#21262D", // Elevated component backgrounds (hovered states)

          success: "#4CAF50", // Success color
          error: "#F85149", // Error color
        },

        // Light Theme Colors
        light: {
          primary: "#3B82F6", // Bright Blue for primary actions
          primaryBg: "#FFFFFF", // Background for primary buttons
          primaryHover: "#2563EB", // Hover state for primary buttons
          primaryTextHover: "#60A5FA", // Hover text color for primary buttons
          primaryText: "#1E293B", // Text color for primary buttons

          bgBase: "#F9FAFB", // Background color for the layout
          text: "#1F2937", // Base text color (Dark Gray)
          textHeading: "#1E40AF", // Text color for headings (Blue)
          textSecondary: "#4B5563", // Text color for secondary text
          border: "#D1D5DB", // Border color for dividers and components

          bgContainer: "#FFFFFF", // Container backgrounds (cards, modals, etc.)
          bgElevated: "#F3F4F6", // Elevated component backgrounds (hovered states)

          success: "#4CAF50", // Success color
          error: "#F85149", // Error color
        },
      },
      fontSize: {
        base: "16px",
        sm: "14px",
        lg: "18px",
        xl: "20px",
        h1: "40px",
        h2: "32px",
        h3: "28px",
        h4: "24px",
        h5: "20px",
        h6: "16px",
      },
      lineHeight: {
        base: "1.6",
        h1: "1.3",
        h2: "1.4",
        h3: "1.4",
        h4: "1.5",
        h5: "1.5",
        h6: "1.6",
      },
      fontWeight: {
        normal: "400",
        bold: "600",
        heading: "700",
      },
      height: {
        sm: "32px",
        lg: "48px",
        base: "40px",
      },
    },
  },
  plugins: [],
};

export default config;
