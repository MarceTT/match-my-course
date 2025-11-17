import type { Metadata } from "next";
import { getAllPartners } from '@/app/lib/api/partners'
import PartnersClient from './PartnersClient'

export const metadata: Metadata = {
  title: "Nuestras Escuelas Aliadas | MatchMyCourse",
  description: "Descubre nuestras escuelas aliadas de inglés certificadas y acreditadas en Irlanda y Nueva Zelanda.",
  alternates: {
    canonical: "https://matchmycourse.com/escuelas-aliadas",
  },
};

export default async function PartnersPage() {
  // Server-side data fetching - mejor práctica en Next.js 15
  const partners = await getAllPartners()

  return <PartnersClient partners={partners} />
}
