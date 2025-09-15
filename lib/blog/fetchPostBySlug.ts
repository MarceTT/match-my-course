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

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const { data } = await axiosInstance.get(`/blog/post/${slug}`);
  return data.data;
}