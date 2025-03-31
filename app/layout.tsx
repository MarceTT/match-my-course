import type { Metadata } from "next";
import {  Geist_Mono } from "next/font/google";
import "./globals.css";
import { raleway } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner"
import { ReactQueryProvider } from "./providers";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match My Course",
  description: "Match My Course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
        {children}
        <Toaster position="top-center" richColors closeButton />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
