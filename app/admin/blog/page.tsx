"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

async function fetchAdminPosts() {
  const { data } = await axiosInstance.get("/blog/post");
  return data.data.posts;
}



export default function AdminPostsPage() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchAdminPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/blog/post/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  if (isLoading) return <p className="text-center py-10">Cargando posts...</p>;

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/create">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="divide-y">
          {posts?.map((post: any) => (
            <div key={post._id} className="flex justify-between items-center py-4">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link href={`/admin/blog/edit/${post._id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(post._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
