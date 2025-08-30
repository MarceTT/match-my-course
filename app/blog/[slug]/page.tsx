import type { Metadata } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchPostBySlug } from "@/app/hooks/blog/useGetPostBySlug";
import { getPostBySlugServer } from "@/app/blog/_server/getPosts.server";
import ReactQueryProvider from "@/app/blog/providers";
import PostClient from "@/app/blog/[slug]/PostClient";
import { Suspense } from "react";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

// Dominio absoluto (sin / final)
const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://matchmycourse.com"
).replace(/\/$/, "");

const SITE_NAME = "MatchMyCourse - Blog";
export const revalidate = 1800;

// Absolutiza path/URL
const absUrl = (u: string) => (/^https?:\/\//i.test(u) ? u : `${ORIGIN}${u.startsWith("/") ? "" : "/"}${u}`);

// Snippet limpio de MD/HTML (140–160 aprox)
function extractTextSnippet(raw?: string, max = 160): string {
  if (!raw) return "";
  let s = raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1 ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^>+\s*/gm, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/[*_~]+/g, " ")
    .replace(/^[\-\+\*]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return "";
  if (s.length <= max) return s;
  s = s.slice(0, max + 1);
  const cut = Math.max(s.lastIndexOf(". "), s.lastIndexOf(" "));
  return (cut > 80 ? s.slice(0, cut) : s.slice(0, max)).trim() + "…";
}

// Metadata para SEO
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlugServer(slug);

    const titleBase = post?.metaTitle || post?.title || "Post";
    const title = `${titleBase} | ${SITE_NAME}`;

    // Descripción del post (nunca genérica)
    const description =
      post?.metaDescription ||
      extractTextSnippet(post?.excerpt || post?.content || post?.body) ||
      `${post?.title ?? "Publicación"} — guía y recomendaciones.`; // fallback corto y relevante

    const url = absUrl(`/blog/${encodeURIComponent(slug)}`);
    const published = post?.published ?? true;

    // Imagen OG/Twitter ABSOLUTA + VERSIONADA
    const coverRaw = post?.coverImage ? rewriteToCDN(post.coverImage) : undefined;
    const coverAbs = coverRaw ? absUrl(coverRaw) : undefined;
    const vTs = new Date(post?.updatedAt || post?.publishedAt || Date.now()).getTime();
    const coverVersioned = coverAbs ? `${coverAbs}${coverAbs.includes("?") ? "&" : "?"}v=${vTs}` : undefined;

    const keywords: string[] =
      post?.tags?.map((t: any) => t?.name).filter(Boolean).slice(0, 8) ?? [];

    return {
      title,
      description,
      keywords,
      alternates: { canonical: url },
      robots: published
        ? { index: true, follow: true, googleBot: "index,follow,max-image-preview:large" }
        : { index: false, follow: false, googleBot: "noindex,nofollow" },
      openGraph: {
        type: "article",
        siteName: SITE_NAME,
        url,
        title: titleBase,
        description,
        images: coverVersioned
          ? [{ url: coverVersioned, width: 1200, height: 630, alt: post?.title ?? "Cover" }]
          : [],
        locale: "es_ES",
      },
      twitter: {
        card: "summary_large_image",
        title: titleBase,
        description,
        images: coverVersioned ? [coverVersioned] : [],
      },
    };
  } catch {
    const url = absUrl(`/blog/${encodeURIComponent((await params).slug)}`);
    return {
      title: "Post no encontrado | MatchMyCourse",
      description: "Contenido no disponible.",
      alternates: { canonical: url },
      robots: { index: false, follow: false, googleBot: "noindex,nofollow" },
    };
  }
}

// Página
export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // 1) Fetch server-side para JSON-LD
  let post: any | null = null;
  try {
    post = await getPostBySlugServer(slug);
  } catch {
    post = null;
  }

  const url = absUrl(`/blog/${encodeURIComponent(slug)}`);
  const coverRaw = post?.coverImage ? rewriteToCDN(post.coverImage) : undefined;
  const coverAbs = coverRaw ? absUrl(coverRaw) : undefined;
  const categoryName =
    typeof post?.category === "string" ? post?.category : post?.category?.name;
  const keywords: string[] =
    post?.tags?.map((t: any) => t?.name).filter(Boolean).slice(0, 8) ?? [];

  // Descripción para JSON-LD (coincide con meta)
  const ldDescription =
    post?.metaDescription ||
    extractTextSnippet(post?.excerpt || post?.content || post?.body) ||
    "";

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post?.title || "Post",
        description: ldDescription,
        keywords,
        articleSection: categoryName,
        author: [{ "@type": "Person", name: post?.author || "MatchMyCourse" }],
        datePublished: post?.publishedAt || post?.createdAt,
        dateModified: post?.updatedAt || post?.createdAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: coverAbs ? [coverAbs] : undefined,
        publisher: {
          "@type": "Organization",
          name: "MatchMyCourse",
          logo: { "@type": "ImageObject", url: absUrl("/FlaviconMatchmycourse.png") },
        },
      }
    : null;

  // 2) Prefetch para el cliente con React Query
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider state={dehydratedState}>
      {jsonLd && (
        <script
          type="application/ld+json"
          // WHY: JSON-LD debe ir como texto plano (no SSR props)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Suspense fallback={<FullScreenLoader isLoading />}>
        <PostClient slug={slug} />
      </Suspense>
    </ReactQueryProvider>
  );
}
