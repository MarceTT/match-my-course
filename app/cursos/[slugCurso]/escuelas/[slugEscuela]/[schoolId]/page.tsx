import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { fetchSeoSchoolById } from '@/app/actions/seo';
import SchoolSeoHome from './SchoolSeoHome';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';
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
  if (!seoEntry) return { title: 'No encontrado', robots: { index: false, follow: false } };

  const expectedCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
  const expectedEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url) || slugEscuela;

  const canonicalPath =
    `/cursos/${encodeURIComponent(expectedCurso)}` +
    `/escuelas/${encodeURIComponent(expectedEscuela)}/${encodeURIComponent(schoolId)}`;
  const canonicalUrl = `${ORIGIN}${canonicalPath}`;

  const ogImage = rewriteToCDN(
    seoEntry.imageOpenGraph
  );

  return {
    title: seoEntry.metaTitle,
    description: seoEntry.metaDescription,
    keywords: seoEntry.keywordPrincipal,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: seoEntry.metaTitle,
      description: seoEntry.metaDescription,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seoEntry.metaTitle,
        },
      ],
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
  if (!seoEntry) return notFound();

  // 301 si los slugs no son los esperados → canónica SIN query
  const expectedCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
  const expectedEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url) || slugEscuela;

  if (slugCurso !== expectedCurso || slugEscuela !== expectedEscuela) {
    const canonicalPath =
      `/cursos/${encodeURIComponent(expectedCurso)}` +
      `/escuelas/${encodeURIComponent(expectedEscuela)}/${encodeURIComponent(schoolId)}`;
    return redirect(canonicalPath);
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

  return (
    <>
      {/* Server-rendered JSON-LD for better SEO discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
