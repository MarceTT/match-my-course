import { dehydrate, QueryClient } from "@tanstack/react-query";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import ReactQueryProvider from "@/app/blog/providers";
import CategoryClient from "./CategoryClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = "MatchMyCourse - Blog";
  const baseDesc = `Artículos en la categoría ${slug}.`;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?category=${slug}&page=1&limit=1`, {
      cache: "no-store",
    });
    const data = await res.json();
    const featured = data.posts?.[0];
    return {
      title: `Categoría: ${slug} | ${site}`,
      description: featured?.metaDescription || featured?.excerpt || baseDesc,
      openGraph: {
        title: `Categoría: ${slug} | ${site}`,
        description: featured?.metaDescription || featured?.excerpt || baseDesc,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/categories/${slug}`,
        images: featured?.coverImage ? [featured.coverImage] : [],
      },
    };
  } catch {
    return {
      title: `Categoría: ${slug} | ${site}`,
      description: baseDesc,
    };
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", 1, 12, undefined, slug],
    queryFn: () => usePosts(1, 12, undefined, slug),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider state={dehydratedState}>
      <Suspense fallback={<div>Cargando...</div>}>
        <CategoryClient slug={slug} />
      </Suspense>
    </ReactQueryProvider>
  );
}
