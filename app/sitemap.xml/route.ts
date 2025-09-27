export const revalidate = 0;

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");
  const target = `${base}/sitemaps/index.xml`;
  return new Response(null, {
    status: 308,
    headers: {
      Location: target,
      // Allow caches to keep the redirect but not too long
      "Cache-Control": "public, max-age=600, s-maxage=86400",
    },
  });
}

