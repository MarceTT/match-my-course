"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaRegTrashAlt } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { schoolFormSchema, SchoolFormValues } from "./SchoolSchema";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import compressImage from "@/hooks/useResizeImage";

const CreateSchoolPage = () => {
  const router = useRouter();
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingMainImage, setLoadingMainImage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [progressGallery, setProgressGallery] = useState(0);

  // Inicializamos el formulario con react-hook-form y zod
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      city: "",
      status: true,
      logo: null,
      mainImage: null,
      galleryImages: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Error al subir las imágenes");
      }

      return response.json(); // Devolver la respuesta del backend
    },
    onSuccess: (result) => {
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Escuela creada exitosamente");
        router.push("/admin/school");
      }
    },
    onError: () => {
      toast.error("Error al crear la escuela. Inténtalo nuevamente.");
    },
  });

  const handleLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.target.files?.[0]) {
      setLoadingLogo(true);
      const compressedFile = await compressImage(e.target.files[0]);
      field.onChange(compressedFile);
      setLoadingLogo(false);
    }
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.target.files?.[0]) {
      setLoadingMainImage(true);
      const compressedFile = await compressImage(e.target.files[0]);
      field.onChange(compressedFile);
      setLoadingMainImage(false);
    }
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.target.files) {
      setLoadingGallery(true);
      setProgressGallery(0);

      const files = Array.from(e.target.files);
      const totalFiles = files.length;
      let compressedFiles: File[] = [];

      for (let i = 0; i < totalFiles; i++) {
        const compressedFile = await compressImage(files[i]);
        compressedFiles.push(compressedFile);
        setProgressGallery(((i + 1) / totalFiles) * 100);
      }

      setLoadingGallery(false);
      field.onChange([...field.value, ...compressedFiles].slice(0, 10));
    }
  };

  // Función de envío del formulario
  async function onSubmit(data: SchoolFormValues) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("status", data.status.toString());

    if (data.logo) formData.append("logo", data.logo);
    if (data.mainImage) formData.append("mainImage", data.mainImage);

    if (data.galleryImages.length > 0) {
      data.galleryImages.forEach((file) => {
        formData.append("galleryImages", file); // ✅ Se envían todos los archivos
      });
    }

    mutation.mutate(formData);
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la escuela</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el nombre" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nombre completo de la institución educativa
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese la ciudad" {...field} />
                      </FormControl>
                      <FormDescription>
                        Ciudad donde se encuentra la escuela
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Estado</FormLabel>
                        <FormDescription>
                          {field.value
                            ? "La escuela está activa"
                            : "La escuela está inactiva"}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="logo"
                            onChange={(e) => handleLogoChange(e, field)}
                          />
                          <label
                            htmlFor="logo"
                            className="cursor-pointer block"
                          >
                            {loadingLogo ? ( // 🔥 Muestra el loader si está cargando
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                                <span className="text-sm text-muted-foreground">
                                  Comprimendo imagen...
                                </span>
                              </div>
                            ) : field.value ? (
                              <div className="relative h-40 w-full">
                                <Image
                                  src={
                                    URL.createObjectURL(field.value) ||
                                    "/placeholder.svg"
                                  }
                                  alt="Logo preview"
                                  fill
                                  className="object-contain rounded-lg"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Haga clic para subir el logo
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Logo oficial de la escuela (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mainImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagen Principal</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="mainImage"
                            onChange={(e) => handleImageChange(e, field)}
                          />
                          <label
                            htmlFor="mainImage"
                            className="cursor-pointer block"
                          >
                            {loadingMainImage ? ( // 🔥 Muestra el loader si está cargando
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                                <span className="text-sm text-muted-foreground">
                                  Comprimendo imagen...
                                </span>
                              </div>
                            ) : field.value ? (
                              <div className="relative h-40 w-full">
                                <Image
                                  src={
                                    URL.createObjectURL(field.value) ||
                                    "/placeholder.svg"
                                  }
                                  alt="Main image preview"
                                  fill
                                  className="object-contain rounded-lg"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Haga clic para subir la imagen principal
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Imagen principal de la escuela
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="galleryImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Galería de Imágenes</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {loadingGallery && (
                          <div className="col-span-2 md:col-span-4 flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                            <span className="text-sm text-muted-foreground">
                              Comprimiendo imágenes...
                            </span>
                            <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden">
                              <Progress value={progressGallery} />
                            </div>
                          </div>
                        )}
                        {field.value?.map((file: File, index: number) => (
                          <div key={index} className="relative aspect-square">
                            <Image
                              src={
                                URL.createObjectURL(file) || "/placeholder.svg"
                              }
                              alt={`Gallery image ${index + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                              onClick={() => {
                                const newFiles = [...field.value];
                                newFiles.splice(index, 1);
                                field.onChange(newFiles);
                              }}
                            >
                              <FaRegTrashAlt className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {(!field.value || field.value.length < 5) && (
                          <div className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center hover:bg-muted/50 transition cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="gallery"
                              multiple
                              onChange={(e) => handleGalleryChange(e, field)}
                            />
                            <label htmlFor="gallery" className="cursor-pointer">
                              <div className="flex flex-col items-center gap-2">
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground text-center">
                                  Agregar imágenes
                                </span>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Sube hasta 5 imágenes para la galería
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Escuela"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSchoolPage;
