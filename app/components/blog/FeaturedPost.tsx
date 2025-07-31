import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FeaturedPostProps = {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    category?: { name: string; slug: string };
    publishedAt?: string;
  };
};

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Artículo Destacado</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={rewriteToCDN(post.coverImage)}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default">{post.category?.name}</Badge>
                  <span className="text-sm text-muted-foreground">{post.publishedAt && new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                <Button asChild>
                  <Link href={`/blog/${post.slug}`}>Leer Más</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}