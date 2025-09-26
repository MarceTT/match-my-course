import { Geist_Mono } from 'next/font/google'
import { raleway } from '@/app/ui/fonts'
import type { Metadata } from 'next'
import { rewriteToCDN } from '@/app/utils/rewriteToCDN'
import { Toaster } from "@/components/ui/toaster";

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Ebook+Estudia+y+Trabaja+en+el+Extranjero.png"
)

export const metadata: Metadata = {
  metadataBase: new URL('https://matchmycourse.com'),
  title: 'Ebook Gratuito | Estudia y Trabaja en el Extranjero',
  description: 'La guía más completa para estudiar y trabajar en el extranjero. Descubre costes, ciudades, trámites, visas y cómo encontrar trabajo paso a paso.',
  keywords: ['estudiar y trabajar en el extranjero', 'ebook gratis', 'estudiar en el extranjero', 'trabajar extranjero', 'visa trabajo estudiante', 'guía estudiar extranjero'],
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
    canonical: 'https://matchmycourse.com/ebook-estudiar-y-trabajar-extranjero'
  },
  openGraph: {
    title: 'Ebook Gratuito | Estudia y Trabaja en el Extranjero',
    description: 'La guía más completa para estudiar y trabajar en el extranjero. Descubre costes, ciudades, trámites, visas y cómo encontrar trabajo paso a paso.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'MatchMyCourse',
    url: 'https://matchmycourse.com/ebook-estudiar-y-trabajar-extranjero',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Ebook Gratuito - Estudia y Trabaja en el Extranjero'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ebook Gratuito | Estudia y Trabaja en el Extranjero',
    description: 'La guía más completa para estudiar y trabajar en el extranjero. Descubre costes, ciudades, trámites, visas y cómo encontrar trabajo paso a paso.',
    images: [ogImage]
  }
}


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function EbookLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Book", "EducationalOccupationalProgram"],
    "name": "Ebook Gratuito - Estudia y Trabaja en el Extranjero",
    "description": "La guía más completa para estudiar y trabajar en el extranjero. Descubre costes, ciudades, trámites, visas y cómo encontrar trabajo paso a paso.",
    "provider": {
      "@type": "Organization",
      "name": "MatchMyCourse",
      "url": "https://matchmycourse.com"
    },
    "educationalLevel": "Beginner",
    "educationalCredentialAwarded": "Digital Guide",
    "teaches": [
      "Estudiar en el extranjero",
      "Trabajar en el extranjero",
      "Trámites de visa",
      "Búsqueda de empleo internacional",
      "Costes de vida en el extranjero"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Students and Young Professionals"
    },
    "isAccessibleForFree": true,
    "inLanguage": "es",
    "license": "https://matchmycourse.com/terms",
    "publisher": {
      "@type": "Organization",
      "name": "MatchMyCourse",
      "logo": "https://matchmycourse.com/logo.png"
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
      <main className={`${raleway.className} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </main>
    </>
  );
}