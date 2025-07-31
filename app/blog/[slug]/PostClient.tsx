"use client";

import { usePostBySlug } from "@/app/hooks/blog/useGetPostBySlug";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Share2, User } from "lucide-react";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useMemo } from "react";
import parse from "html-react-parser";
import { toast } from "sonner";
import DOMPurify from "dompurify";

export default function PostClient({ slug }: { slug: string }) {
  const { data: post, isLoading, isError } = usePostBySlug(slug);

  const readTime = useMemo(() => {
    if (!post?.content) return "0 min";
    const text = post.content.replace(/<[^>]+>/g, ""); // remove HTML tags
    const wordCount = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
  }, [post?.content]);

  const author = post?.author?.name || "MatchMyCourse";

  const cleanHtml = post?.content ? DOMPurify.sanitize(post.content) : "";

  if (isLoading) return <p className="text-center py-10">Cargando post...</p>;
  if (isError || !post) return <p className="text-center py-10">Post no encontrado</p>;

  const handleShare = () => {
    navigator.clipboard.writeText(`https://www.matchmycourse.com/blog/${post.slug}`);
    toast.success("Enlace copiado al portapapeles");
  };

  return (
    <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Post Header */}
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default">{post.category?.name}</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.publishedAt && new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </div>
              </div>
              <img
                src={rewriteToCDN(post.coverImage)}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

              <div>{parse(cleanHtml)}</div>
            </div>

            {/* Post Footer */}
            <footer className="mt-16 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags?.map((tag: any) => (
                    <Badge key={tag._id} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" onClick={handleShare}><Share2 className="w-4 h-4 mr-2" />Compartir Artículo</Button>
              </div>
            </footer>
          </div>
        </div>
      </article>
  );
}
