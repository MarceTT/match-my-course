"use client";

import { useParams, useRouter } from "next/navigation";
import PostForm from "@/app/admin/blog/components/PostForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePostById } from "@/app/hooks/blog/useGetPostById";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();

  const postId = params?.id as string;

  const { data: postById, isLoading } = usePostById(postId);

  console.log("postById", postById);

  if (isLoading) {
    return <p className="text-center py-10">Cargando post...</p>;
  }

  if (!postById) {
    return <p className="text-center py-10 text-red-500">Post no encontrado</p>;
  }

  return (

      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Editar post</h1>
          <Link href="/admin/blog">
            <Button variant="secondary">Volver al listado</Button>
          </Link>
        </div>

        <PostForm post={postById} onSave={() => router.push("/admin/blog")} />
      </CardContent>

  );
}