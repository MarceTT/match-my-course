import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAllSeoEntries, fetchSeoSchoolById } from '@/app/actions/seo';
import { fetchSchoolById } from '@/app/actions/school';
import dynamic from 'next/dynamic';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';
import { cursoSlugToSubcategoria, subcategoriaToCursoSlug } from '@/lib/courseMap';
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';

// Lazy load SchoolSeoHome
const SchoolSeoHome = dynamic(() => import('./SchoolSeoHome'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Cargando...</div>
    </div>
  ),
});

type Params = { slugCurso: string; slugEscuela: string };
type PageSearch = Record<string, string | string[] | undefined>;
type Props = { params: Promise<Params>; searchParams: Promise<PageSearch> };

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://matchmycourse.com'
).replace(/\/$/, '');

// ISR para performance
export const revalidate = 900; // 15 minutos

export async function generateMetadata(ctx: Props): Promise<Metadata> {
  const { slugCurso, slugEscuela } = await ctx.params;

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) return { title: 'No encontrado', robots: { index: false, follow: false } };

  // Buscar schoolId desde slugs
  let entries: Array<any> = [];
  try {
    const result: any = await fetchAllSeoEntries();
    if (Array.isArray(result)) {
      entries = result;
    } else if (result && typeof result === 'object' && 'data' in result) {
      entries = Array.isArray(result.data) ? result.data : [];
    }
  } catch (e) {
    return { title: 'Error', robots: { index: false, follow: false } };
  }

  const matches = entries.filter((e) => {
    if (!e) return false;
    try {
      const sameSubcat = String(e.subcategoria) === String(subcategoria);
      const esc = extractSlugEscuelaFromSeoUrl(String(e.url ?? ""));
      const sameSchool = esc === slugEscuela;
      return sameSubcat && sameSchool;
    } catch {
      return false;
    }
  });

  if (matches.length !== 1 || !matches[0]?.schoolId) {
    return { title: 'No encontrado', robots: { index: false, follow: false } };
  }

  const schoolId = String(matches[0].schoolId);
  const seoEntry = matches[0];

  // URL canónica SIN schoolId
  const canonicalPath = `/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(slugEscuela)}`;
  const canonicalUrl = `${ORIGIN}${canonicalPath}`;

  const ogImage = seoEntry.imageOpenGraph ? rewriteToCDN(seoEntry.imageOpenGraph) : undefined;

  // Construir título dinámico
  const brand = 'MatchMyCourse';
  const schoolName = seoEntry?.escuela || seoEntry?.h1 || '';
  const subcatName = cursoSlugToSubcategoria[slugCurso] || '';
  const city = seoEntry?.ciudad || '';
  const baseCandidate = seoEntry?.metaTitle || '';
  const lower = (s: string) => s.toLowerCase();
  let dynamicTitle = baseCandidate || `${schoolName || 'Escuela de inglés'}${city ? ` en ${city}` : ''}${subcatName ? ` | ${subcatName}` : ''}`;
  if (schoolName && !lower(dynamicTitle).includes(lower(schoolName))) {
    dynamicTitle = `${schoolName} | ${dynamicTitle}`;
  }
  if (!lower(dynamicTitle).includes('matchmycourse')) {
    dynamicTitle = `${dynamicTitle} | ${brand}`;
  }

  return {
    title: dynamicTitle,
    description: seoEntry.metaDescription,
    keywords: seoEntry.keywordPrincipal,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: dynamicTitle,
      description: seoEntry.metaDescription,
      url: canonicalUrl,
      type: 'website',
      images: ogImage ? [
        { url: ogImage, width: 1200, height: 630, alt: dynamicTitle },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: dynamicTitle,
      description: seoEntry.metaDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slugCurso, slugEscuela } = await params;

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) return notFound();

  // Buscar schoolId desde backend
  let entries: Array<any> = [];
  try {
    const result: any = await fetchAllSeoEntries();
    if (Array.isArray(result)) {
      entries = result;
    } else if (result && typeof result === 'object' && 'data' in result) {
      entries = Array.isArray(result.data) ? result.data : [];
    }
  } catch (e) {
    return notFound();
  }

  const matches = entries.filter((e) => {
    if (!e) return false;
    try {
      const sameSubcat = String(e.subcategoria) === String(subcategoria);
      const esc = extractSlugEscuelaFromSeoUrl(String(e.url ?? ""));
      const sameSchool = esc === slugEscuela;
      return sameSubcat && sameSchool;
    } catch {
      return false;
    }
  });

  if (matches.length !== 1 || !matches[0]?.schoolId) {
    return notFound();
  }

  const schoolId = String(matches[0].schoolId);

  // Obtener datos completos
  const sp = await searchParams;
  const weeks = Number.parseInt((sp.semanas as string) ?? '1', 10) || 1;
  const schedule = (sp.horario as string) ?? 'PM';

  const seoCourses = await fetchSeoSchoolById(schoolId);

  // Build canonical URL (server-side) for JSON-LD - SIN schoolId
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matchmycourse.com').replace(/\/$/, '');
  const canonicalPath = `/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(slugEscuela)}`;
  const canonicalUrl = `${origin}${canonicalPath}`;

  const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);

  // EducationalOrganization schema
  const orgSchema = seoEntry ? {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: seoEntry?.h1 || seoEntry?.escuela,
    url: canonicalUrl,
    ...(seoEntry?.imageOpenGraph
      ? { logo: rewriteToCDN(seoEntry.imageOpenGraph) }
      : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: seoEntry?.ciudad || undefined,
    },
  } as const : null;

  // Breadcrumbs schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${origin}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cursoSlugToSubcategoria[slugCurso] || 'Cursos de inglés',
        item: `${origin}/cursos/${slugCurso}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: seoEntry?.h1 || seoEntry?.escuela,
        item: canonicalUrl,
      },
    ],
  } as const;

  // Course schema
  let schoolName = seoEntry?.escuela as string | undefined;
  let city = seoEntry?.ciudad as string | undefined;
  if (!schoolName || !city) {
    try {
      const schoolData = !seoEntry ? await fetchSchoolById(schoolId) : null;
      const school = schoolData?.school || schoolData?.data?.school;
      schoolName = schoolName || school?.name;
      city = city || school?.city;
    } catch {
      // ignore
    }
  }

  const courseTitle = `${cursoSlugToSubcategoria[slugCurso] || 'Curso de inglés'}${
    schoolName ? ` en ${schoolName}` : ''
  }`;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseTitle,
    description:
      (seoEntry as any)?.metaDescription ||
      (seoEntry as any)?.h1 ||
      `Mejora tu inglés con clases dinámicas, profesores nativos y opciones de visa estudio + trabajo en Irlanda.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Match My Course',
      url: `${origin}/`,
    },
    courseMode: 'OnSite',
    inLanguage: 'en',
    areaServed: city || 'Irlanda',
    url: canonicalUrl,
  } as const;

  // Texto breve para integrar visualmente debajo del H1 del hero
  const subcat = cursoSlugToSubcategoria[slugCurso] || 'Curso de inglés';
  const cityName = (seoEntry as any)?.ciudad as string | undefined;
  const head = `${subcat}${schoolName ? ` en ${schoolName}` : ''}${cityName ? `, ${cityName}` : ''}.`;
  const subcatLine = (() => {
    switch (subcat) {
      case 'Inglés General':
        return 'Mejora tu inglés del día a día con enfoque comunicativo, grupos reducidos y horarios flexibles.';
      case 'Inglés General Intensivo':
        return 'Acelera tu progreso con más horas semanales y práctica intensiva de speaking y listening.';
      case 'Inglés de Negocios':
        return 'Desarrolla inglés profesional: presentaciones, reuniones y vocabulario corporativo orientado al trabajo.';
      case 'Inglés General + Sesiones Individuales':
        return 'Combina clases grupales con tutorías 1:1 para objetivos específicos y avance personalizado.';
      case 'Programa Estudio y Trabajo (25 semanas)':
        return 'Programa ideal para estancias largas en Irlanda: estudia inglés y trabaja con permiso compatible.';
      default:
        return 'Enfocado en resultados y experiencia real en aula para avanzar con confianza.';
    }
  })();
  const summaryText = `${head} ${subcatLine} Compara precios, horarios y requisitos y reserva con MatchMyCourse.`;

  return (
    <>
      {/* Server-rendered JSON-LD for better SEO discovery */}
      {orgSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        </>
      )}
      {/* Course JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <SchoolSeoHome
        schoolId={schoolId}
        slugCurso={slugCurso}
        weeks={weeks}
        schedule={schedule}
        summaryText={summaryText}
      />
    </>
  );
}
