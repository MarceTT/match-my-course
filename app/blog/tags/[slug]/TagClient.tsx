"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import { PostCard, Pagination } from "@/app/features/blog";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { Tag } from "lucide-react";

export default function TagClient({ slug }: { slug: string }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const page = Number(params.get("page")) || 1;
  const { data, isLoading, isError } = usePosts(page, 12, undefined, slug);

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError || !data?.posts) return <p className="text-center py-10">Error al cargar posts</p>;

  // Obtener el nombre del tag del primer post (ya viene poblado)
  const tagName = data.posts[0]?.tags?.find(t => t.slug === slug)?.name || slug.replace(/-/g, " ");

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Header de etiqueta */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
          <Tag className="w-3.5 h-3.5" />
          Etiqueta
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
          {tagName}
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          {data.total} {data.total === 1 ? "artículo" : "artículos"} con esta etiqueta
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
        <p className="text-center text-gray-500 py-12">No hay artículos con esta etiqueta.</p>
      )}

      {/* Paginación */}
      {data.pages > 1 && (
        <Pagination page={data.page} pages={data.pages} basePath={pathname} />
      )}
    </section>
  );
}
