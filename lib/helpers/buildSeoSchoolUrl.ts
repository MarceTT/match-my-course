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

  // URL limpia sin schoolId ni query params para SEO-friendly URLs
  return `/cursos/${slugCurso}/escuelas/${slugEscuela}`;
}

// Devuelve únicamente el path canónico sin query params
// Ej.: /cursos/{curso}/escuelas/{escuela}
export function buildCanonicalSeoSchoolPathFromSeoEntry(
  seoEntry: { url: string; subcategoria: string }
) {
  const slugCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
  const slugEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url);
  if (!slugCurso || !slugEscuela) return "#";
  return `/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(
    slugEscuela
  )}`;
}

// Versión genérica cuando ya conoces los slugs
export function buildCanonicalSeoSchoolPath(
  slugCurso: string,
  slugEscuela: string
) {
  if (!slugCurso || !slugEscuela) return "#";
  return `/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(
    slugEscuela
  )}`;
}
