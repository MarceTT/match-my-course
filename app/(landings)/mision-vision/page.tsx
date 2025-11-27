import React from "react";
import type { Metadata } from 'next';
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';
import Detail from "./Detail";
import CallToAction from "./CallToAction";

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Misio%CC%81n+y+Visio%CC%81n+Matchmycourse.png"
);

export const metadata: Metadata = {
  metadataBase: new URL('https://matchmycourse.com'),
  title: 'Misión y Visión | MatchMyCourse',
  description: 'Descubre la misión y visión de MatchMyCourse, el marketplace líder para comparar y reservar cursos de inglés en el extranjero. Transparencia y confianza.',
  keywords: ['misión y visión de MatchMyCourse', 'marketplace cursos inglés', 'empresa educativa', 'valores MatchMyCourse', 'transparencia educación'],
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
    canonical: 'https://matchmycourse.com/mision-vision-matchmycourse'
  },
  openGraph: {
    title: 'Misión y Visión | MatchMyCourse – Cursos de Inglés en el Extranjero',
    description: 'Descubre la misión y visión de MatchMyCourse, el marketplace líder para comparar y reservar cursos de inglés en el extranjero. Transparencia y confianza.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'MatchMyCourse',
    url: 'https://matchmycourse.com/mision-vision-matchmycourse',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Misión y Visión de MatchMyCourse'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Misión y Visión | MatchMyCourse – Cursos de Inglés en el Extranjero',
    description: 'Descubre la misión y visión de MatchMyCourse, el marketplace líder para comparar y reservar cursos de inglés en el extranjero. Transparencia y confianza.',
    images: [ogImage]
  }
};

const MisionAnVisionPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MatchMyCourse",
    "url": "https://matchmycourse.com",
    "logo": "https://matchmycourse.com/logo.png",
    "description": "Marketplace líder para comparar y reservar cursos de inglés en el extranjero",
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
    "knowsAbout": [
      "English Language Courses",
      "International Education",
      "Study Abroad Programs"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Detail />
        <CallToAction />
      </main>
    </div>
  );
};

export default MisionAnVisionPage;