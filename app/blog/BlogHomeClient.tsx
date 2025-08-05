"use client";

import { useSearchParams } from "next/navigation";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import FeaturedPost from "@/app/components/blog/FeaturedPost";
import RecentPosts from "@/app/components/blog/RecentPosts";
import FullScreenLoader from "../admin/components/FullScreenLoader";

export default function BlogHomeClient() {
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const category = params.get("category") || undefined;
  const tag = params.get("tag") || undefined;

  const { data, isLoading, isError } = usePosts();

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError || !data?.posts)
    return <p className="text-center py-10">Error al cargar el blog</p>;

  const [featured, ...recent] = data.posts;

  return (
    <div className="container mx-auto px-4">


      {/* Post destacado */}
      {featured && (
        <div className="mb-12">
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* Posts recientes */}
      {recent.length > 0 && (
        <div>
          <RecentPosts posts={recent} />
        </div>
      )}
    </div>
  );
}
