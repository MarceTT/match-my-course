import "../globals.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { raleway } from "../ui/fonts";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buscardor de cursos de Inglés | MatchMyCourse",
  description: "Compara y elige las mejores escuelas para estudiar inglés general. Encuentra cursos, precios y asesores que te guían paso a paso ¡Realiza tu busqueda hoy!",
  robots: { index: false, follow: false },
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
