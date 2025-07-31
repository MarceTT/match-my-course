"use client";

import TagForm from "./TagForm";
import { useRouter } from "next/navigation";

export default function CreateTagPage() {
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Tag</h1>
      <TagForm onSave={() => router.push("/admin/blog/tags")} />
    </div>
  );
}
