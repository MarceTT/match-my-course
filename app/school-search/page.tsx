import { Suspense } from "react";
import type { Metadata } from "next";
import SchoolSearch from "./SchoolSerch";
import SuspenseLoader from "@/app/admin/components/SuspenseLoader";

export default function SchoolSearchPage() {
  return (
    <Suspense fallback={<SuspenseLoader fullscreen={false} />}>
      <SchoolSearch />
    </Suspense>
  );
}

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://matchmycourse.com'
).replace(/\/$/, '');
export const metadata: Metadata = {
  title: 'Buscador de Cursos de Inglés en el Extranjero | MatchMyCourse',
  description: 'Encuentra y compara cursos de inglés en Irlanda, Nueva Zelanda y más destinos. Filtra por ciudad, horario, duración y precio. Reserva gratis con MatchMyCourse.',
  alternates: { canonical: `${ORIGIN}/buscador-cursos-de-ingles` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Buscador de Cursos de Inglés | MatchMyCourse',
    description: 'Encuentra y compara cursos de inglés en el extranjero. Filtra por ciudad, horario, duración y precio.',
    url: `${ORIGIN}/buscador-cursos-de-ingles`,
    type: 'website',
  },
};
