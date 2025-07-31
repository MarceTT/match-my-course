"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Quote,
  Image as ImageIcon,
  Table as TableIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/app/utils/axiosInterceptor";

interface RichTextEditorProps {
  value?: string;
  onChange: (html: string, text: string) => void;
}

export default function RichTextEditor({ value = "", onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      onChange(html, text);
    },
  });

  const insertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      // Subir la imagen al backend para que vaya a S3
      const { data } = await axiosInstance.post("/uploads/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Insertar la imagen en el editor
      editor?.chain().focus().setImage({ src: data.url }).run();
    };
    input.click();
  };

  return (
    <div className="border rounded-md p-2 space-y-2">
      {/* Barra de herramientas */}
      <div className="flex gap-2 flex-wrap border-b pb-2">
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={insertImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Área editable */}
      <EditorContent editor={editor} className="prose max-w-none min-h-[300px]" />
    </div>
  );
}
