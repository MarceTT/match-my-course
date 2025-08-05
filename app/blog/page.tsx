import { dehydrate, QueryClient } from "@tanstack/react-query";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import ReactQueryProvider from "@/app/blog/providers";
import BlogHomeClient from "@/app/blog/BlogHomeClient";
import type { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "../admin/components/FullScreenLoader";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/post?page=1&limit=1`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    const featured = data.data.posts?.[0];
    const site = "Mi Proyecto - Blog";
    const baseDesc =
      "Últimos artículos sobre tecnología, desarrollo web y programación.";

    return {
      title: featured ? `${featured.title} | ${site}` : site,
      description: featured?.metaDescription || featured?.excerpt || baseDesc,
      openGraph: {
        title: featured?.metaTitle || featured?.title || site,
        description: featured?.metaDescription || featured?.excerpt || baseDesc,
        url: `${rewriteToCDN(featured?.coverImage)}/blog`,
        images: featured?.coverImage ? [featured.coverImage] : [],
      },
    };
  } catch {
    return {
      title: "Blog | Mi Proyecto",
      description:
        "Últimos artículos sobre tecnología, desarrollo web y programación.",
    };
  }
}

export default async function BlogHomePage() {
  // Prefetch de posts para hidratar el cliente
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", 1, 6, undefined, undefined],
    queryFn: () => usePosts(1, 6),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider state={dehydratedState}>
      <Suspense fallback={<FullScreenLoader isLoading={true} />}>
        <BlogHomeClient />
      </Suspense>
    </ReactQueryProvider>
  );
}
