"use client";

import { useCategories } from "@/app/hooks/blog/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter() {
  const { data: categories, isLoading } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`/blog?${params.toString()}`);
  };

  if (isLoading) return <p>Cargando categorías...</p>;

  return (
    <Select
      value={selected}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Todas las categorías" />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((cat) => (
          <SelectItem key={cat._id} value={cat.slug}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}