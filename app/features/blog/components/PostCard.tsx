import Link from "next/link";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

type PostCardProps = {
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

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col">
      {post.coverImage && (
        <img
          src={rewriteToCDN(post.coverImage)}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        {post.category && (
          <Link
            href={`/blog/categories/${post.category.slug}`}
            className="text-xs uppercase text-blue-600 font-semibold mb-1"
          >
            {post.category.name}
          </Link>
        )}
        {post.publishedAt && (
          <span className="text-xs text-gray-600 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        {post.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        <Button variant="default" size="sm" asChild className="bg-[#5175FE] text-white hover:bg-[#5175FE]/80">
        <Link
          href={`/blog/${post.slug}`}
        >
          Leer artículo
        </Link>
        </Button>
      </div>
    </article>
  );
}