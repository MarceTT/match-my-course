import "../globals.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { raleway } from "../ui/fonts";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata is handled by page.tsx to allow dynamic noindex based on filters
// Removing conflicting metadata from layout

export default function SchoolSearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`${raleway.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </div>
  );
}
