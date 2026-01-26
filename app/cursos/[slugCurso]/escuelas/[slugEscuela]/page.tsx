import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAllSeoEntries, fetchSeoSchoolById } from '@/app/actions/seo';
import { fetchSchoolById } from '@/app/actions/school';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';
import { cursoSlugToSubcategoria, subcategoriaToCursoSlug } from '@/lib/courseMap';
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';
import SchoolSeoHome from './SchoolSeoHome';

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

// Pre-generate static pages for top schools at build time
export async function generateStaticParams() {
  try {
    const result: any = await fetchAllSeoEntries();
    let entries: Array<any> = [];

    if (Array.isArray(result)) {
      entries = result;
    } else if (result && typeof result === 'object' && 'data' in result) {
      entries = Array.isArray(result.data) ? result.data : [];
    }

    // Generate params for all schools with all course types
    const params: Array<{ slugCurso: string; slugEscuela: string }> = [];

    entries.forEach((entry) => {
      if (!entry || !entry.subcategoria || !entry.url) return;

      const slugCurso = subcategoriaToCursoSlug[entry.subcategoria];
      const slugEscuela = extractSlugEscuelaFromSeoUrl(String(entry.url));

      if (slugCurso && slugEscuela) {
        params.push({ slugCurso, slugEscuela });
      }
    });

    console.log(`[generateStaticParams] Generated ${params.length} school pages for pre-rendering`);

    // Generate ALL pages for better SEO and indexation
    return params;
  } catch (error) {
    console.error('[generateStaticParams] Error:', error);
    return [];
  }
}

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

  // Construir título simple: Nombre de escuela | MatchMyCourse
  const brand = 'MatchMyCourse';
  const schoolName = seoEntry?.escuela || seoEntry?.h1 || 'Escuela de inglés';
  const dynamicTitle = `${schoolName} | ${brand}`;
  const description = seoEntry.metaDescription || `Descubre ${schoolName}, la mejor opción para aprender inglés en Irlanda con cursos de calidad, profesores nativos y experiencia inmersiva.`;

  // Open Graph images con múltiples dimensiones para diferentes plataformas
  const ogImages = ogImage ? [
    // Facebook (1200x630)
    { url: ogImage, width: 1200, height: 630, alt: dynamicTitle, type: 'image/jpeg' },
    // Instagram (1080x1080 - square, optimal for feed)
    { url: ogImage, width: 1080, height: 1080, alt: dynamicTitle, type: 'image/jpeg' },
    // X/Twitter (1200x675)
    { url: ogImage, width: 1200, height: 675, alt: dynamicTitle, type: 'image/jpeg' },
  ] : [];

  // Check if this specific URL combination should have noindex
  // Note: Using the canonical slugs (after redirects from next.config.ts)
  // These combinations are noindexed to prevent duplicate content issues
  // TODO: Consider using canonical URLs instead of noindex if these pages have value
  const shouldNoIndex = (
    (slugCurso === 'ingles-general-orientado-a-negocios' && slugEscuela === 'cork-english-academy') ||
    (slugCurso === 'ingles-visa-de-trabajo' && slugEscuela === 'cork-english-academy') ||
    (slugCurso === 'ingles-visa-de-trabajo' && slugEscuela === 'future-learning-language-school-dublin') ||
    (slugCurso === 'ingles-general-mas-sesiones-individuales' && slugEscuela === 'cork-english-academy')
  );

  return {
    title: dynamicTitle,
    description: description,
    keywords: seoEntry.keywordPrincipal,
    alternates: { canonical: canonicalUrl },
    robots: { index: !shouldNoIndex, follow: true },
    openGraph: {
      title: dynamicTitle,
      description: description,
      url: canonicalUrl,
      type: 'website',
      siteName: brand,
      locale: 'es_ES',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: dynamicTitle,
      description: description,
      images: ogImage ? [ogImage] : [],
      creator: '@matchmycourse',
      site: '@matchmycourse',
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

  // Determinar semanas por defecto según el tipo de curso
  const defaultWeeks = subcategoria === 'Programa Estudio y Trabajo (25 semanas)' ? 25 : 1;
  const weeks = Number.parseInt((sp.semanas as string) ?? String(defaultWeeks), 10) || defaultWeeks;
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

  // Calculate course instance dates (starting today, duration based on weeks)
  const today = new Date();
  const startDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  const endDate = new Date(today.getTime() + weeks * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseTitle,
    description:
      (seoEntry as any)?.metaDescription ||
      (seoEntry as any)?.h1 ||
      `Mejora tu inglés con clases dinámicas, profesores nativos y opciones de visa estudio + trabajo en Irlanda.`,
    provider: {
      '@type': 'Organization',
      name: 'Match My Course',
      url: `${origin}/`,
    },
    inLanguage: 'en',
    url: canonicalUrl,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'OnSite',
      location: {
        '@type': 'Place',
        name: `${city || 'Irlanda'}, Irlanda`,
      },
      startDate: startDate,
      endDate: endDate,
    },
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
