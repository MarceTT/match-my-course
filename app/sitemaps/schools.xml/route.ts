import { fetchAllSeoEntries } from "@/app/actions/seo";
import { subcategoriaToCursoSlug } from "@/lib/courseMap";
import { extractSlugEscuelaFromSeoUrl } from "@/lib/helpers/buildSeoSchoolUrl";

export const revalidate = 86_400; // 24h

function xml(strings: TemplateStringsArray, ...values: any[]) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
}

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");
  let entries: Array<any> = [];
  try {
    entries = await fetchAllSeoEntries();
  } catch {
    entries = [];
  }

  const seen = new Set<string>();
  const urls: string[] = [];

  for (const e of Array.isArray(entries) ? entries : [entries]) {
    if (!e) continue;
    try {
      const slugCurso = (subcategoriaToCursoSlug as Record<string, string | undefined>)[String(e.subcategoria)];
      const escuelaSlug = extractSlugEscuelaFromSeoUrl(String(e.url ?? ""));
      const schoolId = e.schoolId ? String(e.schoolId) : null;
      if (!slugCurso || !escuelaSlug || !schoolId) continue;
      const absolute = `${base}/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(escuelaSlug)}/${encodeURIComponent(schoolId)}`;
      if (seen.has(absolute)) continue;
      seen.add(absolute);
      urls.push(xml`
        <url>
          <loc>${absolute}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    } catch {
      // ignore bad entries
    }
  }

  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("")}
    </urlset>
  `;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
