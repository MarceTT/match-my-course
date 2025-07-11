import { fetchSeoSchoolById } from "@/app/actions/seo";
import SchoolSeoHome from "./SchoolSeoHome";
import {
  buildSeoSchoolUrlFromSeoEntry,
  extractSlugEscuelaFromSeoUrl,
} from "@/lib/helpers/buildSeoSchoolUrl";
import {
  cursoSlugToSubcategoria,
  subcategoriaToCursoSlug,
} from "@/lib/courseMap";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slugCurso: string; schoolId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(context: Props): Promise<Metadata> {
  const { slugCurso, schoolId } = await context.params;
  const searchParams = await context.searchParams;

  const weeks = parseInt((searchParams.semanas as string) ?? "1", 10);
  const ciudad = (searchParams.ciudad as string) ?? "";
  const horario = (searchParams.horario as string) ?? "PM";

  const seoCourses = await fetchSeoSchoolById(schoolId);
  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);
  if (!seoEntry) {
    return {
      title: "No encontrado",
      robots: { index: false, follow: false },
    };
  }

  const canonical = buildSeoSchoolUrlFromSeoEntry(seoEntry, schoolId, {
    semanas: weeks,
    ciudad,
    horario,
  });

  return {
    title: seoEntry.metaTitle,
    description: seoEntry.metaDescription,
    keywords: seoEntry.keywordPrincipal,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: seoEntry.metaTitle,
      description: seoEntry.metaDescription,
      url: canonical,
      type: "website",
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slugCurso, schoolId } = await params;
  const weeks = parseInt((await searchParams).semanas as string);
  const schedule = (await searchParams).horario as string;
  const ciudad = (await searchParams).ciudad as string;

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) return notFound();

  const seoCourses = await fetchSeoSchoolById(schoolId);
  const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);
  if (!seoEntry) return notFound();

  const expectedSlugCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];

  if (slugCurso !== expectedSlugCurso) {
    const fullUrl = buildSeoSchoolUrlFromSeoEntry(seoEntry, schoolId, {
      semanas: weeks,
      ciudad,
      horario: schedule,
    });
    redirect(fullUrl);
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
