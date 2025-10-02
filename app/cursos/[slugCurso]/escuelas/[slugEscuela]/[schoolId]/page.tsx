import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { fetchSeoSchoolById } from '@/app/actions/seo';
import { fetchSchoolById } from '@/app/actions/school';
import SchoolSeoHome from './SchoolSeoHome';
import { extractSlugEscuelaFromSeoUrl, buildCanonicalSeoSchoolPath } from '@/lib/helpers/buildSeoSchoolUrl';
import { cursoSlugToSubcategoria, subcategoriaToCursoSlug } from '@/lib/courseMap';
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';

type PageParams = { slugCurso: string; slugEscuela: string; schoolId: string };
type PageSearch = Record<string, string | string[] | undefined>;
type Props = { params: Promise<PageParams>; searchParams: Promise<PageSearch> };

// Origen canónico absoluto (sin barra final) — evita relativas en <link rel="canonical">
const ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matchmycourse.com').replace(/\/$/, '');

export async function generateMetadata(ctx: Props): Promise<Metadata> {
  const { slugCurso, slugEscuela, schoolId } = await ctx.params;

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) return { title: 'No encontrado', robots: { index: false, follow: false } };

  const seoCourses = await fetchSeoSchoolById(schoolId);
  const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);
  if (!seoEntry) {
    // Fallback: permitir indexación básica cuando no existe entrada SEO específica
    const canonicalPath = buildCanonicalSeoSchoolPath(slugCurso, slugEscuela, schoolId);
    const canonicalUrl = `${ORIGIN}${canonicalPath}`;

    try {
      const schoolData = await fetchSchoolById(schoolId);
      const school = schoolData?.school || schoolData?.data?.school;
      const name = school?.name || 'Escuela de inglés';
      const cityName = school?.city || '';
      const city = cityName ? ` en ${cityName}` : '';
      const subcatName = cursoSlugToSubcategoria[slugCurso] || 'Cursos de inglés';
      const ogImage = school?.mainImage ? rewriteToCDN(school.mainImage) : undefined;

      return {
        title: `${name}${city} | ${subcatName} | MatchMyCourse`,
        description: `Compara ${subcatName.toLowerCase()}${city}. Información de la escuela, precios y opciones de estudio en MatchMyCourse.`,
        alternates: { canonical: canonicalUrl },
        robots: { index: true, follow: true },
        openGraph: {
          title: `${name}${city} | ${subcatName} | MatchMyCourse`,
          description: `Compara ${subcatName.toLowerCase()}${city}.`,
          url: canonicalUrl,
          type: 'website',
          images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: name }] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${name}${city} | ${subcatName} | MatchMyCourse`,
          description: `Compara ${subcatName.toLowerCase()}${city}.`,
          images: ogImage ? [ogImage] : [],
        },
      };
    } catch {
      // Si falla el fallback, al menos exponemos la canónica e index
      return {
        title: 'Cursos de inglés | MatchMyCourse',
        alternates: { canonical: canonicalUrl },
        robots: { index: true, follow: true },
      };
    }
  }

  const expectedCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
  const expectedEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url) || slugEscuela;

  const canonicalPath =
    `/cursos/${encodeURIComponent(expectedCurso)}` +
    `/escuelas/${encodeURIComponent(expectedEscuela)}/${encodeURIComponent(schoolId)}`;
  const canonicalUrl = `${ORIGIN}${canonicalPath}`;

  const ogImage = rewriteToCDN(seoEntry.imageOpenGraph);

  // Construye título dinámico asegurando nombre de escuela y marca
  const brand = 'MatchMyCourse';
  const schoolName = (seoEntry as any)?.escuela || (seoEntry as any)?.h1 || '';
  const subcatName = cursoSlugToSubcategoria[slugCurso] || '';
  const city = (seoEntry as any)?.ciudad || '';
  const baseCandidate = (seoEntry as any)?.metaTitle || '';
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
      images: [
        { url: ogImage, width: 1200, height: 630, alt: dynamicTitle },
      ],
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
  const { slugCurso, slugEscuela, schoolId } = await params;

  // Defaults internos → no dependas de query para render
  const sp = await searchParams;
  const weeks = Number.parseInt((sp.semanas as string) ?? '1', 10) || 1;
  const schedule = (sp.horario as string) ?? 'PM';

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) return notFound();

  const seoCourses = await fetchSeoSchoolById(schoolId);
  const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);

  // 301 si los slugs no son los esperados → canónica SIN query
  if (seoEntry) {
    const expectedCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
    const expectedEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url) || slugEscuela;
    if (slugCurso !== expectedCurso || slugEscuela !== expectedEscuela) {
      const canonicalPath =
        `/cursos/${encodeURIComponent(expectedCurso)}` +
        `/escuelas/${encodeURIComponent(expectedEscuela)}/${encodeURIComponent(schoolId)}`;
      return redirect(canonicalPath);
    }
  }

  // Build canonical URL (server-side) for JSON-LD
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matchmycourse.com').replace(/\/$/, '');
  const canonicalPath =
    `/cursos/${encodeURIComponent(slugCurso)}` +
    `/escuelas/${encodeURIComponent(slugEscuela)}/${encodeURIComponent(schoolId)}`;
  const canonicalUrl = `${origin}${canonicalPath}`;

  // EducationalOrganization schema using available SEO data
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: seoEntry?.h1 || seoEntry?.escuela,
    url: canonicalUrl,
    // Use Open Graph image as a lightweight logo fallback if present
    ...(seoEntry?.imageOpenGraph
      ? { logo: rewriteToCDN(seoEntry.imageOpenGraph) }
      : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: seoEntry?.ciudad || undefined,
    },
  } as const;

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

  // Course schema (per subcategoría) con fallback básico
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
      `Información del curso ${cursoSlugToSubcategoria[slugCurso] || ''}${
        city ? ` en ${city}` : ''
      }.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: schoolName || undefined,
      url: canonicalUrl,
    },
    courseMode: 'OnSite',
    inLanguage: ['en'],
    areaServed: city || undefined,
  } as const;

  return (
    <>
      {/* Server-rendered JSON-LD for better SEO discovery (solo si hay entrada SEO) */}
      {seoEntry && (
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
      {/* Course JSON-LD (siempre con fallback) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <SchoolSeoHome
        schoolId={schoolId}
        seoCourses={seoCourses}
        slugCurso={slugCurso}
        weeks={weeks}
        schedule={schedule}
      />
    </>
  );
}
