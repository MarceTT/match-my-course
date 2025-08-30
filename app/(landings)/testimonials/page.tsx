import { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Testimonios+Matchmycourse.png"
);

// Configuración de metadatos para Open Graph
export const metadata: Metadata = {
  title: "Testimonios - Historias de Éxito Educativo",
  description: "Descubre las historias reales de estudiantes y familias que encontraron su escuela ideal. Lee testimonios auténticos sobre experiencias educativas transformadoras y consejos personalizados.",
  
  // Open Graph para redes sociales
  openGraph: {
    title: "Testimonios - Historias de Éxito Educativo",
    description: "Descubre las historias reales de estudiantes y familias que encontraron su escuela ideal. Lee testimonios auténticos sobre experiencias educativas transformadoras.",
    url: "https://matchmycourse.com/testimonios", // Cambia por tu URL real
    siteName: "MatchMyCourse",
    images: [
      {
        url: ogImage, // Ruta a tu imagen Open Graph
        width: 1200,
        height: 630,
        alt: "Testimonios de estudiantes y familias - Historias de éxito educativo",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Testimonios - Historias de Éxito Educativo",
    description: "Descubre las historias reales de estudiantes y familias que encontraron su escuela ideal.",
    images: [ogImage],
  },
  
  // Metadatos adicionales
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "MatchMyCourse" }],
  keywords: [
    "testimonios", 
    "historias de éxito", 
    "experiencias educativas", 
    "estudiantes", 
    "familias", 
    "escuelas", 
    "educación personalizada",
    "consejos educativos"
  ],
  
  // Metadatos estructurados para SEO
  alternates: {
    canonical: "https://matchmycourse.com/testimonios",
  },
};

const TestimonialsPage = () => {
  return <TestimonialsClient />;
};

export default TestimonialsPage;