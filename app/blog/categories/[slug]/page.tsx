import { dehydrate, QueryClient } from "@tanstack/react-query";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import ReactQueryProvider from "@/app/blog/providers";
import CategoryClient from "./CategoryClient";
import type { Metadata } from "next";
import { Suspense } from "react";


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = "MatchMyCourse - Blog";
  const baseDesc = `Artículos en la categoría ${slug}.`;
  const ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matchmycourse.com').replace(/\/$/, '');

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?category=${slug}&page=1&limit=1`, {
      cache: "no-store",
    });
    const data = await res.json();
    const featured = data.posts?.[0];
    return {
      title: `Categoría: ${slug} | ${site}`,
      description: featured?.metaDescription || featured?.excerpt || baseDesc,
      alternates: { canonical: `${ORIGIN}/blog/categories/${slug}` },
      robots: { index: true, follow: true },
      openGraph: {
        title: `Categoría: ${slug} | ${site}`,
        description: featured?.metaDescription || featured?.excerpt || baseDesc,
        url: `${ORIGIN}/blog/categories/${slug}`,
        images: featured?.coverImage ? [featured.coverImage] : [],
      },
    };
  } catch {
    return {
      title: `Categoría: ${slug} | ${site}`,
      description: baseDesc,
      alternates: { canonical: `${ORIGIN}/blog/categories/${slug}` },
      robots: { index: true, follow: true },
    };
  }
}

export default async function CategoryPage({ params }: Props) {
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
