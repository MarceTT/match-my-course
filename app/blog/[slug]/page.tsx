import { dehydrate, QueryClient } from "@tanstack/react-query";
import { usePostBySlug } from "@/app/hooks/blog/useGetPostBySlug";
import ReactQueryProvider from "@/app/blog/providers";
import PostClient from "@/app/blog/[slug]/PostClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/post/${params.slug}`, {
      cache: "no-store",
    });
    const post = await res.json();
    const site = "MatchMyCourse - Blog";

    return {
      title: post.metaTitle || `${post.title} | ${site}`,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch {
    return {
      title: "Post no encontrado | MatchMyCourse",
      description: "Contenido no disponible.",
    };
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", params.slug],
    queryFn: () => usePostBySlug(params.slug),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider state={dehydratedState}>
      <PostClient slug={params.slug} />
    </ReactQueryProvider>
  );
}
