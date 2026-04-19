import type { Metadata } from "next";
import Hero from "./components/features/Hero/Hero";
import { Suspense } from "react";
import { rewriteToCDN } from "./utils/rewriteToCDN";
import { buildCanonicalUrl } from "@/lib/helpers/canonicalUrl";
import dynamic from "next/dynamic";
import {
  VideoHeroSection,
  FeaturedSchoolsSection,
  StatsSection,
  WhyMatchMyCourse,
  TravelSupportSection,
  TestimonialsSection,
  ProcessStepsSection,
  FinalCTASection,
} from "./components/home";
import Carousel from "./components/features/Carousel/Carousel";

// Lazy load Header, Footer, and PopupOferta to improve LCP and TBT
const Header = dynamic(() => import("./components/common/HeaderServer"), {
  loading: () => <div className="h-20 bg-white border-b" />,
});

const Footer = dynamic(() => import("./components/common/FooterServer"), {
  loading: () => <div className="h-32 bg-gray-900" />,
});

// Popup desactivado temporalmente
// const PopupOfertaClient = dynamic(() => import("./ui/PopupOfertaClient"), {
//   loading: () => null,
// });

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Matchmycourse+Cursos+de+ingles+en+el+extranjero%2C+estudiar+ingles+en+Irlanda.png"
);

const canonicalUrl = buildCanonicalUrl("/");

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com"
  ),
  title: "MatchMyCourse | Cursos de inglés en Irlanda | Compara escuelas y precios",
  description:
    "Compara cursos de inglés en Irlanda y elige entre más de 35 escuelas certificadas. Revisa precios oficiales, encuentra tu curso ideal y recibe asesoría gratuita.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "MatchMyCourse | Cursos de inglés en Irlanda | Compara escuelas y precios",
    description: "Compara cursos de inglés en Irlanda y elige entre más de 35 escuelas certificadas. Revisa precios oficiales, encuentra tu curso ideal y recibe asesoría gratuita.",
    url: canonicalUrl,
    siteName: "MatchMyCourse",
    images: [
      { url: ogImage, width: 1200, height: 630, alt: "MatchMyCourse OG Image" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatchMyCourse | Cursos de inglés en Irlanda | Compara escuelas y precios",
    description:
      "Compara cursos de inglés en Irlanda y elige entre más de 35 escuelas certificadas. Revisa precios oficiales, encuentra tu curso ideal y recibe asesoría gratuita.",
    images: [ogImage],
  },
};

// Enable ISR (Incremental Static Regeneration) - revalidate every 15 minutes
export const revalidate = 900;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* <PopupOfertaClient scrollTrigger={1500} /> */}

      {/* Hero con buscador */}
      <Suspense
        fallback={
          <div className="h-[70vh] bg-gray-200 animate-pulse" />
        }
      >
        <Hero />
      </Suspense>

      {/* Partners - Escuelas asociadas con carousel animado */}
      <section className="bg-white pt-4 pb-2">
        <p className="text-center text-xl md:text-2xl font-semibold text-gray-700 mb-4">
          Escuelas que han confiado en nuestro servicio
        </p>
        <Carousel />
      </section>

      {/* Video + Beneficios */}
      <VideoHeroSection youtubeVideoId="TavnREMEzQs" />

      {/* Escuelas destacadas */}
      <FeaturedSchoolsSection />

      {/* Stats - Métricas */}
      <StatsSection />

      {/* Por qué MatchMyCourse - Grid 2x3 */}
      <WhyMatchMyCourse />

      {/* Apoyo durante el viaje */}
      <TravelSupportSection />

      {/* Testimonios */}
      <TestimonialsSection />

      {/* Proceso de 3 pasos */}
      <ProcessStepsSection />

      {/* CTA Final */}
      <FinalCTASection />

      <Footer />
    </div>
  );
}
