"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImagePlus, Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { deleteImageSchool, getSchoolById } from "../../actions/school";
import ConfirmDialog from "../../components/dialog-delete-image";
import { schoolEditSchema, SchoolEditValues } from "./SchoolEditSchema";
import FullScreenLoader from "../../components/FullScreenLoader";

const EditSchoolPage = () => {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id as string;
  
  // Estados para carga
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingMainImage, setLoadingMainImage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [removingImages, setRemovingImages] = useState<Record<string, boolean>>({});

  // Fetch existing school data
  const { 
    data: schoolData, 
    isLoading: isFetching, 
    refetch: refetchSchoolData 
  } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      const response = await getSchoolById(schoolId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!schoolId,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isFetching) {
      const timer = setTimeout(() => setLoadingScreen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isFetching]);

  // Inicializar formulario
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

  // Precargar datos cuando schoolData cambie
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

  // Mutation para actualizar con API route
  const mutation = useMutation({
    mutationFn: async (data: SchoolEditValues) => {
      const formData = new FormData();
    
      // Agregar TODOS los campos del formulario
      formData.append('name', data.name);
      formData.append('city', data.city);
      formData.append('status', data.status.toString());
  
      // Agregar archivos si existen (sin validaciones extras)
      if (data.logo) formData.append('logo', data.logo);
      if (data.mainImage) formData.append('mainImage', data.mainImage);
      
      // Agregar todas las imágenes de la galería
      data.galleryImages.forEach(file => {
        formData.append('galleryImages', file);
      });
  
      // Enviar TODO en una sola petición
      const response = await fetch(`/api/schools/${schoolId}`, {
        method: 'PUT',
        body: formData, // Sin headers manuales
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar');
      }
  
      return response.json();
    },
    onSuccess: async (result) => {
      await refetchSchoolData();
      toast.success("Escuela actualizada exitosamente");
      router.push("/admin/school");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar la escuela");
    },
  });

  // Función para manejar cambios en archivos individuales
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    setLoading: (value: boolean) => void
  ) => {
    if (e.target.files?.[0]) {
      try {
        setLoading(true);
        const compressedFile = await compressImage(e.target.files[0]);
        field.onChange(compressedFile);
      } catch (error) {
        toast.error("Error al procesar la imagen");
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para manejar cambios en la galería
  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setLoadingGallery(true);
        setUploadProgress(0);

        const files = Array.from(e.target.files);
        const totalFiles = files.length;
        let processedCount = 0;

        // Procesar en lotes para mejor performance
        const batchSize = 3;
        let compressedFiles: File[] = [];

        for (let i = 0; i < files.length; i += batchSize) {
          const batch = files.slice(i, i + batchSize);
          const batchResults = await Promise.all(
            batch.map(file => compressImage(file))
          );
          
          compressedFiles = [...compressedFiles, ...batchResults];
          processedCount += batch.length;
          setUploadProgress((processedCount / totalFiles) * 100);
        }

        // Limitar a 10 imágenes como máximo
        const currentImages = field.value || [];
        const newImages = [...currentImages, ...compressedFiles].slice(0, 10);
        field.onChange(newImages);

      } catch (error) {
        toast.error("Error al procesar las imágenes");
      } finally {
        setLoadingGallery(false);
        setUploadProgress(0);
      }
    }
  };

  // Función para eliminar imágenes
  const handleRemoveImage = async (
    imageType: "logo" | "mainImage" | "galleryImages", 
    imageUrl?: string
  ) => {
    if (!schoolData) return;

    const imageKey = imageUrl || imageType;
    setRemovingImages(prev => ({ ...prev, [imageKey]: true }));

    try {
      let s3ImageKey = "";
      if (imageUrl) {
        s3ImageKey = imageUrl.split(".com/")[1];
      } else if (imageType === "logo" && schoolData.logo) {
        s3ImageKey = schoolData.logo.split(".com/")[1];
      } else if (imageType === "mainImage" && schoolData.mainImage) {
        s3ImageKey = schoolData.mainImage.split(".com/")[1];
      }

      if (s3ImageKey) {
        const response = await deleteImageSchool(schoolId, s3ImageKey, imageType);
        if (response.error) throw new Error(response.error);
      }

      // Actualizar formulario localmente
      if (imageType === "galleryImages" && imageUrl) {
        const currentGallery = form.getValues("galleryImages");
        form.setValue("galleryImages", currentGallery.filter(img => img !== imageUrl));
      } else {
        form.setValue(imageType, null);
      }

      // Refrescar datos del servidor
      await refetchSchoolData();
      toast.success("Imagen eliminada correctamente");
    } catch (error) {
      toast.error("No se pudo eliminar la imagen");
    } finally {
      setRemovingImages(prev => ({ ...prev, [imageKey]: false }));
    }
  };

  return (
    <div className="p-4">
      {loadingScreen ? (
        <FullScreenLoader isLoading={loadingScreen} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(data => mutation.mutate(data))} className="space-y-6">
            {/* Sección de Información Básica */}
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

            {/* Sección de Logo */}
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
                            onChange={(e) => handleFileChange(e, field, setLoadingLogo)}
                          />
                          <label htmlFor="logo" className="cursor-pointer block">
                            {loadingLogo ? (
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                                <span className="text-sm text-muted-foreground">
                                  Comprimiendo imagen...
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
                                  description="¿Estás seguro de eliminar el logo?"
                                  onConfirm={() => handleRemoveImage("logo")}
                                >
                                  <Button
                                    variant="destructive"
                                    className="absolute top-2 right-2"
                                    disabled={removingImages['logo']}
                                  >
                                    {removingImages['logo'] ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      "Eliminar"
                                    )}
                                  </Button>
                                </ConfirmDialog>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Haz clic para subir el logo
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Sección de Imagen Principal */}
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
                            onChange={(e) => handleFileChange(e, field, setLoadingMainImage)}
                          />
                          <label htmlFor="mainImage" className="cursor-pointer block">
                            {loadingMainImage ? (
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                                <span className="text-sm text-muted-foreground">
                                  Comprimiendo imagen...
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
                                  alt="Imagen principal preview"
                                  fill
                                  className="object-contain rounded-lg"
                                />
                                <ConfirmDialog
                                  title="Eliminar Imagen Principal"
                                  description="¿Estás seguro de eliminar esta imagen?"
                                  onConfirm={() => handleRemoveImage("mainImage")}
                                >
                                  <Button
                                    variant="destructive"
                                    className="absolute top-2 right-2"
                                    disabled={removingImages['mainImage']}
                                  >
                                    {removingImages['mainImage'] ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      "Eliminar"
                                    )}
                                  </Button>
                                </ConfirmDialog>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Haz clic para subir la imagen principal
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Sección de Galería de Imágenes */}
            <Card>
              <CardHeader>
                <CardTitle>Galería de Imágenes</CardTitle>
                <CardDescription>
                  Sube hasta 10 imágenes para la galería
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="galleryImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition cursor-pointer">
                            <Input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleGalleryChange(e, field)}
                              disabled={loadingGallery}
                              className="hidden"
                              id="gallery-upload"
                            />
                            <label
                              htmlFor="gallery-upload"
                              className="flex flex-col items-center justify-center gap-2"
                            >
                              <UploadCloud className="h-10 w-10 text-muted-foreground" />
                              <span className="font-medium">
                                {loadingGallery
                                  ? `Cargando... ${uploadProgress.toFixed(0)}%`
                                  : "Arrastra imágenes o haz clic para seleccionar"}
                              </span>
                            </label>
                          </div>

                          {loadingGallery && (
                            <Progress value={uploadProgress} className="h-2" />
                          )}

                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {field.value?.map((item, index) => {
                              const imageUrl = typeof item === "string" ? item : URL.createObjectURL(item);
                              const isRemoving = removingImages[imageUrl] || false;
                              
                              return (
                                <div key={imageUrl} className="relative aspect-square">
                                  <Image
                                    src={imageUrl}
                                    alt={`Imagen ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                  <ConfirmDialog
                                    title="Eliminar Imagen"
                                    description="¿Estás seguro de eliminar esta imagen?"
                                    onConfirm={() => 
                                      handleRemoveImage(
                                        "galleryImages", 
                                        typeof item === "string" ? item : undefined
                                      )
                                    }
                                  >
                                    <Button 
                                      variant="destructive" 
                                      size="icon" 
                                      className="absolute top-2 right-2"
                                      disabled={isRemoving}
                                    >
                                      {isRemoving ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <FaRegTrashAlt className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </ConfirmDialog>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </FormControl>
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
              <Button 
                type="submit" 
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Actualizar Escuela"
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