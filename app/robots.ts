import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://matchmycourse.com").replace(/\/$/, "");

  const disallowedPaths = ["/admin", "/login", "/api", "/thankyou-booking", "/thankyou-page", "/unauthorized"];

  return {
    rules: [
      // === REGLA 1: Googlebot y variantes (máxima prioridad) ===
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/admin", "/login", "/api"],
      },

      // === REGLA 2: Bots de búsqueda AI (permitir para visibilidad) ===
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "FirecrawlAgent",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "AndiBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "ExaBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "PhindBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "YouBot",
        allow: "/",
        disallow: disallowedPaths,
      },

      // === REGLA 3: Bots de entrenamiento AI (BLOQUEAR) ===
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "Omgilibot",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },
      {
        userAgent: "Diffbot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "ImagesiftBot",
        disallow: "/",
      },

      // === REGLA 4: Bots genéricos (permitir con restricciones) ===
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/api/sitemap-video`,
    ],
  };
}
