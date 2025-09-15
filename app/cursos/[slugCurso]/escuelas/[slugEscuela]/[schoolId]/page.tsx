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

  return (
    <SchoolSeoHome
      schoolId={schoolId}
      seoCourses={seoCourses}
      slugCurso={slugCurso}
      weeks={weeks}
      schedule={schedule}
    />
  );
}
