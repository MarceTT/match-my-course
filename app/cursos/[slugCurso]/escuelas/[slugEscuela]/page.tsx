import { permanentRedirect } from "next/navigation";
import { fetchAllSeoEntries } from "@/app/actions/seo";
import { cursoSlugToSubcategoria } from "@/lib/courseMap";
import { extractSlugEscuelaFromSeoUrl } from "@/lib/helpers/buildSeoSchoolUrl";

type Params = { slugCurso: string; slugEscuela: string };
type Props = { params: Promise<Params> };

export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
  const { slugCurso, slugEscuela } = await params;

  const subcategoria = (cursoSlugToSubcategoria as Record<string, string | undefined>)[slugCurso];

  // Si el curso no es reconocido, envía al buscador general por curso
  if (!subcategoria) return permanentRedirect(`/school-search?course=${encodeURIComponent(slugCurso)}`);

  // Busca coincidencia única por (curso/subcategoría + slug de escuela)
  let entries: Array<any> = [];
  try {
    entries = await fetchAllSeoEntries();
  } catch (e) {
    // Si el backend falla, redirige al buscador por curso
    return permanentRedirect(`/school-search?course=${encodeURIComponent(slugCurso)}`);
  }

  const matches = (Array.isArray(entries) ? entries : [entries]).filter((e) => {
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

  if (matches.length === 1 && matches[0]?.schoolId) {
    const schoolId = String(matches[0].schoolId);
    return permanentRedirect(`/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(slugEscuela)}/${encodeURIComponent(schoolId)}`);
  }

  // Cero o múltiples coincidencias → buscador por curso (sin 404)
  return permanentRedirect(`/school-search?course=${encodeURIComponent(slugCurso)}`);
}
