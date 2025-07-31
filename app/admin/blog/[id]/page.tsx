"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInterceptor";
import PostForm from "@/app/admin/blog/components/PostForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axiosInstance.get(`/admin/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.error("Error al cargar el post", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Cargando post...</p>;
  }

  if (!post) {
    return <p className="text-center py-10 text-red-500">Post no encontrado</p>;
  }

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Editar post</h1>
          <Link href="/admin/blog">
            <Button variant="secondary">Volver al listado</Button>
          </Link>
        </div>

        <PostForm post={post} onSave={() => router.push("/admin/blog")} />
      </CardContent>
    </Card>
  );
}