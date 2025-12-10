import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchAllSeoEntries } from '@/app/actions/seo';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';
import { subcategoriaToCursoSlug } from '@/lib/courseMap';

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://matchmycourse.com'
).replace(/\/$/, '');

export const revalidate = 3600; // Revalidar cada hora

type Props = {
  params: Promise<{ ciudad: string }>;
};

interface School {
  name: string;
  city: string;
  country: string;
  slugCurso: string;
  slugEscuela: string;
  url: string;
  description?: string;
}

// Mapeo de slugs de ciudades a nombres reales
const citySlugMap: Record<string, string> = {
  'dublin': 'Dublin',
  'cork': 'Cork',
  'galway': 'Galway',
  'limerick': 'Limerick',
  'waterford': 'Waterford',
  'killarney': 'Killarney',
  'bray': 'Bray',
  'athlone': 'Athlone',
};

export async function generateStaticParams() {
  // Pre-generate pages for main cities
  return Object.keys(citySlugMap).map((ciudad) => ({ ciudad }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad: ciudadSlug } = await params;
  const cityName = citySlugMap[ciudadSlug.toLowerCase()] || ciudadSlug;

  return {
    title: `Escuelas de Inglés en ${cityName} | MatchMyCourse`,
    description: `Descubre las mejores escuelas de inglés en ${cityName}. Compara precios, horarios, cursos y encuentra tu escuela ideal con MatchMyCourse.`,
    alternates: { canonical: `${ORIGIN}/escuelas/${ciudadSlug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: `Escuelas de Inglés en ${cityName} | MatchMyCourse`,
      description: `Descubre las mejores escuelas de inglés en ${cityName}. Compara precios, horarios y cursos.`,
      url: `${ORIGIN}/escuelas/${ciudadSlug}`,
      type: 'website',
    },
  };
}

export default async function CitySchoolsPage({ params }: Props) {
  const { ciudad: ciudadSlug } = await params;
  const cityName = citySlugMap[ciudadSlug.toLowerCase()];

  if (!cityName) {
    notFound();
  }

  let schools: School[] = [];

  try {
    const result: any = await fetchAllSeoEntries();
    let entries: Array<any> = [];

    if (Array.isArray(result)) {
      entries = result;
    } else if (result && typeof result === 'object' && 'data' in result) {
      entries = Array.isArray(result.data) ? result.data : [];
    }

    // Filter schools by city
    const schoolMap = new Map<string, School>();

    entries.forEach((entry) => {
      if (!entry || !entry.escuela || !entry.ciudad || !entry.url) return;

      // Match city case-insensitively
      if (entry.ciudad.toLowerCase() !== cityName.toLowerCase()) return;

      const slugCurso = subcategoriaToCursoSlug[entry.subcategoria] || 'ingles-general';
      const slugEscuela = extractSlugEscuelaFromSeoUrl(String(entry.url));

      if (!schoolMap.has(entry.escuela)) {
        schoolMap.set(entry.escuela, {
          name: entry.escuela,
          city: entry.ciudad,
          country: entry.pais || 'Irlanda',
          slugCurso,
          slugEscuela,
          url: `/cursos/${slugCurso}/escuelas/${slugEscuela}`,
          description: entry.metaDescription,
        });
      }
    });

    schools = Array.from(schoolMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } catch (error) {
    console.error('[CitySchoolsPage] Error fetching schools:', error);
  }

  if (schools.length === 0) {
    notFound();
  }

  // ItemList Schema for better SEO
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: schools.map((school, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EducationalOrganization',
        name: school.name,
        url: `${ORIGIN}${school.url}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: school.city,
          addressCountry: school.country,
        },
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Escuelas',
        item: `${ORIGIN}/escuelas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cityName,
        item: `${ORIGIN}/escuelas/${ciudadSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/escuelas" className="hover:text-blue-600">
                Escuelas
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{cityName}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escuelas de Inglés en {cityName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre {schools.length} escuela{schools.length !== 1 ? 's' : ''} de inglés certificada{schools.length !== 1 ? 's' : ''} en {cityName}.
            Compara precios, horarios y encuentra el curso perfecto para ti.
          </p>
        </header>

        {/* Schools List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {schools.map((school) => (
            <Link
              key={school.slugEscuela}
              href={school.url}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {school.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {school.city}, {school.country}
              </p>
              {school.description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {school.description}
                </p>
              )}
              <span className="text-blue-600 hover:text-blue-700 font-semibold">
                Ver cursos y precios →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Quieres comparar más opciones?
          </h2>
          <p className="text-gray-600 mb-6">
            Usa nuestro buscador para filtrar por horario, duración, precio y tipo de curso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/buscador-cursos-de-ingles"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Buscar Cursos
            </Link>
            <Link
              href="/escuelas"
              className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Ver Todas las Escuelas
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>¿Por qué estudiar inglés en {cityName}?</h2>
          <p>
            {cityName} es un destino popular para estudiantes internacionales que buscan mejorar
            su inglés en un ambiente multicultural. La ciudad cuenta con escuelas certificadas
            que ofrecen cursos de alta calidad, profesores nativos experimentados y una amplia
            variedad de actividades extracurriculares.
          </p>
          <h3>Tipos de cursos disponibles</h3>
          <ul>
            <li><strong>Inglés General:</strong> Ideal para mejorar tu comunicación diaria</li>
            <li><strong>Inglés Intensivo:</strong> Progreso acelerado con más horas de clase</li>
            <li><strong>Inglés de Negocios:</strong> Enfoque profesional y corporativo</li>
            <li><strong>Programas Estudio y Trabajo:</strong> Combina estudio con permiso de trabajo</li>
          </ul>
          <h3>¿Cómo elegir la escuela correcta?</h3>
          <p>
            Al comparar escuelas en {cityName}, considera factores como ubicación, tamaño de
            grupos, horarios disponibles, instalaciones, certificaciones y opiniones de otros
            estudiantes. MatchMyCourse te ayuda a comparar todas estas variables para que tomes
            la mejor decisión.
          </p>
        </div>
      </div>
    </>
  );
}
