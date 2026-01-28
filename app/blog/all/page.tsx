import { Suspense } from "react";
import type { Metadata } from "next";
import AllPost from "./AllPost";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";

// ISR: Revalidar cada 15 minutos (900 segundos)
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Blog - Todos los Artículos | MatchMyCourse",
  description: "Explora todos nuestros artículos sobre estudiar inglés en el extranjero, experiencias de estudiantes, guías de viaje y más.",
  robots: { index: true, follow: true },
};

interface PostsResponse {
  posts: any[];
  total: number;
  page: number;
  pages: number;
}

// Función server-side para fetch inicial de posts
async function fetchInitialPosts(): Promise<PostsResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/post?page=1&limit=100`;

    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });

    if (!res.ok) {
      console.error('Error fetching posts:', res.status);
      return { posts: [], total: 0, page: 1, pages: 1 };
    }

    const data = await res.json();

    return data?.data || { posts: [], total: 0, page: 1, pages: 1 };
  } catch (error) {
    console.error('Error in fetchInitialPosts:', error);
    return { posts: [], total: 0, page: 1, pages: 1 };
  }
}

export default async function BlogAllPage() {
  // Fetch server-side para SSR
  const initialData = await fetchInitialPosts();

  return (
    <Suspense fallback={<FullScreenLoader isLoading={true} />}>
      <AllPost initialData={initialData} />
    </Suspense>
  );
}
