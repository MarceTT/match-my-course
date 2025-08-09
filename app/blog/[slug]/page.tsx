import type { Metadata } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchPostBySlug } from "@/app/hooks/blog/useGetPostBySlug";
import { getPostBySlugServer } from "@/app/blog/_server/getPosts.server"; // <- FIX del import
import ReactQueryProvider from "@/app/blog/providers";
import PostClient from "@/app/blog/[slug]/PostClient";
import { Suspense } from "react";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

export const revalidate = 1800; // ISR: 30 min

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const SITE_NAME = "MatchMyCourse - Blog";

// Metadata para SEO
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlugServer(slug);

    const title = post?.metaTitle || `${post?.title} | ${SITE_NAME}`;
    const description = post?.metaDescription || post?.excerpt || "";
    const url = `${BASE_URL}/blog/${slug}`;
    const cover = post?.coverImage ? rewriteToCDN(post.coverImage) : undefined;
    const published = post?.published ?? true;

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
        title: post?.metaTitle || post?.title || "",
        description,
        images: cover
          ? [{ url: cover, width: 1200, height: 630, alt: post?.title ?? "Cover" }]
          : [],
        locale: "es_ES",
      },
      twitter: {
        card: "summary_large_image",
        title: post?.metaTitle || post?.title || "",
        description,
        images: cover ? [cover] : [],
      },
    };
  } catch {
    return {
      title: "Post no encontrado | MatchMyCourse",
      description: "Contenido no disponible.",
      alternates: { canonical: `${BASE_URL}/blog/${slug}` },
      robots: { index: false, follow: false, googleBot: "noindex,nofollow" },
    };
  }
}

// Página
export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // 1) Fetch server-side para JSON-LD (no bloquea el render si falla)
  let post: any | null = null;
  try {
    post = await getPostBySlugServer(slug);
  } catch {
    post = null;
  }

  const cover = post?.coverImage ? rewriteToCDN(post.coverImage) : undefined;
  const url = `${BASE_URL}/blog/${slug}`;
  const categoryName =
    typeof post?.category === "string" ? post?.category : post?.category?.name;
  const keywords: string[] =
    post?.tags?.map((t: any) => t?.name).filter(Boolean).slice(0, 8) ?? [];

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post?.title,
        description: post?.metaDescription || post?.excerpt || "",
        keywords,
        articleSection: categoryName,
        author: [{ "@type": "Person", name: post?.author || "MatchMyCourse" }],
        datePublished: post?.publishedAt || post?.createdAt,
        dateModified: post?.updatedAt || post?.createdAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: cover ? [cover] : undefined,
      }
    : null;

  // 2) Prefetch para el cliente usando fetchPostBySlug (React Query)
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Suspense fallback={<FullScreenLoader isLoading />}>
        <PostClient slug={slug} />
      </Suspense>
    </ReactQueryProvider>
  );
}
