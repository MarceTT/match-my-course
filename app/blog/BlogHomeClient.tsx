"use client";

import { useSearchParams } from "next/navigation";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import FeaturedPost from "@/app/components/blog/FeaturedPost";
import RecentPosts from "@/app/components/blog/RecentPosts";
import CategoryFilter from "@/app/components/blog/CategoryFilter";
import TagFilter from "@/app/components/blog/TagFilter";
import Pagination from "@/app/components/blog/Pagination";

export default function BlogHomeClient() {
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const category = params.get("category") || undefined;
  const tag = params.get("tag") || undefined;

  const { data, isLoading, isError } = usePosts(page, 6, category, tag);

  if (isLoading)
    return <p className="text-center py-10">Cargando artículos...</p>;
  if (isError || !data?.posts)
    return <p className="text-center py-10">Error al cargar el blog</p>;

  const [featured, ...recent] = data.posts;

  return (
    <section className="container mx-auto p-6">
      {/* Filtros */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <CategoryFilter />
          <TagFilter />
        </div>
      </div>

      {/* Post destacado */}
      {featured && (
        <div className="mb-12">
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* Posts recientes */}
      {recent.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Artículos Recientes
          </h2>
          <RecentPosts posts={recent} />
        </div>
      )}

      {/* Paginación */}
      <Pagination page={data.page} pages={data.pages} />
    </section>
  );
}
