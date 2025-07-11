import type { MetadataRoute } from "next";
import { fetchAllSeoEntries } from "@/app/actions/seo";
import {
  cursoSlugToSubcategoria,
  subcategoriaToCursoSlug,
} from "@/lib/courseMap";

// 🔧 Utilidad para extraer el slug de la escuela desde la URL
function extractSlugEscuelaFromSeoUrl(url: string): string {
  const parts = url.split("/");
  const index = parts.indexOf("escuelas");
  return index !== -1 && parts.length > index + 1 ? parts[index + 1] : "escuela";
}

export const revalidate = 3600; // cada hora
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const data = await fetchAllSeoEntries();
  const schools = Array.isArray(data) ? data : [data];
  const urls: MetadataRoute.Sitemap = [];

  urls.push(
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/terminos-y-condiciones`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/politica-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/servicios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/testimonios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    }
  );

  schools.forEach((entry) => {
    const slugCurso = subcategoriaToCursoSlug[entry.subcategoria];
    if (!slugCurso) return; // Si no hay mapeo, evitar errores

    const escuelaSlug = extractSlugEscuelaFromSeoUrl(entry.url);
    const path = `/cursos/${slugCurso}/escuelas/${escuelaSlug}/${entry.schoolId}`;

    const params = new URLSearchParams({
      curso: slugCurso,
      schoolId: entry.schoolId,
      semanas: "1",
      ciudad: entry.ciudad || "Dublin",
      horario: "PM",
    });

    urls.push({
      url: `${base}${path}?${params.toString()}`.replace(/&/g, "&amp;"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return urls;
}
