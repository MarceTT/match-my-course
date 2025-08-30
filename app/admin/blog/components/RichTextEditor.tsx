"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Node, mergeAttributes } from '@tiptap/core';
import type { Range } from '@tiptap/core';

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  Quote,
  Image as ImageIcon,
  Table as TableIcon,
  Link as LinkIcon,
  Youtube as YoutubeIcon,
  Anchor,
  Hash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { ObjectId } from "bson";
import { useEffect, useMemo, useRef, useState } from "react";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { toast } from "sonner";

interface RichTextEditorProps {
  value?: string;
  onChange: (html: string, text: string, postId: string) => void;
  maxChars?: number;
}

// Extensión personalizada para anclas - Versión simplificada
const AnchorExtension = Node.create({
  name: 'anchor',
  
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-anchor]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', {
      ...HTMLAttributes,
      'data-anchor': '',
      'class': 'inline-flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded text-blue-800 text-xs font-medium cursor-pointer'
    }, '🔗 ' + (HTMLAttributes.id || 'anchor')]
  },

  addCommands() {
    return {
      insertAnchor: (options) => ({ commands }) => {
        return commands.insertContent(`<span data-anchor id="${options.id}">🔗 ${options.id}</span>`)
      },
    }
  },
});

// Declarar el tipo para el comando personalizado
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    anchor: {
      insertAnchor: (options: { id: string }) => ReturnType
    }
  }
}

const isValidUrl = (url: string) => {
  try {
    const u = new URL(url);
    return /^https?:/.test(u.protocol);
  } catch {
    return false;
  }
};

// Función para extraer ID del video de YouTube
const getYouTubeVideoId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function RichTextEditor({
  value = "",
  onChange,
  maxChars = 0,
}: RichTextEditorProps) {
  const [generatedPostId] = useState(() => new ObjectId().toString());
  const editorRef = useRef<ReturnType<typeof useEditor> | null>(null);
  
  // Estados para los diálogos
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [showAnchorDialog, setShowAnchorDialog] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [anchorId, setAnchorId] = useState('');

  // Debounce simple para onUpdate
  const debouncedOnChange = useMemo(() => {
    let t: any;
    return (html: string, text: string) => {
      clearTimeout(t);
      t = setTimeout(() => onChange(html, text, generatedPostId), 200);
    };
  }, [onChange, generatedPostId]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        validate: isValidUrl,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-600 underline",
        },
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: { class: "rounded-md" },
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        modestBranding: true,
        HTMLAttributes: {
          class: 'rounded-lg shadow-lg my-4',
        },
        inline: false,
        allowFullscreen: true,
      }),
      AnchorExtension,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({
        includeChildren: true,
        placeholder: "Escribe tu contenido… Usa / para comandos rápidos",
      }),
      CharacterCount.configure({
        limit: maxChars || undefined,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      debouncedOnChange(html, text);
    },
    onCreate: ({ editor }) => {
      if (value) editor.commands.setContent(value, false);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  editorRef.current = editor;

  const insertImage = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (!input.files?.length) return;
        const file = input.files[0];

        if (!/^image\/(png|jpe?g|webp|gif)$/i.test(file.type)) {
          toast.error("Formato de imagen no soportado");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error("La imagen excede 5MB");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("postId", generatedPostId);

        const { data } = await axiosInstance.post(
          "/blog/post/upload-editor-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const cdnUrl = rewriteToCDN(data.data.url);
        editor?.chain().focus().setImage({ src: cdnUrl, alt: file.name }).run();
      };
      input.click();
    } catch (e: any) {
      toast.error("Error subiendo la imagen");
    }
  };

  const insertLink = () => {
    const previous = editor?.getAttributes("link").href as string | undefined;
    const url = prompt("Ingresa la URL", previous || "https://");
    if (!url) return;
    if (!isValidUrl(url)) {
      toast.error("URL inválida. Debe empezar por http(s)://");
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  // Función para insertar video de YouTube
  const addYoutubeVideo = () => {
    if (!youtubeUrl.trim()) {
      toast.error("Por favor ingresa una URL de YouTube");
      return;
    }

    const videoId = getYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      toast.error("URL de YouTube inválida");
      return;
    }

    // Usar nocookie domain para evitar problemas de CORS
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    
    editor?.chain().focus().setYoutubeVideo({
      src: embedUrl,
    }).run();

    setYoutubeUrl('');
    setShowYoutubeDialog(false);
    toast.success("Video de YouTube agregado correctamente");
  };

  // Función para insertar ancla
  const addAnchor = () => {
    if (!anchorId.trim()) {
      toast.error("Por favor ingresa un ID para el ancla");
      return;
    }

    // Limpiar el ID (remover espacios, caracteres especiales, etc.)
    const cleanId = anchorId
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!cleanId) {
      toast.error("ID de ancla inválido");
      return;
    }

    editor?.chain().focus().insertAnchor({ id: cleanId }).run();
    
    setAnchorId('');
    setShowAnchorDialog(false);
    toast.success(`Ancla "${cleanId}" agregada correctamente`);
  };

  // acepta string o objeto (para textAlign)
  const isActive = (nameOrAttrs: any, attrs?: any) => editor?.isActive(nameOrAttrs, attrs);

  return (
    <div className="border rounded-md p-2 space-y-2">
      {/* Toolbar */}
      <div className="flex gap-1 flex-wrap border-b pb-2">
        <Button
          size="sm"
          variant={isActive("bold") ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          title="Negrita (Ctrl/Cmd+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant={isActive("italic") ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          title="Cursiva (Ctrl/Cmd+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant={isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant={isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant={isActive("heading", { level: 3 }) ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant={isActive("paragraph") ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().setParagraph().run()}
          title="Párrafo"
        >
          <span className="text-sm font-semibold">P</span>
        </Button>

        <Button
          size="sm"
          variant={isActive("bulletList") ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          title="Lista con viñetas"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant={isActive("blockquote") ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          title="Cita"
        >
          <Quote className="h-4 w-4" />
        </Button>

        {/* Separador */}
        <div className="w-px bg-gray-300 mx-1" />

        <Button size="sm" variant="ghost" onClick={insertLink} title="Insertar enlace">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={isActive("link") ? "secondary" : "ghost"}
          onClick={removeLink}
          title="Quitar enlace"
        >
          <span className="text-xs">Unlink</span>
        </Button>

        <Button size="sm" variant="ghost" onClick={insertImage} title="Insertar imagen">
          <ImageIcon className="h-4 w-4" />
        </Button>

        {/* NUEVOS BOTONES */}
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => setShowYoutubeDialog(true)} 
          title="Insertar video de YouTube"
        >
          <YoutubeIcon className="h-4 w-4" />
        </Button>

        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => setShowAnchorDialog(true)} 
          title="Insertar ancla"
        >
          <Anchor className="h-4 w-4" />
        </Button>

        {/* Separador */}
        <div className="w-px bg-gray-300 mx-1" />

        <Button
          size="sm"
          variant={isActive("table") ? "secondary" : "ghost"}
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          title="Insertar tabla"
        >
          <TableIcon className="h-4 w-4" />
        </Button>

        {/* Separador */}
        <div className="w-px bg-gray-300 mx-1" />

        <Button
          size="sm"
          variant={editor?.isActive({ textAlign: "left" }) ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          title="Alinear izquierda"
        >
          <span className="text-xs">↤</span>
        </Button>
        <Button
          size="sm"
          variant={editor?.isActive({ textAlign: "center" }) ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          title="Centrar"
        >
          <span className="text-xs">↔</span>
        </Button>
        <Button
          size="sm"
          variant={editor?.isActive({ textAlign: "right" }) ? "secondary" : "ghost"}
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          title="Alinear derecha"
        >
          <span className="text-xs">↦</span>
        </Button>
      </div>

      {/* Menús contextuales */}
      {editor && (
        <>
          <BubbleMenu editor={editor} tippyOptions={{ duration: 150 }}>
            <div className="rounded-md border bg-background p-1 flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={removeLink}>
                Unlink
              </Button>
            </div>
          </BubbleMenu>
        </>
      )}

      {editor && (
        <>
          <EditorContent
            editor={editor}
            className="prose prose-neutral max-w-none min-h-[300px] focus:outline-none"
          />

          {maxChars > 0 && (
            <div className="flex justify-end text-xs text-muted-foreground">
              {editor.storage.characterCount.characters()}/{maxChars} caracteres
            </div>
          )}
        </>
      )}

      {/* DIÁLOGO PARA YOUTUBE */}
      <Dialog open={showYoutubeDialog} onOpenChange={setShowYoutubeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar video de YouTube</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">URL del video</label>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Acepta URLs de YouTube y Youtu.be
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowYoutubeDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={addYoutubeVideo}>Agregar Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIÁLOGO PARA ANCLAS */}
      <Dialog open={showAnchorDialog} onOpenChange={setShowAnchorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar ancla</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">ID del ancla</label>
              <Input
                placeholder="mi-seccion"
                value={anchorId}
                onChange={(e) => setAnchorId(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {anchorId ? `Se creará el ancla: #${anchorId.toLowerCase().replace(/[^a-z0-9\-_]/g, '-')}` : 'Solo letras, números, guiones y guiones bajos'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnchorDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={addAnchor}>Agregar Ancla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}