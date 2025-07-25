import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../globals.css";
import { raleway } from "../ui/fonts";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { GTMPageViewTracker } from "../ui/GTMPageViewTracker";
import { Suspense } from "react";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuestros servicios | MatchMyCourse",
  description:
    "Descubre los servicios de MatchMyCourse: búsqueda y comparación de cursos de inglés, asesoría personalizada y ayuda en inscripción.",
  openGraph: {
    title: "Nuestros servicios | MatchMyCourse",
    description:
      "Descubre los servicios de MatchMyCourse: búsqueda y comparación de cursos de inglés, asesoría personalizada y ayuda en inscripción.",
    url: "https://www.matchmycourse.com/servicios",
    siteName: "MatchMyCourse",
    images: [
      {
        url: "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Matchmycourse+Cursos+de+ingles+en+el+extranjero%2C+estudiar+ingles+en+Irlanda.png",
        width: 1200,
        height: 630,
        alt: "MatchMyCourse OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuestros servicios | MatchMyCourse",
    description:
      "Descubre los servicios de MatchMyCourse: búsqueda y comparación de cursos de inglés, asesoría personalizada y ayuda en inscripción.",
    images: [
      "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Matchmycourse+Cursos+de+ingles+en+el+extranjero%2C+estudiar+ingles+en+Irlanda.png",
    ],
  },
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
      <Suspense fallback={null}>
        <GTMPageViewTracker />
      </Suspense>
        {children}
      </div>
      <Footer />
    </>
  );
}
