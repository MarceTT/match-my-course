import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { fetchSeoSchoolById } from '@/app/actions/seo';
import SchoolSeoHome from './SchoolSeoHome';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';
import { cursoSlugToSubcategoria, subcategoriaToCursoSlug } from '@/lib/courseMap';

// Tipos de props (App Router)
export type PageParams = { slugCurso: string; slugEscuela: string; schoolId: string };
export type PageSearch = Record<string, string | string[] | undefined>;

type Props = {
  params: PageParams;
  searchParams: PageSearch;
};

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slugCurso, slugEscuela, schoolId } = params;

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) {
    return { title: 'No encontrado', robots: { index: false, follow: false } };
  }

  const seoCourses = await fetchSeoSchoolById(schoolId);
  const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);
  if (!seoEntry) {
    return { title: 'No encontrado', robots: { index: false, follow: false } };
  }

  // Canónico SIN query; usa slugs esperados si difieren
  const expectedSlugCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
  const expectedSlugEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url) || slugEscuela;

  const canonicalPath = `/cursos/${encodeURIComponent(expectedSlugCurso)}/escuelas/${encodeURIComponent(expectedSlugEscuela)}/${encodeURIComponent(schoolId)}`;

  return {
    title: seoEntry.metaTitle,
    description: seoEntry.metaDescription,
    keywords: seoEntry.keywordPrincipal,
    alternates: { canonical: canonicalPath },
    robots: { index: true, follow: true },
    openGraph: {
      title: seoEntry.metaTitle,
      description: seoEntry.metaDescription,
      url: canonicalPath,
      type: 'website',
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slugCurso, slugEscuela, schoolId } = params;

  // Defaults para no depender de query
  const weeks = Number.parseInt((searchParams.semanas as string) ?? '1', 10) || 1;
  const schedule = (searchParams.horario as string) ?? 'PM';

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) return notFound();

  const seoCourses = await fetchSeoSchoolById(schoolId);
  const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);
  if (!seoEntry) return notFound();

  // Si los slugs no coinciden, redirige a la canónica SIN query
  const expectedSlugCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
  const expectedSlugEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url) || slugEscuela;

  if (slugCurso !== expectedSlugCurso || slugEscuela !== expectedSlugEscuela) {
    const canonicalPath = `/cursos/${encodeURIComponent(expectedSlugCurso)}/escuelas/${encodeURIComponent(expectedSlugEscuela)}/${encodeURIComponent(schoolId)}`;
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
