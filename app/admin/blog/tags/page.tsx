"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function AdminTagsPage() {
  const queryClient = useQueryClient();

  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/blog/tag");
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/blog/tag/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });

  if (isLoading) return <p className="text-center py-10">Cargando tags...</p>;

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tags</h1>
        <Button asChild>
          <Link href="/admin/blog/tags/create">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Tag
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="divide-y">
          {tags?.map((tag: any) => (
            <div key={tag._id} className="flex justify-between items-center py-4">
              <div>
                <h3 className="font-semibold">{tag.name}</h3>
                <p className="text-sm text-gray-500">{tag.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link href={`/admin/blog/tags/${tag._id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(tag._id)}
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
