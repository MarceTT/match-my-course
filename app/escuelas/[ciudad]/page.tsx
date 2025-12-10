import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchAllSeoEntries } from '@/app/actions/seo';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';
import { subcategoriaToCursoSlug } from '@/lib/courseMap';
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://matchmycourse.com'
).replace(/\/$/, '');

export const revalidate = 3600; // Revalidar cada hora
export const dynamicParams = true; // Allow dynamic city pages beyond generateStaticParams

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
  image?: string;
}

// Mapeo de slugs de ciudades a nombres reales (fallback para ciudades conocidas)
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
  // Pre-generate only main cities at build time
  // Other cities will be generated on-demand with dynamicParams = true
  return Object.keys(citySlugMap).map((ciudad) => ({ ciudad }));
}

// Helper function to normalize city name from slug
function normalizeCityName(slug: string): string {
  // Try known mapping first
  if (citySlugMap[slug.toLowerCase()]) {
    return citySlugMap[slug.toLowerCase()];
  }

  // Capitalize each word for unknown cities
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad: ciudadSlug } = await params;
  const cityName = normalizeCityName(ciudadSlug);

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
  const cityName = normalizeCityName(ciudadSlug);

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

      // Normalize the entry city to slug for comparison
      const entryCitySlug = entry.ciudad.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dash
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

      // Match city by slug
      if (entryCitySlug !== ciudadSlug.toLowerCase()) return;

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
          image: entry.imageOpenGraph,
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

      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/escuelas" className="hover:text-white transition-colors">
                  Escuelas
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-semibold">{cityName}</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Escuelas de Inglés en {cityName}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            {schools.length} escuela{schools.length !== 1 ? 's' : ''} certificada{schools.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{schools.length}</div>
            <div className="text-gray-600">Escuelas en {cityName}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">✓</div>
            <div className="text-gray-600">Todas Certificadas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Reserva Gratuita</div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Todas las Escuelas en {cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Link
                key={school.slugEscuela}
                href={school.url}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-500"
              >
                {/* School Image */}
                {school.image ? (
                  <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                    <Image
                      src={rewriteToCDN(school.image)}
                      alt={school.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-6xl">🏫</div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {school.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                    <span>📍</span>
                    {school.city}, {school.country}
                  </p>
                  {school.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {school.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-blue-600 font-bold group-hover:underline">
                      Ver cursos y precios
                    </span>
                    <span className="text-blue-600 text-xl group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-12 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ¿Quieres comparar más opciones?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Usa nuestro buscador para filtrar por horario, duración, precio y tipo de curso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/buscador-cursos-de-ingles"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              🔍 Buscar Cursos Ahora
            </Link>
            <Link
              href="/escuelas"
              className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg border-2 border-white/20"
            >
              🌍 Ver Todas las Ciudades
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Por qué estudiar inglés en {cityName}?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {cityName} es un destino popular para estudiantes internacionales que buscan mejorar
            su inglés en un ambiente multicultural. La ciudad cuenta con {schools.length} escuela{schools.length !== 1 ? 's' : ''} certificada{schools.length !== 1 ? 's' : ''} que {schools.length !== 1 ? 'ofrecen' : 'ofrece'} cursos de alta calidad, profesores nativos experimentados y una amplia
            variedad de actividades extracurriculares.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Tipos de cursos disponibles en {cityName}
          </h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <strong>Inglés General:</strong> Ideal para mejorar tu comunicación diaria y fluidez
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <strong>Inglés Intensivo:</strong> Progreso acelerado con más horas de clase semanales
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <strong>Inglés de Negocios:</strong> Enfoque profesional y corporativo para tu carrera
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <div>
                <strong>Programas Estudio y Trabajo:</strong> Combina estudio con permiso de trabajo
              </div>
            </li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">
            ¿Cómo elegir la escuela correcta en {cityName}?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Al comparar escuelas en {cityName}, considera factores como ubicación, tamaño de
            grupos, horarios disponibles, instalaciones, certificaciones y opiniones de otros
            estudiantes. MatchMyCourse te ayuda a comparar todas estas variables para que tomes
            la mejor decisión. Todas nuestras escuelas en {cityName} están certificadas y
            ofrecen programas de calidad para estudiantes internacionales.
          </p>
        </div>
      </div>
    </>
  );
}
