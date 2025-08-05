"use client";

import { usePostBySlug } from "@/app/hooks/blog/useGetPostBySlug";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Linkedin, User } from "lucide-react";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useMemo } from "react";
import parse from "html-react-parser";
import { toast } from "sonner";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  WhatsappIcon,
} from "react-share";
import { FacebookIcon, LinkedinIcon, TwitterIcon, Send } from "lucide-react";
import ShareButtons from "./ShareButtons";

export default function PostClient({ slug }: { slug: string }) {
  const { data: post, isLoading, isError } = usePostBySlug(slug);
  const router = useRouter();

  const readTime = useMemo(() => {
    if (!post?.content) return "0 min";
    const text = post.content.replace(/<[^>]+>/g, "");
    const wordCount = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
  }, [post?.content]);

  const author = post?.author?.name || "MatchMyCourse";

  const cleanHtml = post?.content ? DOMPurify.sanitize(post.content) : "";

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError || !post)
    return <p className="text-center py-10">Post no encontrado</p>;

  const shareUrl = `https://www.matchmycourse.com/blog/${post.slug}`;

  return (
    <article className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Botón Volver */}
          <div className="mb-6">
            <Button
              onClick={() => router.back()}
              className="px-5 py-2 rounded-full text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium shadow-sm transition-all flex items-center gap-2 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a artículos
            </Button>
          </div>

          {/* Post Header */}
          <header className="mb-12">
           
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-lg shadow-sm">
              {post.category?.name}
            </span> 
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex gap-2 flex-wrap">
                {post.tags?.map((tag: any) =>
                  typeof tag === "object" && tag.name ? (
                    <Badge key={tag._id || tag} variant="outline">
                      {tag.name}
                    </Badge>
                  ) : null
                )}
              </div>
              <div className="flex gap-2 items-center">
                <ShareButtons url={shareUrl} title={post.title} />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
