"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PostStatsProps {
  content: string; // Contenido del post (HTML o texto plano)
}

export default function PostStats({ content }: PostStatsProps) {
  const stats = useMemo(() => {
    const plainText = content.replace(/<[^>]*>?/gm, ""); // Quita etiquetas HTML
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    const chars = plainText.length;
    const readingTime = Math.max(1, Math.ceil(words / 200)); // 200 palabras por minuto
    return { words, chars, readingTime };
  }, [content]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-6">
        <p>Palabras: {stats.words}</p>
        <p>Caracteres: {stats.chars}</p>
        <p>Tiempo estimado de lectura: {stats.readingTime} min</p>
      </CardContent>
    </Card>
  );
}
