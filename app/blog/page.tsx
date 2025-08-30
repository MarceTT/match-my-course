import type { Metadata } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import BlogHomeClient from "@/app/blog/BlogHomeClient";
import { Suspense } from "react";
import FullScreenLoader from "../admin/components/FullScreenLoader";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { getPostBySlugServer } from "@/app/blog/_server/getPosts.server";
import ReactQueryProvider from "@/app/blog/providers";

// ORIGIN absoluto (sin barra final)
const ORIGIN =
  (process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000").replace(/\/$/, "");

const SITE_NAME = "MatchMyCourse";
export const revalidate = 900;

// WHY: absolutiza paths e imágenes
const absUrl = (u: string) => (u.startsWith("http") ? u : `${ORIGIN}${u}`);

// WHY: snippet limpio de MD/HTML para meta description
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
  if (s.length <= max) return s;
  s = s.slice(0, max + 1);
  const cut = Math.max(s.lastIndexOf(". "), s.lastIndexOf(" "));
  return (cut > 80 ? s.slice(0, cut) : s.slice(0, max)).trim() + "…";
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { posts } = await getPostBySlugServer("test");
    const featured = posts?.[0];
    const url = absUrl("/blog");

    const title = featured ? `${featured.title} | ${SITE_NAME}` : `Blog | ${SITE_NAME}`;

    const description =
      featured?.metaDescription ||
      featured?.seo?.description ||
      extractTextSnippet(featured?.excerpt || featured?.content || featured?.body) ||
      "Artículos sobre cursos de inglés, escuelas, visados, costos y consejos para estudiar en el extranjero.";

    const cover = featured?.coverImage
      ? absUrl(rewriteToCDN(featured.coverImage))
      : undefined;

    return {
      title,
      description,
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        type: "website",
        siteName: SITE_NAME,
        url,
        title: featured?.metaTitle || featured?.title || SITE_NAME,
        description,
        images: cover
          ? [{ url: cover, width: 1200, height: 630, alt: featured?.title ?? "Cover" }]
          : [],
        locale: "es_ES",
      },
      twitter: {
        card: "summary_large_image",
        title: featured?.metaTitle || featured?.title || SITE_NAME,
        description,
        images: cover ? [cover] : [],
      },
    };
  } catch {
    const url = absUrl("/blog");
    return {
      title: `Blog | ${SITE_NAME}`,
      description:
        "Artículos sobre cursos de inglés, escuelas, visados, costos y consejos para estudiar en el extranjero.",
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        type: "website",
        siteName: SITE_NAME,
        url,
        title: `Blog | ${SITE_NAME}`,
        description:
          "Artículos sobre cursos de inglés, escuelas, visados, costos y consejos para estudiar en el extranjero.",
      },
      twitter: {
        card: "summary_large_image",
        title: `Blog | ${SITE_NAME}`,
        description:
          "Artículos sobre cursos de inglés, escuelas, visados, costos y consejos para estudiar en el extranjero.",
      },
    };
  }
}

export default async function BlogHomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", "test"],
    queryFn: () => getPostBySlugServer("test"),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider state={dehydratedState}>
      <Suspense fallback={<FullScreenLoader isLoading />}>
        <BlogHomeClient />
      </Suspense>
    </ReactQueryProvider>
  );
}
