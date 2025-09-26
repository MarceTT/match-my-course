export const revalidate = 86_400; // 24h

function xml(strings: TemplateStringsArray, ...values: any[]) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
}

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");
  const now = new Date().toISOString();

  // Minimal set; si más adelante hay listado de posts, generar dinámicamente
  const urls = [
    `${base}/blog`,
    `${base}/blog/all`,
  ].map((loc) => xml`
    <url>
      <loc>${loc}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
  `);

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
