"use client";

import Header from "./components/common/HeaderServer";
import Footer from "./components/common/FooterServer";
import Hero from "./components/features/Hero/Hero";
import { Suspense } from "react";
import SuspenseLoader from "./admin/components/SuspenseLoader";
import PopupOferta from "./ui/promotional-popup";
import {
  PartnersSection,
  VideoHeroSection,
  StatsSection,
  WhyMatchMyCourse,
  TravelSupportSection,
  TestimonialsSection,
  ProcessStepsSection,
  FinalCTASection,
} from "./components/home";

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PopupOferta scrollTrigger={200} />

      {/* Hero con buscador */}
      <Suspense fallback={<SuspenseLoader fullscreen={false} />}>
        <Hero />
      </Suspense>

      {/* Partners - Escuelas asociadas */}
      <PartnersSection />

      {/* Video + Beneficios */}
      <VideoHeroSection youtubeVideoId={undefined} />

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
