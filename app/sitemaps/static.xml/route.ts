export const revalidate = 86_400; // 24h

function toISODate(d: Date) {
  return d.toISOString();
}

function xml(strings: TemplateStringsArray, ...values: any[]) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
}

export async function GET() {
  const now = new Date();
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");

  const staticPaths: Array<{ path: string; changefreq: string; priority: number }> = [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/como-funciona-matchmycourse", changefreq: "monthly", priority: 0.8 },
    { path: "/escuelas-socias", changefreq: "weekly", priority: 0.7 },
    { path: "/servicios-matchmycourse", changefreq: "monthly", priority: 0.6 },
    { path: "/contacto", changefreq: "monthly", priority: 0.6 },
    { path: "/testimonios", changefreq: "monthly", priority: 0.5 },
    { path: "/ebook-estudiar-y-trabajar-extranjero", changefreq: "monthly", priority: 0.5 },
    { path: "/mision-vision-matchmycourse", changefreq: "yearly", priority: 0.4 },
    { path: "/quienes-somos", changefreq: "yearly", priority: 0.4 },
    { path: "/cursos-ingles-extranjero", changefreq: "monthly", priority: 0.6 },
  ];

  const urls = staticPaths
    .map(({ path, changefreq, priority }) => xml`
      <url>
        <loc>${base}${path}</loc>
        <lastmod>${toISODate(now)}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority.toFixed(1)}</priority>
      </url>
    `)
    .join("");

  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
