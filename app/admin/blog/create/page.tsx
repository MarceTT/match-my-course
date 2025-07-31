"use client";

import { useRouter } from "next/navigation";
import PostForm from "../components/PostForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreatePostPage() {
  const router = useRouter();

  return (

      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Crear nuevo post</h1>
          <Link href="/admin/blog">
            <Button variant="secondary">Volver al listado</Button>
          </Link>
        </div>

        <PostForm onSave={() => router.push("/admin/blog")} />
      </CardContent>

  );
}