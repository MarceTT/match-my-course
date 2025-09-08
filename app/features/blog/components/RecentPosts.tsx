import { Button } from "@/components/ui/button";
import PostCard from "./PostCard";
import Link from "next/link";

type RecentPostsProps = {
  posts: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    category?: { name: string; slug: string };
    publishedAt?: string;
  }[];
};

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center md:text-4xl lg:text-5xl">Artículos Recientes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog/all">Ver Todos los Artículos</Link>
            </Button>
          </div>
        </div>
      </section>
  );
}