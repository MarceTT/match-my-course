"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import { useParams, useRouter } from "next/navigation";
import TagForm from "@/app/admin/blog/tags/create/TagForm";

export default function EditTagPage() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["tag", params.id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blog/tag/${params.id}`);
      return data.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Editar Tag</h1>
      <TagForm tag={data} onSave={() => router.push("/admin/blog/tags")} />
    </div>
  );
}
