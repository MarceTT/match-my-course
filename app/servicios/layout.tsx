import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../globals.css";
import { raleway } from "../ui/fonts";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";


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
