"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-4">
        <div className="flex gap-2">
          <Button
            variant={!preview ? "default" : "secondary"}
            size="sm"
            onClick={() => setPreview(false)}
          >
            Editar
          </Button>
          <Button
            variant={preview ? "default" : "secondary"}
            size="sm"
            onClick={() => setPreview(true)}
          >
            Vista previa
          </Button>
        </div>

        {!preview ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-64 p-4 border rounded-md text-sm"
            placeholder="Escribe el contenido en Markdown..."
          />
        ) : (
          <div className="prose max-w-none border rounded-md p-4 bg-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {value || "*No hay contenido*"}
            </ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
