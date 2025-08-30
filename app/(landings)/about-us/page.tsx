import React from "react";
import type { Metadata } from 'next';
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';
import HeroSection from "./HeroSection";
import AcercaNosotros from "./AboutUs";
import QueOfrecemos from "./QueOfrecemos";
import Experiencia from "./Experiencia";
import Unicos from "./Unicos";
import Carousel from "@/app/components/features/Carousel/Carousel";

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Quie%CC%81nes+somos+Matchmycourse.png"
);

export const metadata: Metadata = {
  metadataBase: new URL('https://matchmycourse.com'),
  title: 'Quiénes Somos | MatchMyCourse – Cursos de Inglés en el Extranjero',
  description: 'Conoce MatchMyCourse, el marketplace para comparar y reservar cursos de inglés en el extranjero. Escuelas certificadas, precios claros y asesoría gratuita.',
  keywords: ['quienes somos MatchMyCourse', 'marketplace cursos inglés', 'escuelas certificadas', 'asesoría gratuita', 'estudiar inglés extranjero'],
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
    canonical: 'https://matchmycourse.com/quienes-somos'
  },
  openGraph: {
    title: 'Quiénes Somos | MatchMyCourse – Cursos de Inglés en el Extranjero',
    description: 'Conoce MatchMyCourse, el marketplace para comparar y reservar cursos de inglés en el extranjero. Escuelas certificadas, precios claros y asesoría gratuita.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'MatchMyCourse',
    url: 'https://matchmycourse.com/quienes-somos',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Quiénes Somos - MatchMyCourse'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quiénes Somos | MatchMyCourse – Cursos de Inglés en el Extranjero',
    description: 'Conoce MatchMyCourse, el marketplace para comparar y reservar cursos de inglés en el extranjero. Escuelas certificadas, precios claros y asesoría gratuita.',
    images: [ogImage]
  }
};

const AboutUs = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MatchMyCourse",
    "url": "https://matchmycourse.com",
    "logo": "https://matchmycourse.com/logo.png",
    "description": "Marketplace para comparar y reservar cursos de inglés en el extranjero con escuelas certificadas",
    "foundingDate": "2020",
    "sameAs": [
      "https://www.facebook.com/matchmycourse",
      "https://www.instagram.com/matchmycourse",
      "https://www.linkedin.com/company/matchmycourse"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["Spanish", "English"]
    },
    "areaServed": "Worldwide",
    "serviceType": "Educational Services",
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Asesoría Gratuita para Cursos de Inglés",
        "description": "Servicio gratuito de asesoría para encontrar el mejor curso de inglés en el extranjero"
      }
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certified Educational Partner"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className="min-h-screen bg-white">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <HeroSection />
          <Carousel />
          <AcercaNosotros />
          <QueOfrecemos />
          <Experiencia />
          <Unicos />
        </main>
      </div>
    </>
  );
};

export default AboutUs;
