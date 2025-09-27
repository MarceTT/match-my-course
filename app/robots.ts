import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login", "/api", "/thankyou-page", "/unauthorized"],
      },
    ],
    // Unificar referencia al índice principal
    sitemap: `${base}/sitemaps/index.xml`,
  };
}
