"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { useParams, useRouter } from "next/navigation";
import CategoryForm from "@/app/admin/blog/categorias/create/CategoryForm";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["category", params.id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blog/category/${params.id}`);
      return data.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Editar Categoría</h1>
      <CategoryForm category={data} onSave={() => router.push("/admin/blog/categorias")} />
    </div>
  );
}
