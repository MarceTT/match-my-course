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
  author?: { name: string; slug: string };
}

export async function fetchPostById(id: string): Promise<Post | null> {
//   console.log("🔍 URL que se llama:", `/blog/post/${id}`);
  const { data } = await axiosInstance.get(`/blog/post/${id}`);
  return data.data;
}

export function usePostById(id?: string) {
  return useQuery<Post | null>({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
