import { Metadata } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchPostBySlug } from "@/app/hooks/blog/useGetPostBySlug";
import ReactQueryProvider from "@/app/blog/providers";
import PostClient from "@/app/blog/[slug]/PostClient";
import { Suspense } from "react";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await fetchPostBySlug(slug);
    const site = "MatchMyCourse - Blog";

    return {
      title: post?.metaTitle || `${post?.title} | ${site}`,
      description: post?.metaDescription || post?.excerpt,
      openGraph: {
        title: post?.metaTitle || post?.title,
        description: post?.metaDescription || post?.excerpt,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
        type: "article",
        siteName: site,
        images: post?.coverImage ? [rewriteToCDN(post.coverImage)] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post?.metaTitle || post?.title,
        description: post?.metaDescription || post?.excerpt,
        images: post?.coverImage ? [rewriteToCDN(post.coverImage)] : [],
      },
    };
  } catch {
    return {
      title: "Post no encontrado | MatchMyCourse",
      description: "Contenido no disponible.",
    };
  }
}



export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider state={dehydratedState}>
      <Suspense fallback={<FullScreenLoader isLoading={true} />}>
        <PostClient slug={slug} />
      </Suspense>
    </ReactQueryProvider>
  );
}
