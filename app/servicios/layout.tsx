import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { raleway } from "@/lib/fonts";

import "../globals.css";
import { Header, Footer } from "@matchmycourse/components/layout";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match My Course",
  description: "Match My Course - Servicios",
};

export default function ServiciosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className={`${raleway.className} ${geistMono.variable} antialiased`}>
        {children}
      </div>
      <Footer />
    </>
  );
}
