"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load del editor completo solo cuando se necesite
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  loading: () => (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {/* Skeleton de toolbar */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded" />
        ))}
      </div>
      {/* Skeleton del editor */}
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  ),
  ssr: false, // Nunca renderizar en servidor
});

interface LazyRichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  maxCharacters?: number;
}

export default function LazyRichTextEditor(props: LazyRichTextEditorProps) {
  return <RichTextEditor {...props} />;
}