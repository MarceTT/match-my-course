"use client";

import { useTags } from "@/app/hooks/blog/useTags";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function TagFilter() {
  const { data: tags, isLoading } = useTags();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("tag") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("tag", value);
    } else {
      params.delete("tag");
    }
    router.push(`/blog?${params.toString()}`);
  };

  if (isLoading) return <p>Cargando etiquetas...</p>;

  return (
    <Select
      value={selected}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Todas las etiquetas" />
      </SelectTrigger>
      <SelectContent>
      {tags?.map((tag) => (
        <SelectItem key={tag._id} value={tag.slug}>
          {tag.name}
        </SelectItem>
      ))}
    </SelectContent>
    </Select>
  );
}