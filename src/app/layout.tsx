
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from "react-hot-toast"
import ReduxProvider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sevak - Find Jobs & Services Near You",
  description:
    "Sevak helps users easily find jobs and services within a 20 km radius using geolocation. Simple, fast, and accessible even for illiterate users.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Keep <body> static for SSR */}
      <body
        className={`${geistSans.variable ?? ""} ${geistMono.variable ?? ""} ${poppins.variable ?? ""} ${josefinSans.variable ?? ""} antialiased`}
      >
        <Toaster />
        {/* ThemeProvider handles dark mode on client only */}
        <ReduxProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
