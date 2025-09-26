export const revalidate = 86_400; // 24h

function xml(strings: TemplateStringsArray, ...values: any[]) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
}

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");
  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>${base}/sitemaps/static.xml</loc></sitemap>
      <sitemap><loc>${base}/sitemaps/schools.xml</loc></sitemap>
      <sitemap><loc>${base}/sitemaps/blog.xml</loc></sitemap>
    </sitemapindex>
  `;
  return new Response(body.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cloudflare-friendly: cache at edge 24h, allow 10m browser cache, SWR for a day
      "Cache-Control": "public, max-age=600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
