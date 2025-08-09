import type { Metadata } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import BlogHomeClient from "@/app/blog/BlogHomeClient";
import { Suspense } from "react";
import FullScreenLoader from "../admin/components/FullScreenLoader";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { getPostBySlugServer } from "@/app/blog/_server/getPosts.server";
import ReactQueryProvider from "@/app/blog/providers";

// Ajusta tu dominio base (ponlo también como metadataBase en el root layout)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const SITE_NAME = "MatchMyCourse";

export const revalidate = 900; // opcional (ISR 15 min)

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { posts } = await getPostBySlugServer("test");
    const featured = posts?.[0];
    const baseDesc =
      "Últimos artículos sobre tecnología, desarrollo web y programación.";
    const url = `${BASE_URL}/blog`;

    const title = featured ? `${featured.title} | ${SITE_NAME}` : SITE_NAME;
    const description =
      featured?.metaDescription || featured?.excerpt || baseDesc;

    const cover = featured?.coverImage
      ? rewriteToCDN(featured.coverImage)
      : undefined;

    return {
      title,
      description,
      alternates: { canonical: url },
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
      robots: { index: true, follow: true, googleBot: "index,follow" },
    };
  } catch {
    const url = `${BASE_URL}/blog`;
    return {
      title: `Blog | ${SITE_NAME}`,
      description:
        "Últimos artículos sobre tecnología, desarrollo web y programación.",
      alternates: { canonical: url },
      robots: { index: true, follow: true },
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
  
    // Aquí pasas el state al provider
    return (
      <ReactQueryProvider state={dehydratedState}>
        <Suspense fallback={<FullScreenLoader isLoading />}>
          <BlogHomeClient />
        </Suspense>
      </ReactQueryProvider>
    );
  }
