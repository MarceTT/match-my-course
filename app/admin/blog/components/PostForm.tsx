"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormValues } from "@/app/admin/blog/create/postSchema";
import { slugify } from "@/app/utils/slugify";
import { useTags } from "@/app/hooks/blog/useTags";
import { useCategories } from "@/app/hooks/blog/useCategories";
import { useState, useEffect } from "react";
import {
  Upload,
  X,
  Eye,
  List,
  Heading1,
  Heading2,
  Quote,
  Link,
  Loader2,
} from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import RichTextEditor from "./RichTextEditor";
import PostStats from "./PostStats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitPost } from "@/app/hooks/blog/useSubmitPost";
import TagsInput from "./TagsInput";
import { toast } from "sonner";
import TagSelector from "./TagsInput";

interface PostFormProps {
  post?: any;
  onSave?: () => void;
}

export default function PostForm({ post, onSave }: PostFormProps) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);
  const [category, setCategory] = useState<string>(post?.category || "");

  const { data: categoriesData, isLoading: loadingCategories } =
    useCategories();
  const { data: tagsData, isLoading: loadingTags } = useTags();

  const { mutate: submitPost, isPending } = useSubmitPost();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      category: post?.category || "",
      tags: post?.tags?.join(", ") || "",
      metaTitle: post?.metaTitle || "",
      metaDescription: post?.metaDescription || "",
      coverImage: null,
    },
  });

  const title = form.watch("title");
  const excerpt = form.watch("excerpt");

  // Generar slug automáticamente a partir del título si es nuevo
  useEffect(() => {
    if (!post) {
      form.setValue("slug", slugify(title));
    }
  }, [title, post, form]);

  const content = form.watch("content");

  // Generar excerpt automático si no hay uno manual
  useEffect(() => {
    if (!excerpt && content) {
      const plain = content.replace(/<[^>]+>/g, "");
      const autoExcerpt =
        plain.slice(0, 150).trim() + (plain.length > 150 ? "..." : "");
      form.setValue("excerpt", autoExcerpt);
    }
  }, [content, excerpt, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.match("image.*")) {
        toast.error("Por favor, sube solo imágenes");
        return;
      }
      // Validar tamaño (ejemplo: máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen no puede ser mayor a 5MB");
        return;
      }
      setCoverImage(file);
    }
  };

  const onSubmit = (values: PostFormValues, publish = true) => {
    if (!coverImage && !post?.coverImage) {
      toast.error("Debes subir una imagen de portada");
      return;
    }
    submitPost({
      postId: post?._id,
      values: {
        ...values,
        tags: "", // no duplicamos, enviamos los seleccionados
      },
      coverImage,
      selectedTags,
      publish,
      onSuccessCallback: onSave,
    });
  };

  const safeCategories = categoriesData ?? [];
  const safeTags = tagsData ?? [];

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Columna izquierda */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-6 mt-6">
              {/* Título */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Post</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Escribe un título atractivo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (generado automáticamente)</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Extracto */}
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extracto</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Breve descripción del artículo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contenido (Tiptap) */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenido</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={(html, text) => {
                          field.onChange(html);
                          if (!form.getValues("excerpt")) {
                            const autoExcerpt =
                              text.slice(0, 150).trim() +
                              (text.length > 150 ? "..." : "");
                            form.setValue("excerpt", autoExcerpt);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Estadísticas */}
              <PostStats content={content} />
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Botón de Publicar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Configuración</CardTitle>
              <CardDescription>Publica o guarda como borrador</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() =>
                  form.handleSubmit((values) => onSubmit(values, true))()
                }
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Eye className="mr-2 h-4 w-4" />
                )}
                Publicar
              </Button>
            </CardContent>
          </Card>

          {/* Categoría */}
          <Card>
            <CardHeader>
              <CardTitle>Categoría</CardTitle>
              <CardDescription>Selecciona una categoría</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingCategories ? (
                <p className="text-sm text-gray-500">Cargando categorías...</p>
              ) : (
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value);
                    form.setValue("category", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeCategories.length > 0 ? (
                      safeCategories.map((cat: any) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="p-2 text-sm text-gray-500">
                        No hay categorías
                      </p>
                    )}
                  </SelectContent>
                </Select>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Agrega o selecciona etiquetas</CardDescription>
            </CardHeader>
            <CardContent>
              <TagSelector
                value={selectedTags}
                onChange={(tags) => {
                  setSelectedTags(tags);
                  form.setValue("tags", tags); // <-- tags ya como string[]
                }}
                options={safeTags.map((tag: any) => tag.name)}
              />
            </CardContent>
          </Card>

          {/* Imagen */}
          <Card>
            <CardHeader>
              <CardTitle>Imagen Destacada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    name="coverImage"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Haz clic para subir una imagen
                    </p>
                  </label>
                </div>

                {coverImage && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(coverImage)}
                      alt="Vista previa"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
