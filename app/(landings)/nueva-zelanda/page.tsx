import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Metadata } from "next";
import { Suspense } from "react";
import WhyNZ from "./WhyNZ";
import HeaderSection from "./HeaderSection";
import StetpsToStudy from "./StetpsToStudy";
import Requisitos from "./Requisitos";
import CalendlyCalendar from "./CalendlyCalendar";

const ogImage = rewriteToCDN(
    "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/%C2%BFCo%CC%81mo+funciona+Matchmycourse.png"
  );
  
  // Configuración de metadatos para Open Graph
  export const metadata: Metadata = {
    title: "Estudiar Inglés en Nueva Zelanda | MatchMyCourse",
    description:
      "Estudia inglés en Nueva Zelanda con nuestra guía completa: visas, alojamiento y consejos prácticos para que tu viaje sea seguro y libre de estrés.",
  
    // Open Graph para redes sociales
    openGraph: {
      title: "Estudiar Inglés en Nueva Zelanda | MatchMyCourse",
      description:
        "Estudia inglés en Nueva Zelanda con nuestra guía completa: visas, alojamiento y consejos prácticos para que tu viaje sea seguro y libre de estrés.",
      url: "https://matchmycourse.com/estudiar-ingles-nueva-zelanda", // Cambia por tu URL real
      siteName: "MatchMyCourse",
      images: [
        {
          url: ogImage, // Ruta a tu imagen Open Graph
          width: 1200,
          height: 630,
          alt: "Estudiar inglés en Nueva Zelanda",
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    authors: [{ name: 'MatchMyCourse', url: 'https://matchmycourse.com' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://matchmycourse.com/estudiar-ingles-nueva-zelanda'
    },
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: "Estudiar Inglés en Nueva Zelanda | MatchMyCourse",
      description:
        "Estudia inglés en Nueva Zelanda con nuestra guía completa: visas, alojamiento y consejos prácticos para que tu viaje sea seguro y libre de estrés.",
      images: [ogImage],
    },
    keywords: ["cursos de inglés en Nueva Zelanda", "requisitos para estudiar inglés en Nueva Zelanda", "trabajar y estudiar en Nueva Zelanda", "visa para estudiar inglés en Nueva Zelanda"],
  };

const NewZealandPage = () => {
  return (
    <>
    <HeaderSection />
    <WhyNZ />
    <StetpsToStudy />
    <Suspense fallback={null}>
      <CalendlyCalendar />
    </Suspense>
    <Requisitos />
    </>
  )
}

export default NewZealandPage
