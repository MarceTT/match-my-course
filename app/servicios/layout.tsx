import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { raleway } from "../ui/fonts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroVisa from "../components/HeroVisa";
import Features from "../components/Features";
import Destinations from "../components/servicios-component/Destinations";
import Advisory from "../components/servicios-component/Advisory";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <div
        className={`${raleway.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </div>
  );
}
