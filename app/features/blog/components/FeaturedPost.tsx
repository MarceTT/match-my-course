import Image from "next/image";
import { rewriteToCDN, getResponsiveImageProps } from "@/app/utils/rewriteToCDN";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
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
          <h1 className="text-2xl font-bold mb-8 text-center md:text-4xl lg:text-5xl">Blog MatchMyCourse</h1>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  {...getResponsiveImageProps(
                    rewriteToCDN(post.coverImage),
                    post.title,
                    {
                      fill: true,
                      quality: 85,
                      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100%",
                    }
                  )}
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default">{post.category?.name}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 md:text-5xl lg:text-5xl">{post.title}</h3>
                <p className="text-muted-foreground mb-6 md:text-lg lg:text-xl">{post.excerpt}</p>
                <Button className="w-full md:w-auto bg-[#5175FE] text-white hover:bg-[#5175FE]/80" asChild>
                  <Link href={`/blog/${post.slug}`} >Leer Más</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}