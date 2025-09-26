import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Metadata } from "next";
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
    title: "estudiar inglés en Nueva Zelanda",
    description:
      "Descubre cómo estudiar inglés en Nueva Zelanda. Guía completa con requisitos, visas, pasos para aplicar y opciones de trabajo. Solicita tu asesoría gratuita y mejora tu inglés en el extranjero.",
  
    // Open Graph para redes sociales
    openGraph: {
      title: "estudiar inglés en Nueva Zelanda",
      description:
        "Descubre cómo estudiar inglés en Nueva Zelanda. Guía completa con requisitos, visas, pasos para aplicar y opciones de trabajo. Solicita tu asesoría gratuita y mejora tu inglés en el extranjero.",
      url: "https://matchmycourse.com/estudiar-ingles-nueva-zelanda", // Cambia por tu URL real
      siteName: "MatchMyCourse",
      images: [
        {
          url: ogImage, // Ruta a tu imagen Open Graph
          width: 1200,
          height: 630,
          alt: "estudiar inglés en Nueva Zelanda",
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
      title: "estudiar inglés en Nueva Zelanda",
      description:
        "Descubre cómo estudiar inglés en Nueva Zelanda. Guía completa con requisitos, visas, pasos para aplicar y opciones de trabajo. Solicita tu asesoría gratuita y mejora tu inglés en el extranjero.",
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
    <CalendlyCalendar />
    <Requisitos />
    </>
  )
}

export default NewZealandPage
