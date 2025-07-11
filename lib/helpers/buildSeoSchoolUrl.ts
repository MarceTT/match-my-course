import { subcategoriaToCursoSlug } from "@/lib/courseMap";

export function extractSlugEscuelaFromSeoUrl(seoUrl: string): string {
  try {
    const parts = seoUrl.split("/");
    const slugEscuela = parts[4] || "";
    if (!slugEscuela) console.warn("slugEscuela inválido en SEO URL →", seoUrl);
    return slugEscuela;
  } catch (e) {
    console.error("extractSlugEscuelaFromSeoUrl(): error inesperado →", e);
    return "";
  }
}

export function buildSeoSchoolUrlFromSeoEntry(
  seoEntry: { url: string; subcategoria: string },
  schoolId: string,
  params: {
    semanas: number | string;
    ciudad: string;
    horario: string;
    [key: string]: string | number;
  }
): string {
  const slugCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
  const slugEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url);

  if (!slugCurso || !slugEscuela) {
    throw new Error(
      `buildSeoSchoolUrlFromSeoEntry(): slugs inválidos. slugCurso=${slugCurso}, slugEscuela=${slugEscuela}, url=${seoEntry.url}`
    );
  }

  const basePath = `/cursos/${slugCurso}/escuelas/${slugEscuela}/${schoolId}`;
  const baseUrl = new URL(
    basePath,
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  baseUrl.searchParams.set("curso", slugCurso);
  for (const [key, value] of Object.entries(params)) {
    baseUrl.searchParams.set(key, value.toString());
  }

  return baseUrl.pathname + baseUrl.search;
}
