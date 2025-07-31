import { dehydrate, QueryClient } from "@tanstack/react-query";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import ReactQueryProvider from "@/app/blog/providers";
import TagClient from "./TagClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const site = "MatchMyCourse - Blog";
  const baseDesc = `Artículos con la etiqueta ${slug}.`;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?tag=${slug}&page=1&limit=1`, {
      cache: "no-store",
    });
    const data = await res.json();
    const featured = data.posts?.[0];
    return {
      title: `Etiqueta: ${slug} | ${site}`,
      description: featured?.metaDescription || featured?.excerpt || baseDesc,
      openGraph: {
        title: `Etiqueta: ${slug} | ${site}`,
        description: featured?.metaDescription || featured?.excerpt || baseDesc,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/tags/${slug}`,
        images: featured?.coverImage ? [featured.coverImage] : [],
      },
    };
  } catch {
    return {
      title: `Etiqueta: ${slug} | ${site}`,
      description: baseDesc,
    };
  }
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", 1, 12, undefined, params.slug],
    queryFn: () => usePosts(1, 12, undefined, params.slug),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider state={dehydratedState}>
      <TagClient slug={params.slug} />
    </ReactQueryProvider>
  );
}
