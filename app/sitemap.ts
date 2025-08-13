import type { MetadataRoute } from "next";
import { fetchAllSeoEntries } from "@/app/actions/seo";
import { subcategoriaToCursoSlug } from "@/lib/courseMap";

// Usa un origen canónico estable (no NEXTAUTH_URL)
const CANONICAL_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");

export const revalidate = 86_400; // WHY: sitemap estable (24h)

function normSlug(input: string | undefined | null): string | null {
  if (!input) return null;
  return String(input).trim().toLowerCase();
}

function extractSlugEscuelaFromSeoUrl(url: string): string | null {
  try {
    const u = new URL(url, CANONICAL_ORIGIN);
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("escuelas");
    if (idx >= 0 && parts[idx + 1]) return normSlug(parts[idx + 1]);
  } catch {}
  const parts = url.split("/");
  const idx = parts.indexOf("escuelas");
  return idx !== -1 && parts[idx + 1] ? normSlug(parts[idx + 1]) : null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = CANONICAL_ORIGIN; // siempre https apex

  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/terminos-y-condiciones`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/politica-de-privacidad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/testimonios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  let data: unknown = [];
  try {
    data = await fetchAllSeoEntries();
  } catch {}

  const schools = Array.isArray(data) ? data : [data];
  const seen = new Set<string>();

  for (const entry of schools as Array<any>) {
    const subcat = entry?.subcategoria as string | undefined;
    const schoolId = entry?.schoolId as string | undefined;
    const slugCurso = normSlug(subcategoriaToCursoSlug[subcat as keyof typeof subcategoriaToCursoSlug]);
    const escuelaSlug = extractSlugEscuelaFromSeoUrl(String(entry?.url ?? ""));

    // WHY: sólo emitimos si existen todos los slugs requeridos
    if (!slugCurso || !escuelaSlug || !schoolId) continue;

    const path = `/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(escuelaSlug)}/${encodeURIComponent(schoolId)}`;
    const absolute = `${base}${path}`; // SIN query → canónico

    if (!seen.has(absolute)) {
      seen.add(absolute);
      urls.push({
        url: absolute,
        lastModified: new Date(), // si tienes updatedAt en tu BD, úsalo aquí
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return urls;
}