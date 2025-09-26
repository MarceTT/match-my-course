import React from "react";
import type { Metadata } from 'next';
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';
import Service from "./components/Service";
import Inscription from "./components/Inscription";
import Preparation from "./components/Preparation";
import Support from "./components/Support";
import Experience from "./components/Experience";
import Testimonial from "./components/Testimonial";
import HeaderSection from "./components/HeaderSection";
import WrapperForm from "./form/WrapperForm";

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Servicios+Matchmycourse.png"
);

export const metadata: Metadata = {
  metadataBase: new URL('https://matchmycourse.com'),
  title: 'Nuestros Servicios | MatchMyCourse – Reserva, Matrícula y Preparación',
  description: 'Descubre los servicios de MatchMyCourse: reserva tu curso de inglés, completa la matrícula fácilmente y recibe preparación para estudiar en el extranjero.',
  keywords: ['servicios MatchMyCourse', 'reserva curso inglés', 'matrícula extranjero', 'preparación estudiar extranjero', 'servicios educativos'],
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
    canonical: 'https://matchmycourse.com/servicios-matchmycourse'
  },
  openGraph: {
    title: 'Nuestros Servicios | MatchMyCourse – Reserva, Matrícula y Preparación',
    description: 'Descubre los servicios de MatchMyCourse: reserva tu curso de inglés, completa la matrícula fácilmente y recibe preparación para estudiar en el extranjero.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'MatchMyCourse',
    url: 'https://matchmycourse.com/servicios-matchmycourse',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Nuestros Servicios - MatchMyCourse'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestros Servicios | MatchMyCourse – Reserva, Matrícula y Preparación',
    description: 'Descubre los servicios de MatchMyCourse: reserva tu curso de inglés, completa la matrícula fácilmente y recibe preparación para estudiar en el extranjero.',
    images: [ogImage]
  }
};

function Services() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Organization",
      "name": "MatchMyCourse",
      "url": "https://matchmycourse.com"
    },
    "serviceType": "Educational Services",
    "description": "Servicios completos para estudiar inglés en el extranjero: reserva, matrícula y preparación",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios MatchMyCourse",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reserva de Curso",
            "description": "Reserva tu curso de inglés en las mejores escuelas internacionales"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Matrícula y Documentación",
            "description": "Asistencia completa para completar la matrícula y documentación necesaria"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Preparación para el Viaje",
            "description": "Preparación integral para estudiar en el extranjero"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Soporte Continuo",
            "description": "Acompañamiento durante toda tu experiencia educativa"
          }
        }
      ]
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
      <div className="min-h-screen bg-white overflow-x-hidden">
        <HeaderSection />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <Service />
          <Inscription />
          <Preparation />
          <Support />
          <WrapperForm />
          <Experience />
          <Testimonial />
        </main>
      </div>
    </>
  );
}

export default Services;
