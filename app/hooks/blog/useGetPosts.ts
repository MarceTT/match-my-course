"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";

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
}

interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  pages: number;
}

export function usePosts(
  page = 1,
  limit = 10,
  category?: string,
  tag?: string,
  initialData?: PostsResponse
) {
  return useQuery<PostsResponse>({
    queryKey: ["posts", page, limit, category, tag],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blog/post`, {
        params: { page, limit, category, tag },
      });
      return data.data;
    },
    // Si tenemos initialData del SSR, usarlo
    initialData: initialData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}