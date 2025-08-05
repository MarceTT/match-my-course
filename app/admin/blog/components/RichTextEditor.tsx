"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Quote,
  Image as ImageIcon,
  Table as TableIcon,
  Link as LinkIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { ObjectId } from "bson";
import { useEffect, useRef, useState } from "react";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

interface RichTextEditorProps {
  value?: string;
  onChange: (html: string, text: string, postId: string) => void;
}

export default function RichTextEditor({ value = "", onChange }: RichTextEditorProps) {
  const [generatedPostId] = useState(() => new ObjectId().toString());
  const editorRef = useRef<any>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-600 underline",
        },
      }),
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
      onChange(html, text, generatedPostId);
    },
  });

  editorRef.current = editor;

  const insertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("postId", generatedPostId);
      const { data } = await axiosInstance.post("/blog/post/upload-editor-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const cdnUrl = rewriteToCDN(data.data.url);
      editor?.chain().focus().setImage({ src: cdnUrl }).run();
    };
    input.click();
  };

  const insertLink = () => {
    const url = prompt("Ingresa la URL");
    if (!url) return;
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border rounded-md p-2 space-y-2">
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
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().setParagraph().run()}>
          <span className="text-sm font-semibold">P</span>
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={insertLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={insertImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <TableIcon className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().setTextAlign("left").run()}>
          <span className="text-xs">↤</span>
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().setTextAlign("center").run()}>
          <span className="text-xs">↔</span>
        </Button>
        <Button size="sm" variant="ghost" onClick={() => editor?.chain().focus().setTextAlign("right").run()}>
          <span className="text-xs">↦</span>
        </Button>
      </div>

      {editor && <EditorContent editor={editor} className="prose prose-neutral max-w-none min-h-[300px]" />}
    </div>
  );
}
