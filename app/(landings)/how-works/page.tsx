import React from "react";
import { Metadata } from "next";
import HeaderSection from "./HeaderSection";
import FindSchoolSection from "./FindSchoolSection";
import AdvantageSection from "./AdvantageSection";
import FilterWorksSection from "./FilterWorksSection";
import TestomonialSection from "./TestomonialSection";
import ChooseSchool from "./ChooseSchool";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";


const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/%C2%BFCo%CC%81mo+funciona+Matchmycourse.png"
);

// Configuración de metadatos para Open Graph
export const metadata: Metadata = {
  title: "¿Cómo funciona Matchmycourse?",
  description:
    "Conoce más sobre nuestra misión de ayudarte a encontrar la escuela perfecta. Descubre nuestras ventajas y cómo trabajamos para conectarte con las mejores opciones educativas.",

  // Open Graph para redes sociales
  openGraph: {
    title: "¿Cómo funciona Matchmycourse?",
    description:
      "Conoce más sobre nuestra misión de ayudarte a encontrar la escuela perfecta. Descubre nuestras ventajas y cómo trabajamos para conectarte con las mejores opciones educativas.",
    url: "https://matchmycourse.com/como-funciona-matchmycourse", // Cambia por tu URL real
    siteName: "MatchMyCourse",
    images: [
      {
        url: ogImage, // Ruta a tu imagen Open Graph
        width: 1200,
        height: 630,
        alt: "¿Cómo funciona Matchmycourse?",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "¿Cómo funciona Matchmycourse?",
    description:
      "Conoce más sobre nuestra misión de ayudarte a encontrar la escuela perfecta.",
    images: [ogImage],
  },

  // Metadatos adicionales
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "MatchMyCourse" }],
  keywords: ["educación", "escuelas", "como funciona", "misión", "valores"],
};

const AboutUs = () => {
  return (
    <>
      <HeaderSection />
      <FindSchoolSection />
      <AdvantageSection />
      <FilterWorksSection />
      <TestomonialSection />
      <ChooseSchool />
    </>
  );
};

export default AboutUs;
