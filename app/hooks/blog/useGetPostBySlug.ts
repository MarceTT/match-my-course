"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";

export interface Post {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    content?: string;
    category?: { name: string; slug: string };
    tags?: { name: string; slug: string }[];
    publishedAt?: string;
    metaTitle?: string;
    metaDescription?: string;
    author?: { name: string; slug: string };
    
  }

export function usePostBySlug(slug?: string) {
  return useQuery<Post>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blog/post/${slug}`);
      return data.data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
