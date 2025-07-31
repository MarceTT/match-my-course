"use client";

import CategoryForm from "./CategoryForm";
import { useRouter } from "next/navigation";

export default function CreateCategoryPage() {
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Categoría</h1>
      <CategoryForm onSave={() => router.push("/admin/blog/categorias")} />
    </div>
  );
}
