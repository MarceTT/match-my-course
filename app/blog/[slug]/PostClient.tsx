"use client";

import { usePostBySlug } from "@/app/hooks/blog/useGetPostBySlug";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useMemo } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { ShareButtons } from "@/app/components/common/social";

type Tag = { _id: string; name: string; slug: string };

export default function PostClient({ slug }: { slug: string }) {
  const { data: post, isLoading, isError } = usePostBySlug(slug);
  const router = useRouter();

  const readTime = useMemo(() => {
    if (!post?.content) return "0 min";
    const text = post.content.replace(/<[^>]+>/g, "");
    const wordCount = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
  }, [post?.content]);

  const author = (post as any)?.author?.name || post?.author || "MatchMyCourse";
  const cleanHtml = post?.content ? DOMPurify.sanitize(post.content) : "";

  if (isLoading) return <FullScreenLoader isLoading />;
  if (isError || !post)
    return <p className="text-center py-10">Post no encontrado</p>;

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "https://www.matchmycourse.com";

  const baseShareUrl = `${origin.replace(/\/$/, "")}/blog/${post.slug}`;

  // versión = updatedAt | publishedAt | ahora (ms)
  const versionTs = new Date(
    (post as any).updatedAt || post.publishedAt || Date.now()
  ).getTime();

  // cache-buster SOLO para LinkedIn
  const liShareUrl = `${baseShareUrl}${
    baseShareUrl.includes("?") ? "&" : "?"
  }v=${versionTs}`;

  const hashtags =
    post.tags
      ?.map((t: any) => (t?.name || t)?.toString().trim())
      .filter(Boolean)
      .map((s: string) => s.toLowerCase().replace(/\s+/g, ""))
      .slice(0, 3) ?? [];

  const summary = post.metaDescription || post.excerpt || undefined;

  return (
    <article className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Botón Volver */}
          <div className="mb-6">
            <Button
              onClick={() => router.back()}
              className="w-full md:w-fit px-5 py-3 md:py-2 rounded-full text-base md:text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5 md:w-4 md:h-4" />
              Volver a artículos
            </Button>
          </div>

          {/* Header */}
          <header className="mb-12">
            {/* Título */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left">
              {post.title}
            </h1>

            {/* Metadatos */}
            <div className="flex flex-col items-center text-center gap-4 text-muted-foreground mb-8 md:flex-row md:items-center md:gap-6 md:text-left">
              {post.category?.name && (
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-lg shadow-sm">
                  {post.category.name}
                </span>
              )}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>

            {/* Imagen de portada */}
            {post.coverImage && (
              <img
                src={rewriteToCDN(post.coverImage)}
                alt={post.title}
                className="w-full h-52 sm:h-64 object-cover rounded-lg"
                loading="eager"
              />
            )}
          </header>

          {/* Contenido */}
          <div className="prose prose-lg max-w-none [&_p]:text-justify sm:[&_p]:text-left">
            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-8">
                {post.excerpt}
              </p>
            )}
            <div>{parse(cleanHtml)}</div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 text-center">
                {(post.tags as Tag[] | undefined)?.map((tag) => (
                  <Badge key={tag._id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>

              {/* Share buttons */}
              <div className="flex flex-wrap justify-center gap-2">
                <ShareButtons
                  url={baseShareUrl}
                  urlLinkedin={liShareUrl}
                  title={post.title}
                  summary={summary}
                  hashtags={hashtags}
                  via="matchmycourse"
                  source="MatchMyCourse"
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
