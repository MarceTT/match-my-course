"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import compressImage from "@/app/hooks/useResizeImage";
import { deleteImageSchool, getSchoolById, updateSchool } from "../../actions/school";
import ConfirmDialog from "../../components/dialog-delete-image";
import { schoolEditSchema, SchoolEditValues } from "./SchoolEditSchema";
import FullScreenLoader from "../../components/FullScreenLoader";

const EditSchoolPage = () => {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id as string;
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingMainImage, setLoadingMainImage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [progressGallery, setProgressGallery] = useState(0);

  // Fetch existing school data
  const { data: schoolData, isLoading: isFetching } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      const response = await getSchoolById(schoolId);

      if (response.error) {
        console.error("❌ Error obteniendo la escuela:", response.error);
        throw new Error(response.error);
      }

      return response.data;
    },
    enabled: !!schoolId,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });


  const [loadingScreen, setLoadingScreen] = useState(true);

useEffect(() => {
  if (!isFetching) {
    const delay = setTimeout(() => setLoadingScreen(false), 2000); // 🔥 Retrasa la desaparición
    return () => clearTimeout(delay);
  }
}, [isFetching]);

  // Inicializamos el formulario con react-hook-form y zod
  const form = useForm<SchoolEditValues>({
    resolver: zodResolver(schoolEditSchema),
    defaultValues: {
      name: "",
      city: "",
      status: true,
      logo: null,
      mainImage: null,
      galleryImages: [],
    },
  });

  // Precargar datos cuando schoolData esté disponible
  useEffect(() => {
    if (schoolData) {
      form.reset({
        name: schoolData.name,
        city: schoolData.city,
        status: schoolData.status,
        logo: schoolData.logo || null,
        mainImage: schoolData.mainImage || null,
        galleryImages: schoolData.galleryImages || [],
      });
    }
  }, [schoolData, form]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await updateSchool(schoolId, data);

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: (result) => {
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Escuela actualizada exitosamente");
        router.push("/admin/school");
      }
    },
    onError: () => {
      toast.error("Error al actualizar la escuela. Inténtalo nuevamente.");
    },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    setLoading: (value: boolean) => void
  ) => {
    if (e.target.files?.[0]) {
      setLoading(true);
      const compressedFile = await compressImage(e.target.files[0]);
      field.onChange(compressedFile);
      setLoading(false);
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

  const handleRemoveLogo = async () => {
    const imageKey = schoolData.logo.split(".com/")[1];

    const response = await deleteImageSchool(schoolId, imageKey, "logo");

    if (response.error) {
      toast.error("No se pudo eliminar el logo.");
      return;
    }

    form.setValue("logo", null);
    toast.success("Logo eliminado correctamente.");
  };

  const handleRemoveMainImage = async () => {
    const imageKey = schoolData.mainImage.split(".com/")[1];

    const response = await deleteImageSchool(schoolId, imageKey, "mainImage");

    if (response.error) {
      toast.error("No se pudo eliminar la imagen principal.");
      return;
    }

    form.setValue("mainImage", null);
    toast.success("Imagen principal eliminada correctamente.");
  };

  const handleRemoveGalleryImage = async (item: File | string, field: any) => {
    if (typeof item === "string") {
      // 🔥 Imagen de la BD (AWS S3), eliminar del servidor
      const imageKey = item.split(".com/")[1];

      const response = await deleteImageSchool(schoolId, imageKey, "galleryImages");

      if (response.error) {
        toast.error("No se pudo eliminar la imagen.");
        return;
      }
    }

    // 🔥 Remover la imagen de la lista del formulario
    const newFiles = field.value.filter((img: File | string) => img !== item);
    field.onChange(newFiles);

    toast.success("Imagen eliminada correctamente.");
  };

  async function onSubmit(data: SchoolEditValues) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("status", data.status.toString());

    if (data.logo) formData.append("logo", data.logo);
    if (data.mainImage) formData.append("mainImage", data.mainImage);

    if (data.galleryImages.length > 0) {
      data.galleryImages.forEach((file) => {
        formData.append("galleryImages", file);
      });
    }

    mutation.mutate(formData);
  }

  return (
    <div className="p-4">
      {loadingScreen ? (
        <FullScreenLoader isLoading={loadingScreen} />
      ) : (
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
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese el nombre" {...field} />
                        </FormControl>
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
                            {field.value ? "Activo" : "Inactivo"}
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

            {/* Logo */}
            <Card>
              <CardContent className="pt-6">
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
                            onChange={(e) =>
                              handleFileChange(e, field, setLoadingLogo)
                            }
                          />
                          <label
                            htmlFor="logo"
                            className="cursor-pointer block"
                          >
                            {loadingLogo ? (
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
                                    typeof field.value === "string"
                                      ? field.value
                                      : URL.createObjectURL(field.value)
                                  }
                                  alt="Logo preview"
                                  fill
                                  className="object-contain rounded-lg"
                                />
                                <ConfirmDialog
                                  title="Eliminar Logo"
                                  description="¿Estás seguro de eliminar el logo? Esta acción no se puede deshacer."
                                  onConfirm={handleRemoveLogo}
                                >
                                  <Button
                                    variant="destructive"
                                    className="absolute top-2 right-2"
                                  >
                                    Cambiar
                                  </Button>
                                </ConfirmDialog>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => field.onChange(null)}
                                >
                                  Eliminar
                                </Button>
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
              </CardContent>
            </Card>

            {/* Imagen Principal */}
            <Card>
              <CardContent className="pt-6">
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
                            onChange={(e) =>
                              handleFileChange(e, field, setLoadingMainImage)
                            }
                          />
                          <label
                            htmlFor="mainImage"
                            className="cursor-pointer block"
                          >
                            {loadingMainImage ? (
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
                                    typeof field.value === "string"
                                      ? field.value
                                      : URL.createObjectURL(field.value)
                                  }
                                  alt="Imagen Principal preview"
                                  fill
                                  className="object-contain rounded-lg"
                                />
                                <ConfirmDialog
                                  title="Eliminar Imagen Principal"
                                  description="¿Estás seguro de eliminar esta imagen? Esta acción no se puede deshacer."
                                  onConfirm={handleRemoveMainImage}
                                >
                                  <Button
                                    variant="destructive"
                                    className="absolute top-2 right-2"
                                  >
                                    Eliminar
                                  </Button>
                                </ConfirmDialog>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => field.onChange(null)}
                                >
                                  Eliminar
                                </Button>
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
              </CardContent>
            </Card>

            {/* Galería de Imágenes */}
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
                          {/* 🔄 Indicador de carga */}
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

                          {/* 📌 Renderizar imágenes en la galería */}
                          {field.value &&
                            Array.isArray(field.value) &&
                            field.value.map(
                              (item: File | string, index: number) => (
                                <div
                                  key={index}
                                  className="relative aspect-square"
                                >
                                  <Image
                                    src={
                                      typeof item === "string"
                                        ? item
                                        : URL.createObjectURL(item)
                                    }
                                    alt={`Galería ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                  />

                                  {/* 🔥 Botón para eliminar imágenes almacenadas en AWS S3 */}
                                  {typeof item === "string" ? (
                                    <div className="absolute top-2 right-2 flex gap-2">
                                      <ConfirmDialog
                                        title="Eliminar Imagen"
                                        description="¿Seguro que quieres eliminar esta imagen de la galería?"
                                        onConfirm={() => handleRemoveGalleryImage(item, field)}
                                      >
                                        <Button
                                          variant="destructive"
                                          size="icon"
                                        >
                                          <FaRegTrashAlt className="h-4 w-4" />
                                        </Button>
                                      </ConfirmDialog>
                                    </div>
                                  ) : (
                                    // 🔥 Botón para quitar imágenes recién agregadas (sin afectar AWS)
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        const newFiles = field.value.filter(
                                          (img: File | string) => img !== item
                                        );
                                        field.onChange(newFiles);
                                      }}
                                      className="absolute bottom-2 right-2"
                                    >
                                      Quitar
                                    </Button>
                                  )}
                                </div>
                              )
                            )}

                          {/* 📌 Input para agregar más imágenes */}
                          {(!field.value ||
                            (Array.isArray(field.value) &&
                              field.value.length < 5)) && (
                            <div className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center hover:bg-muted/50 transition cursor-pointer">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="gallery"
                                multiple
                                onChange={(e) => handleGalleryChange(e, field)}
                              />
                              <label
                                htmlFor="gallery"
                                className="cursor-pointer"
                              >
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
                  "Editar Cambios"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EditSchoolPage;
