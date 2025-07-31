"use client";

import { useSearchParams } from "next/navigation";
import { usePosts } from "@/app/hooks/blog/useGetPosts";
import PostCard from "@/app/components/blog/PostCard";
import Pagination from "@/app/components/blog/Pagination";

export default function CategoryClient({ slug }: { slug: string }) {
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const { data, isLoading, isError } = usePosts(page, 12, slug);

  if (isLoading) return <p className="text-center py-10">Cargando categoría...</p>;
  if (isError || !data?.posts) return <p className="text-center py-10">Error al cargar posts</p>;

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Categoría: {slug}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <Pagination page={data.page} pages={data.pages} />
    </section>
  );
}
