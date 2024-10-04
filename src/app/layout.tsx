import type { Metadata } from "next";
import "@/styles/globals.css";
import AntThemeProvider from "@/lib/providers/antDesign/AntThemeProvider";
import { ReduxProvider } from "@/lib/providers/redux/reduxProvider";
import { fonts } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Tech Mania",
  description: "Tech tips & tricks",
  icons: {
    icon: "/favicon.ico",
  },
};

// Combine font classes into a single string
const fontClasses = fonts.map((font) => font.className).join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontClasses}`}>
    <body>
      <ReduxProvider>
        <AntThemeProvider>{children}</AntThemeProvider>
      </ReduxProvider>
    </body>
  </html>
  );
}
