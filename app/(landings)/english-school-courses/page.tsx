import React from 'react'
import type { Metadata } from 'next'
import EnglishSchoolCoursesClient from './EnglishSchoolCoursesClient'
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Cursos+de+ingle%CC%81s+en+el+extranjero+Matchmycourse.png"
);

export const metadata: Metadata = {
  metadataBase: new URL('https://matchmycourse.com'),
  title: 'Cursos de Inglés en el Extranjero | Escuelas y Programas | MatchMyCourse',
  description: 'Descubre los mejores cursos de inglés en el extranjero. Compara escuelas, programas, precios y horarios. Reserva online fácilmente con MatchMyCourse.',
  keywords: ['Cursos de Inglés en el Extranjero', 'escuelas de inglés', 'programas de inglés', 'estudiar inglés extranjero', 'cursos de inglés internacional'],
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
    canonical: 'https://matchmycourse.com/cursos-ingles-extranjero'
  },
  openGraph: {
    title: 'Cursos de Inglés en el Extranjero | Escuelas y Programas | MatchMyCourse',
    description: 'Descubre los mejores cursos de inglés en el extranjero. Compara escuelas, programas, precios y horarios. Reserva online fácilmente con MatchMyCourse.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'MatchMyCourse',
    url: 'https://matchmycourse.com/cursos-ingles-extranjero',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Cursos de Inglés en el Extranjero - MatchMyCourse'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursos de Inglés en el Extranjero | Escuelas y Programas | MatchMyCourse',
    description: 'Descubre los mejores cursos de inglés en el extranjero. Compara escuelas, programas, precios y horarios. Reserva online fácilmente con MatchMyCourse.',
    images: [ogImage]
  }
}

const EnglishSchoolCourses = () => {
  return <EnglishSchoolCoursesClient />
}

export default EnglishSchoolCourses