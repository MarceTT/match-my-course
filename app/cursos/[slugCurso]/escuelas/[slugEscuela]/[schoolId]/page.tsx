import { redirect, notFound } from 'next/navigation';
import { fetchSeoSchoolById } from '@/app/actions/seo';
import { cursoSlugToSubcategoria, subcategoriaToCursoSlug } from '@/lib/courseMap';
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl';

type PageParams = { slugCurso: string; slugEscuela: string; schoolId: string };
type Props = { params: Promise<PageParams> };

/**
 * Esta ruta ahora solo redirige a la URL sin ID (SEO-friendly)
 *
 * Antes: /cursos/ingles-general/escuelas/killarney-school-of-english/67c8a695a430de4b13da2498
 * Ahora: /cursos/ingles-general/escuelas/killarney-school-of-english
 *
 * Redirect 301 permanente para SEO
 */
export default async function Page({ params }: Props) {
  const { slugCurso, slugEscuela, schoolId } = await params;

  const subcategoria = cursoSlugToSubcategoria[slugCurso];
  if (!subcategoria) return notFound();

  try {
    const seoCourses = await fetchSeoSchoolById(schoolId);
    const seoEntry = seoCourses.find((c: any) => c.subcategoria === subcategoria);

    if (seoEntry) {
      // Obtener los slugs correctos desde el entry SEO
      const expectedCurso = subcategoriaToCursoSlug[seoEntry.subcategoria];
      const expectedEscuela = extractSlugEscuelaFromSeoUrl(seoEntry.url) || slugEscuela;

      // Redirect permanente a URL sin ID
      const cleanUrl = `/cursos/${encodeURIComponent(expectedCurso)}/escuelas/${encodeURIComponent(expectedEscuela)}`;
      return redirect(cleanUrl);
    }
  } catch (e) {
    // Si falla la búsqueda, redirigir con los slugs que tenemos
  }

  // Fallback: redirigir a URL sin ID con los slugs recibidos
  const cleanUrl = `/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(slugEscuela)}`;
  return redirect(cleanUrl);
}
