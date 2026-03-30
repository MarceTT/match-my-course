"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import { PostCard, Pagination } from "@/app/features/blog";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";

export default function CategoryClient({ slug }: { slug: string }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const page = Number(params.get("page")) || 1;
  const { data, isLoading, isError } = usePosts(page, 12, slug);

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError || !data?.posts) return <p className="text-center py-10">Error al cargar posts</p>;

  // Obtener el nombre de la categoría del primer post (ya viene poblado)
  const categoryName = data.posts[0]?.category?.name || slug.replace(/-/g, " ");

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Header de categoría */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
          Categoría
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
          {categoryName}
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          {data.total} {data.total === 1 ? "artículo" : "artículos"} en esta categoría
        </p>
      </div>

      {/* Grid de posts */}
      {data.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">No hay artículos en esta categoría.</p>
      )}

      {/* Paginación */}
      {data.pages > 1 && (
        <Pagination page={data.page} pages={data.pages} basePath={pathname} />
      )}
    </section>
  );
}
