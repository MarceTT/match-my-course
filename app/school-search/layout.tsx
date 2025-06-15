import "../globals.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { raleway } from "../ui/fonts";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match My Course",
  description: "Match My Course - Servicios",
};

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
