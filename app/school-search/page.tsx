import { Suspense } from "react";
import type { Metadata } from "next";
import SchoolSearch from "./SchoolSerch";
import SuspenseLoader from "@/app/admin/components/SuspenseLoader";

// ISR: Revalidar cada 15 minutos (900 segundos)
export const revalidate = 900;

type SearchParams = {
  course?: string;
  cities?: string;
  weeksMin?: string;
  [key: string]: string | undefined;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

// Función server-side para fetch inicial
async function fetchInitialSchools(params: SearchParams) {
  try {
    const course = params.course || "ingles-general";

    // Construir query params igual que el hook
    const queryParams = new URLSearchParams();
    queryParams.set("course", course);
    queryParams.set("page", "1");
    queryParams.set("limit", "8");

    // Agregar otros filtros si existen
    if (params.cities) queryParams.set("cities", params.cities);
    if (params.weeksMin && !course.includes("visa-de-trabajo")) {
      queryParams.set("weeksMin", params.weeksMin);
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools-by-type?${queryParams.toString()}`;

    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });

    if (!res.ok) {
      console.error('Error fetching schools:', res.status);
      return { schools: [], currentPage: 1, totalPages: 1 };
    }

    const data = await res.json();

    return {
      schools: data?.data?.schools || [],
      currentPage: data?.data?.pagination?.currentPage || 1,
      totalPages: data?.data?.pagination?.totalPages || 1,
    };
  } catch (error) {
    console.error('Error in fetchInitialSchools:', error);
    return { schools: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function SchoolSearchPage({ searchParams }: Props) {
  // Esperar searchParams
  const params = await searchParams;

  // Fetch server-side para SSR
  const initialData = await fetchInitialSchools(params);

  return (
    <Suspense fallback={<SuspenseLoader fullscreen={false} />}>
      <SchoolSearch initialData={initialData} initialParams={params} />
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
