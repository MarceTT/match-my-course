import Link from "next/link";
import Image from "next/image";
import { rewriteToCDN, getResponsiveImageProps } from "@/app/utils/rewriteToCDN";
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
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Imagen con aspect ratio fijo */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        {post.coverImage ? (
          <Image
            {...getResponsiveImageProps(
              rewriteToCDN(post.coverImage),
              post.title,
              {
                fill: true,
                quality: 75,
                sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
              }
            )}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span className="text-blue-400 text-4xl">📝</span>
          </div>
        )}
      </div>

      {/* Contenido con alturas fijas */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta info: categoría + fecha */}
        <div className="flex items-center gap-2 mb-3">
          {post.category && (
            <Link
              href={`/blog/categories/${post.category.slug}`}
              className="text-xs uppercase text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              {post.category.name}
            </Link>
          )}
          {post.category && post.publishedAt && (
            <span className="text-gray-300">•</span>
          )}
          {post.publishedAt && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Título - altura fija con line-clamp */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt - altura fija con line-clamp */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4.5rem] flex-grow">
          {post.excerpt || "Descubre más en este artículo..."}
        </p>

        {/* Botón siempre al fondo */}
        <div className="mt-auto">
          <Button 
            variant="default" 
            size="sm" 
            asChild 
            className="w-full bg-[#5175FE] text-white hover:bg-[#3d5fd9] transition-colors"
          >
            <Link href={`/blog/${post.slug}`}>
              Leer artículo
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}