"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/blog/category");
      return data.data; // Ajusta según tu API
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/blog/category/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  if (isLoading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button asChild>
          <Link href="/admin/blog/categorias/create">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Categoría
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="divide-y">
          {data?.map((cat: any) => (
            <div key={cat._id} className="flex justify-between items-center py-4">
              <div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link href={`/admin/blog/categorias/${cat._id}`}> 
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(cat._id)}
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
