import type { Metadata } from "next";
import Hero from "./components/features/Hero/Hero";
import { Suspense } from "react";
import { rewriteToCDN } from "./utils/rewriteToCDN";
import { buildCanonicalUrl } from "@/lib/helpers/canonicalUrl";
import dynamic from "next/dynamic";
import {
  VideoHeroSection,
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

const PopupOfertaClient = dynamic(() => import("./ui/PopupOfertaClient"), {
  loading: () => null,
});

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Matchmycourse+Cursos+de+ingles+en+el+extranjero%2C+estudiar+ingles+en+Irlanda.png"
);

const canonicalUrl = buildCanonicalUrl("/");

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com"
  ),
  title: "MatchMyCourse | Encuentra tu curso de inglés",
  description:
    "Compara las escuelas de inglés, ve qué cursos de inglés en Irlanda son la mejor opción para ti. Reserva fácil y segura. Descubre las mejores escuelas con MatchMyCourse.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "MatchMyCourse | Encuentra tu curso de inglés",
    description: "Compara escuelas, cursos y reserva fácil y segura.",
    url: canonicalUrl,
    siteName: "MatchMyCourse",
    images: [
      { url: ogImage, width: 1200, height: 630, alt: "MatchMyCourse OG Image" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatchMyCourse | Encuentra tu curso de inglés",
    description:
      "Reserva tu curso ideal de inglés. Compara escuelas en Irlanda con MatchMyCourse.",
    images: [ogImage],
  },
};

// Enable ISR (Incremental Static Regeneration) - revalidate every 15 minutes
export const revalidate = 900;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PopupOfertaClient scrollTrigger={1500} />

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
        <p className="text-center text-base md:text-lg font-semibold text-gray-700 mb-4">
          Escuelas que han confiado en nuestro servicio
        </p>
        <Carousel />
      </section>

      {/* Video + Beneficios */}
      <VideoHeroSection youtubeVideoId="TavnREMEzQs" />

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
