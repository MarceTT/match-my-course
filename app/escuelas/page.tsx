import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllSeoEntries } from '@/app/actions/seo';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';
import { subcategoriaToCursoSlug } from '@/lib/courseMap';

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
          city: entry.ciudad || 'Dublin',
          country: entry.pais || 'Irlanda',
          slugCurso,
          slugEscuela,
          url: `/cursos/${slugCurso}/escuelas/${slugEscuela}`,
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
    if (!acc[school.country]) {
      acc[school.country] = {};
    }
    if (!acc[school.country][school.city]) {
      acc[school.country][school.city] = [];
    }
    acc[school.country][school.city].push(school);
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
          addressLocality: school.city,
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

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escuelas de Inglés Certificadas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre {schools.length} escuelas de inglés en el extranjero.
            Todas nuestras escuelas están certificadas y ofrecen cursos de calidad
            para estudiantes internacionales.
          </p>
        </header>

        {/* Schools by Country/City */}
        <div className="space-y-12">
          {Object.entries(byCountry).map(([country, cities]) => (
            <section key={country} className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
                {country}
              </h2>

              {Object.entries(cities).map(([city, citySchools]) => (
                <div key={city} className="mb-8 last:mb-0">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {city} ({citySchools.length})
                  </h3>

                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {citySchools.map((school) => (
                      <li key={school.slugEscuela}>
                        <Link
                          href={school.url}
                          className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200"
                        >
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {school.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {school.city}, {school.country}
                          </p>
                          <span className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block">
                            Ver cursos →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-600 mb-6">
            Utiliza nuestro buscador avanzado para filtrar por ciudad, horario, duración y precio.
          </p>
          <Link
            href="/buscador-cursos-de-ingles"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Buscar Cursos
          </Link>
        </div>
      </div>
    </>
  );
}
