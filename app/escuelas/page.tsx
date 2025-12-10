import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

export const metadata: Metadata = {
  title: 'Escuelas de Inglés en el Extranjero | MatchMyCourse',
  description: 'Descubre todas las escuelas de inglés certificadas en Irlanda, Nueva Zelanda y más destinos. Compara precios, horarios y cursos para encontrar tu escuela ideal.',
  alternates: { canonical: `${ORIGIN}/escuelas` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Escuelas de Inglés en el Extranjero | MatchMyCourse',
    description: 'Descubre todas las escuelas de inglés certificadas en Irlanda, Nueva Zelanda y más destinos.',
    url: `${ORIGIN}/escuelas`,
    type: 'website',
  },
};

interface School {
  name: string;
  city: string;
  country: string;
  slugCurso: string;
  slugEscuela: string;
  url: string;
  image?: string;
}

export default async function SchoolsPage() {
  let schools: School[] = [];

  try {
    const result: any = await fetchAllSeoEntries();
    let entries: Array<any> = [];

    if (Array.isArray(result)) {
      entries = result;
    } else if (result && typeof result === 'object' && 'data' in result) {
      entries = Array.isArray(result.data) ? result.data : [];
    }

    // Group schools by name (avoid duplicates)
    const schoolMap = new Map<string, School>();

    entries.forEach((entry) => {
      if (!entry || !entry.escuela || !entry.url) return;

      const slugCurso = subcategoriaToCursoSlug[entry.subcategoria] || 'ingles-general';
      const slugEscuela = extractSlugEscuelaFromSeoUrl(String(entry.url));

      if (!schoolMap.has(entry.escuela)) {
        schoolMap.set(entry.escuela, {
          name: entry.escuela,
          city: entry.ciudad || '',
          country: entry.pais || 'Irlanda',
          slugCurso,
          slugEscuela,
          url: `/cursos/${slugCurso}/escuelas/${slugEscuela}`,
          image: entry.imageOpenGraph,
        });
      }
    });

    schools = Array.from(schoolMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } catch (error) {
    console.error('[SchoolsPage] Error fetching schools:', error);
  }

  // Group by country/city
  const byCountry = schools.reduce((acc, school) => {
    const country = school.country || 'Irlanda';
    const city = school.city || 'Otras ciudades';

    if (!acc[country]) {
      acc[country] = {};
    }
    if (!acc[country][city]) {
      acc[country][city] = [];
    }
    acc[country][city].push(school);
    return acc;
  }, {} as Record<string, Record<string, School[]>>);

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
          addressLocality: school.city || undefined,
          addressCountry: school.country,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Escuelas de Inglés Certificadas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Descubre {schools.length} escuelas de inglés en el extranjero
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{schools.length}</div>
            <div className="text-gray-600">Escuelas Certificadas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {Object.keys(byCountry).length}
            </div>
            <div className="text-gray-600">Países Disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {Object.values(byCountry).reduce((sum, cities) => sum + Object.keys(cities).length, 0)}
            </div>
            <div className="text-gray-600">Ciudades</div>
          </div>
        </div>

        {/* Quick City Links */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Buscar por Ciudad
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Killarney'].map((city) => (
              <Link
                key={city}
                href={`/escuelas/${city.toLowerCase()}`}
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-2xl mb-2">🏫</div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {city}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Schools by Country/City */}
        <div className="space-y-12">
          {Object.entries(byCountry).map(([country, cities]) => (
            <section key={country} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8 border-b pb-4">
                <div className="text-3xl">🌍</div>
                <h2 className="text-3xl font-bold text-gray-900">{country}</h2>
                <span className="ml-auto bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  {Object.values(cities).flat().length} escuelas
                </span>
              </div>

              {Object.entries(cities).map(([city, citySchools]) => (
                <div key={city} className="mb-10 last:mb-0">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-blue-600">📍</span>
                      {city}
                    </h3>
                    <Link
                      href={`/escuelas/${city.toLowerCase()}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                    >
                      Ver todas en {city} →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {citySchools.map((school) => (
                      <Link
                        key={school.slugEscuela}
                        href={school.url}
                        className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
                      >
                        {/* School Image */}
                        {school.image && (
                          <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                            <Image
                              src={rewriteToCDN(school.image)}
                              alt={school.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}

                        <div className="p-6">
                          <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {school.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                            <span>📍</span>
                            {school.city || 'Ubicación disponible'}, {school.country}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-600 font-semibold group-hover:underline">
                              Ver cursos y precios
                            </span>
                            <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Utiliza nuestro buscador avanzado para filtrar por ciudad, horario, duración y precio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/buscador-cursos-de-ingles"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              🔍 Buscar Cursos Ahora
            </Link>
            <Link
              href="/servicios"
              className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg border-2 border-white/20"
            >
              💬 Asesoría Gratuita
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
