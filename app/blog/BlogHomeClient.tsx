"use client";

import { useSearchParams } from "next/navigation";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import { FeaturedPost, RecentPosts } from "@/app/features/blog";
import FullScreenLoader from "../admin/components/FullScreenLoader";

export default function BlogHomeClient() {
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const category = params.get("category") || undefined;
  const tag = params.get("tag") || undefined;
  const limit = 6;

  const { data, isLoading, isError } = usePosts(page, limit, category, tag);

  if (isLoading) return <FullScreenLoader isLoading />;
  if (isError || !data?.posts) return <p className="text-center py-10">Error al cargar el blog</p>;

  const [featured, ...recent] = data.posts;

  return (
    <div className="container mx-auto px-4">
      {featured && (
        <div className="mb-12">
          <FeaturedPost post={featured} />
        </div>
      )}
      {recent.length > 0 && (
        <div>
          <RecentPosts posts={recent} />
        </div>
      )}
    </div>
  );
}
