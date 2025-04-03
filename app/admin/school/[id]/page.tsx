"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useForm, Resolver } from "react-hook-form";
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
import { useMutation } from "@tanstack/react-query";
import compressImage from "@/app/hooks/useResizeImage";
import { deleteImageSchool } from "../../actions/school";
import ConfirmDialog from "../../components/dialog-delete-image";
import { schoolEditSchema, SchoolEditValues } from "./SchoolEditSchema";
import FullScreenLoader from "../../components/FullScreenLoader";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { useSchoolById } from "@/app/hooks/useSchoolById";
import { useUpdateSchool } from "@/app/hooks/useUpdateSchool";
import { deleteSchoolImage } from "@/app/lib/api/schools";

const MAX_GALLERY_IMAGES = 5;

type GalleryImage = {
  id?: string;
  file?: File;
  url: string;
  isNew?: boolean;
};

const customResolver: Resolver<SchoolEditValues> = async (values) => {
  const transformedValues = {
    ...values,
    galleryImages: (values.galleryImages || [])
      .map((img: any) => {
        if (typeof img === "string" || img instanceof File) return img;
        if (img?.file instanceof File) return img.file;
        return null;
      })
      .filter(Boolean),
  };

  try {
    const parsed = schoolEditSchema.parse(transformedValues);
    return { values: parsed, errors: {} };
  } catch (err: any) {
    return {
      values: {},
      errors: (err.errors || []).reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = {
          type: "manual",
          message: curr.message,
        };
        return acc;
      }, {}),
    };
  }
};

const EditSchoolPage = () => {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id as string;

  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingMainImage, setLoadingMainImage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [removingImages, setRemovingImages] = useState<Record<string, boolean>>({});

  const { data: schoolData, isLoading: isFetching, refetch: refetchSchoolData } = useSchoolById(schoolId);

  useEffect(() => {
    if (!isFetching) {
      const timer = setTimeout(() => setLoadingScreen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isFetching]);

  const form = useForm<SchoolEditValues>({
    resolver: customResolver,
    defaultValues: {
      name: "",
      city: "",
      status: true,
      logo: null,
      mainImage: null,
      galleryImages: [],
    },
  });

  useEffect(() => {
    if (schoolData) {
      form.reset({
        name: schoolData.name,
        city: schoolData.city,
        status: schoolData.status,
        logo: schoolData.logo || null,
        mainImage: schoolData.mainImage || null,
        galleryImages: schoolData.galleryImages?.map((img: string) => ({
          id: img.split("/").pop()?.split(".")[0],
          url: img,
          isNew: false,
        })) || [],
      });
    }
  }, [schoolData, form]);

  const mutation = useUpdateSchool(schoolId, async () => {
    await refetchSchoolData(); // Refresca los datos tras la actualización
    router.push("/admin/school"); // Redirige después de guardar
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    setLoading: (value: boolean) => void
  ) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    
    try {
      setLoading(true);
      const originalSizeMB = file.size / (1024 * 1024);
      toast.info(`Comprimiendo imagen de ${originalSizeMB.toFixed(2)}MB...`);
      
      const compressedFile = await compressImage(file);
      const compressedSizeMB = compressedFile.size / (1024 * 1024);
      
      toast.success(`Imagen optimizada a ${compressedSizeMB.toFixed(2)}MB`, {
        description: `Reducción de ${(originalSizeMB - compressedSizeMB).toFixed(2)}MB (${((originalSizeMB - compressedSizeMB) / originalSizeMB * 100).toFixed(0)}%)`
      });
      
      field.onChange(compressedFile);
    } catch (error) {
      console.error('Error comprimiendo imagen:', error);
      toast.error(error instanceof Error ? error.message : "Error al procesar la imagen");
      field.onChange(null);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      setLoadingGallery(true);
      setUploadProgress(0);

      const files = Array.from(e.target.files);
      const currentImages = field.value || [];
      const availableSlots = MAX_GALLERY_IMAGES - currentImages.length;
      
      if (availableSlots <= 0) {
        toast.warning(`Solo puedes subir hasta ${MAX_GALLERY_IMAGES} imágenes`);
        return;
      }

      const validFiles = files.slice(0, availableSlots);
      const newImages: GalleryImage[] = [];
      let processedCount = 0;

      for (const file of validFiles) {
        try {
          processedCount++;
          setUploadProgress((processedCount / validFiles.length) * 80);
          
          const originalSizeMB = file.size / (1024 * 1024);
          toast.info(`Procesando imagen (${originalSizeMB.toFixed(2)}MB)`);
          
          const compressedFile = await compressImage(file);
          const compressedSizeMB = compressedFile.size / (1024 * 1024);
          
          toast.success(`Imagen optimizada a ${compressedSizeMB.toFixed(2)}MB`, {
            description: `Reducción de ${(originalSizeMB - compressedSizeMB).toFixed(2)}MB`
          });

          newImages.push({
            file: compressedFile,
            url: URL.createObjectURL(compressedFile),
            isNew: true
          });
        } catch (error) {
          console.error(`Error procesando imagen:`, error);
          toast.error(error instanceof Error ? error.message : `Error al procesar imagen`);
          continue;
        } finally {
          setUploadProgress((processedCount / validFiles.length) * 100);
        }
      }

      field.onChange([...currentImages, ...newImages].slice(0, MAX_GALLERY_IMAGES));
    } catch (error) {
      console.error('Error general:', error);
      toast.error("Error al procesar las imágenes");
    } finally {
      setLoadingGallery(false);
      setUploadProgress(0);
      e.target.value = '';
    }
  };

  const handleRemoveImage = async (
    imageType: "logo" | "mainImage" | "galleryImages",
    imageId?: string,
    imageUrl?: string
  ) => {
    const imageKey = imageUrl?.split("/").pop(); // para eliminar desde S3
    const imageIdentifier = imageUrl || imageType;
  
    setRemovingImages((prev) => ({ ...prev, [imageIdentifier]: true }));
  
    try {
      const result = await deleteSchoolImage(schoolId, imageKey!, imageType); // 👈 ESTA, no la server action
  
      if (result.error) throw new Error(result.error);
  
      if (imageType === "galleryImages") {
        const currentGallery = form.getValues("galleryImages");
        form.setValue(
          "galleryImages",
          currentGallery.filter((img) =>
            typeof img !== "object" || img.url !== imageUrl
          )
        );
      } else {
        form.setValue(imageType, null);
      }
  
      toast.success("Imagen eliminada correctamente");
    } catch (error: any) {
      console.error("❌ Error al eliminar imagen:", error);
      toast.error(error.message || "No se pudo eliminar la imagen");
    } finally {
      setRemovingImages((prev) => ({ ...prev, [imageIdentifier]: false }));
      if (imageUrl?.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    }
  };

  const renderGalleryImages = (field: any) => {
    return (field.value || []).map((img: GalleryImage | File | string, index: number) => {
      const imageObj: GalleryImage = typeof img === 'string' ? {
        id: img.split('/').pop()?.split('.')[0],
        url: img,
        isNew: false
      } : img instanceof File ? {
        file: img,
        url: URL.createObjectURL(img),
        isNew: true
      } : img;

      return (
        <div key={imageObj.url} className="relative aspect-square group">
          <Image
            src={imageObj.url}
            alt={`Imagen ${index + 1}`}
            fill
            className="object-cover rounded-lg"
            onLoadingComplete={() => imageObj.url.startsWith('blob:') && URL.revokeObjectURL(imageObj.url)}
          />
          <ConfirmDialog
            title="Eliminar Imagen"
            description="¿Estás seguro de eliminar esta imagen?"
            onConfirm={() => handleRemoveImage("galleryImages", imageObj.id, imageObj.url)}
          >
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={removingImages[imageObj.url]}
            >
              {removingImages[imageObj.url] ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FaRegTrashAlt className="h-4 w-4" />
              )}
            </Button>
          </ConfirmDialog>
          {imageObj.isNew && (
            <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Nuevo
            </span>
          )}
        </div>
      );
    });
  };

  if (loadingScreen) return <FullScreenLoader isLoading={loadingScreen} />;

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          
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
                        <Input placeholder="Nombre de la escuela" {...field} />
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
                        <Input placeholder="Ciudad de ubicación" {...field} />
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
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                          className="hidden"
                          id="logo"
                          onChange={(e) => handleFileChange(e, field, setLoadingLogo)}
                        />
                        <label htmlFor="logo" className="cursor-pointer block">
                          {loadingLogo ? (
                            <div className="flex flex-col items-center gap-2">
                              <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                              <span className="text-sm text-muted-foreground">Optimizando imagen...</span>
                            </div>
                          ) : field.value ? (
                            <div className="relative h-40 w-full">
                              <Image
                                src={typeof field.value === "string" ? field.value : URL.createObjectURL(field.value)}
                                alt="Logo preview"
                                fill
                                className="object-contain rounded-lg"
                              />
                              <ConfirmDialog
                                title="Eliminar Logo"
                                description="¿Estás seguro de eliminar el logo?"
                                onConfirm={() => handleRemoveImage("logo")}
                              >
                                <Button variant="destructive" className="absolute top-2 right-2" disabled={removingImages['logo']}>
                                  {removingImages['logo'] ? <Loader2 className="h-4 w-4 animate-spin" /> : "Eliminar"}
                                </Button>
                              </ConfirmDialog>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <ImagePlus className="h-8 w-8 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Subir logo</span>
                              <span className="text-xs text-muted-foreground">Formatos: JPG, PNG, WEBP, SVG</span>
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
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                          className="hidden"
                          id="mainImage"
                          onChange={(e) => handleFileChange(e, field, setLoadingMainImage)}
                        />
                        <label htmlFor="mainImage" className="cursor-pointer block">
                          {loadingMainImage ? (
                            <div className="flex flex-col items-center gap-2">
                              <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                              <span className="text-sm text-muted-foreground">Optimizando imagen...</span>
                            </div>
                          ) : field.value ? (
                            <div className="relative h-40 w-full">
                              <Image
                                src={typeof field.value === "string" ? field.value : URL.createObjectURL(field.value)}
                                alt="Imagen principal"
                                fill
                                className="object-cover rounded-lg"
                              />
                              <ConfirmDialog
                                title="Eliminar Imagen"
                                description="¿Estás seguro de eliminar esta imagen?"
                                onConfirm={() => handleRemoveImage("mainImage")}
                              >
                                <Button variant="destructive" className="absolute top-2 right-2" disabled={removingImages['mainImage']}>
                                  {removingImages['mainImage'] ? <Loader2 className="h-4 w-4 animate-spin" /> : "Eliminar"}
                                </Button>
                              </ConfirmDialog>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <ImagePlus className="h-8 w-8 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Subir imagen principal</span>
                              <span className="text-xs text-muted-foreground">Formatos: JPG, PNG, WEBP, SVG</span>
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

          {/* Sección de Galería */}
          <Card>
            <CardHeader>
              <CardTitle>Galería de Imágenes</CardTitle>
              <CardDescription>
                Sube hasta {MAX_GALLERY_IMAGES} imágenes (se optimizarán automáticamente)
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
                            accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                            multiple
                            onChange={(e) => handleGalleryChange(e, field)}
                            disabled={loadingGallery || (field.value?.length || 0) >= MAX_GALLERY_IMAGES}
                            className="hidden"
                            id="gallery-upload"
                          />
                          <label htmlFor="gallery-upload" className="flex flex-col items-center justify-center gap-2">
                            <UploadCloud className="h-10 w-10 text-muted-foreground" />
                            <span className="font-medium">
                              {loadingGallery
                                ? `Procesando... ${uploadProgress.toFixed(0)}%`
                                : (field.value?.length || 0) >= MAX_GALLERY_IMAGES
                                  ? `Máximo ${MAX_GALLERY_IMAGES} imágenes`
                                  : "Arrastra o selecciona imágenes"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Formatos: JPG, PNG, WEBP, SVG. Se optimizarán automáticamente
                            </span>
                          </label>
                        </div>

                        {loadingGallery && <Progress value={uploadProgress} className="h-2" />}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {renderGalleryImages(field)}
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
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={mutation.isPending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : "Actualizar Escuela"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditSchoolPage;