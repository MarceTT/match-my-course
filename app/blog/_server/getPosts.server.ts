type GetPostsResp = {
    data: {
      posts: any[];
      total?: number;
      page?: number;
      limit?: number;
    };
  };
  
  type GetPostsOpts = {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
  };
  
  export async function getPostBySlugServer(slug: string) {
    const API_BASE =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
  
    const res = await fetch(`${API_BASE}/blog/post/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 1800 },
    });
  
    if (!res.ok) throw new Error(`SEO fetch failed: ${res.status}`);
    const json = await res.json();
    return json.data; // ajusta si tu API devuelve otra estructura
  }