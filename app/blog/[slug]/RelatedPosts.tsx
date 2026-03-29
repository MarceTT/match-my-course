"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import Image from "next/image";
import Link from "next/link";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  category?: { name: string; slug: string };
}

interface RelatedPostsProps {
  currentSlug: string;
  categorySlug?: string;
}

export default function RelatedPosts({ currentSlug, categorySlug }: RelatedPostsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["relatedPosts", categorySlug],
    queryFn: async () => {
      const params: Record<string, any> = { limit: 4 };
      if (categorySlug) {
        params.category = categorySlug;
      }
      const { data } = await axiosInstance.get(`/blog/post`, { params });
      return data.data?.posts || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: true,
  });

  // Filter out current post and limit to 3
  const relatedPosts = (data as RelatedPost[] | undefined)
    ?.filter((post) => post.slug !== currentSlug)
    ?.slice(0, 3);

  if (isLoading) {
    return (
      <section className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 w-full">
                {post.coverImage ? (
                  <Image
                    src={rewriteToCDN(post.coverImage)}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                {post.category && (
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                    {post.category.name}
                  </span>
                )}
                <h3 className="mt-1 font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
