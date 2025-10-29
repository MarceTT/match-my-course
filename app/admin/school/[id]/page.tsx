"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ImagePlus, Loader2, UploadCloud, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import compressImage from "@/app/hooks/useResizeImage";
import ConfirmDialog from "../../components/dialog-delete-image";
import { schoolEditSchema, SchoolEditValues } from "./SchoolEditSchema";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useSchoolById } from "@/app/hooks/useSchoolById";
import { useUpdateSchool } from "@/app/hooks/useUpdateSchool";
import { deleteSchoolImage } from "@/app/lib/api/schools";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { ReactSortable, ItemInterface } from "react-sortablejs";
import { getSupportedCountries } from "@/app/utils/countryUtils";

const MAX_GALLERY_IMAGES = 15;

interface SortableImage extends ItemInterface {
  id: string;
  url: string;
  file?: File;
  isNew?: boolean;
}

const EditSchoolPage = () => {
  const router = useRouter();
  const params = useParams();
  const schoolId = params?.id as string;

  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingMainImage, setLoadingMainImage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [removingImages, setRemovingImages] = useState({
    logo: false,
    mainImage: false,
    gallery: {} as Record<string, boolean>,
  });

  const {
    data: schoolData,
    isLoading: isFetching,
    refetch: refetchSchoolData,
  } = useSchoolById(schoolId);

  const form = useForm<SchoolEditValues>({
    resolver: async (values) => {
      try {
        const validated = schoolEditSchema.parse(values);
        return { values: validated, errors: {} };
      } catch (error: any) {
        return {
          values: {},
          errors: error.errors.reduce((acc: any, curr: any) => {
            acc[curr.path[0]] = {
              type: "manual",
              message: curr.message,
            };
            return acc;
          }, {}),
        };
      }
    },
    defaultValues: {
      name: "",
      city: "",
      status: true,
      country: undefined,
      logo: null,
      mainImage: null,
      galleryImages: [],
      urlVideo: "",
    },
  });

  const normalizeGalleryImages = useCallback(
    (images: any[]): SortableImage[] => {
      return images.map((img, index) => {
        if (typeof img === "string") {
          return {
            id: img.split("/").pop() || `img-${index}`,
            url: img,
            isNew: false,
          };
        }
        if (img instanceof File) {
          return {
            id: `new-${index}-${Date.now()}`,
            url: URL.createObjectURL(img),
            file: img,
            isNew: true,
          };
        }
        return {
          id: img.id || img.url.split("/").pop() || `img-${index}`,
          url: img.url,
          file: img.file,
          isNew: img.isNew || false,
        };
      });
    },
    []
  );

  const denormalizeGalleryImages = (images: SortableImage[]): any[] => {
    return images.map((img) => ({
      id: img.id,
      url: img.url,
      file: img.file,
      isNew: img.isNew,
    }));
  };

  useEffect(() => {
    if (!isFetching) {
      const timer = setTimeout(() => setLoadingScreen(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isFetching]);

  useEffect(() => {
    if (schoolData) {
      // Derivar país si existe en datos de backend
      let derivedCountry: string | undefined = undefined;
      const rawCountry: any = (schoolData as any).country;
      if (rawCountry) {
        if (typeof rawCountry === "object" && "code" in rawCountry) {
          derivedCountry = rawCountry.code as string;
        } else if (typeof rawCountry === "string") {
          derivedCountry = rawCountry;
        }
      }

      form.reset({
        name: schoolData.name,
        city: schoolData.city,
        status: schoolData.status,
        country: derivedCountry,
        logo: schoolData.logo || null,
        mainImage: schoolData.mainImage || null,
        galleryImages:
          schoolData.galleryImages?.map((img: string, index: number) => ({
            id: img.split("/").pop() || `img-${index}`,
            url: img,
            isNew: false,
          })) || [],
        urlVideo: schoolData.urlVideo || "",
      });
    }
  }, [schoolData, form]);

  const mutation = useUpdateSchool(schoolId, async () => {
    await refetchSchoolData();
    router.push("/admin/school");
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    setLoading: (value: boolean) => void,
    shouldCompress: boolean = true
  ) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const fileSizeMB = file.size / (1024 * 1024);

    if (!shouldCompress && fileSizeMB > 2) {
      toast.error("El logo no puede superar los 2MB");
      e.target.value = "";
      return;
    }

    setLoading(true);
    try {
      let processedFile = file;

      if (shouldCompress) {
        toast.info(`Comprimiendo imagen de ${fileSizeMB.toFixed(2)}MB...`);
        processedFile = await compressImage(file);
        const compressedSizeMB = processedFile.size / (1024 * 1024);

        toast.success(`Imagen optimizada a ${compressedSizeMB.toFixed(2)}MB`, {
          description: `Reducción de ${(fileSizeMB - compressedSizeMB).toFixed(
            2
          )}MB (${(
            ((fileSizeMB - compressedSizeMB) / fileSizeMB) *
            100
          ).toFixed(0)}%)`,
        });
      } else {
        toast.info(
          `Subiendo imagen sin compresión (${fileSizeMB.toFixed(2)}MB)`
        );
      }

      field.onChange(processedFile);
    } catch (error) {
      // console.error("Error comprimiendo imagen:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al procesar la imagen"
      );
      field.onChange(null);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    if (!e.target.files?.length) return;

    try {
      setLoadingGallery(true);
      setUploadProgress(0);

      const files = Array.from(e.target.files);
      const currentImages = form.getValues("galleryImages") || [];
      const availableSlots = MAX_GALLERY_IMAGES - currentImages.length;

      if (availableSlots <= 0) {
        toast.warning(`Solo puedes subir hasta ${MAX_GALLERY_IMAGES} imágenes`);
        return;
      }

      const validFiles = files.slice(0, availableSlots);
      const newImages: SortableImage[] = [];

      for (const [index, file] of validFiles.entries()) {
        try {
          const progress = ((index + 1) / validFiles.length) * 80;
          setUploadProgress(progress);

          const originalSizeMB = file.size / (1024 * 1024);
          toast.info(`Procesando imagen (${originalSizeMB.toFixed(2)}MB)`);

          const compressedFile = await compressImage(file);
          newImages.push({
            id: `new-${index}-${Date.now()}`,
            url: URL.createObjectURL(compressedFile),
            file: compressedFile,
            isNew: true,
          });
        } catch (error) {
          // console.error(`Error procesando imagen:`, error);
          toast.error(
            error instanceof Error ? error.message : `Error al procesar imagen`
          );
        }
      }

      const updatedGallery = [...currentImages, ...newImages];
      form.setValue("galleryImages", updatedGallery);
      await form.trigger("galleryImages");
    } catch (error) {
      // console.error("Error general:", error);
      toast.error("Error al procesar las imágenes");
    } finally {
      setLoadingGallery(false);
      setUploadProgress(0);
      e.target.value = "";
    }
  };

  const handleRemoveImage = async (
    imageType: "logo" | "mainImage" | "galleryImages",
    imageId?: string,
    imageUrl?: string
  ) => {
    if (!imageUrl && imageType !== "galleryImages") {
      imageUrl = form.getValues(imageType) as string;
    }

    const imageKey = imageUrl?.split("/").pop()?.split("?")[0];
    if (!imageKey) {
      toast.error("No se pudo obtener la referencia de la imagen");
      return;
    }

    const imageIdentifier = imageUrl || imageType;

    setRemovingImages((prev) => ({
      ...prev,
      [imageType === "galleryImages" ? "gallery" : imageType]:
        imageType === "galleryImages"
          ? { ...prev.gallery, [imageUrl!]: true }
          : true,
    }));

    try {
      const result = await deleteSchoolImage(schoolId, imageKey, imageType);
      if (result.error) throw new Error(result.error);

      if (imageType === "galleryImages") {
        const currentGallery = form.getValues("galleryImages");
        form.setValue(
          "galleryImages",
          currentGallery.filter((img) =>
            typeof img === "string"
              ? img !== imageUrl
              : (img as { url: string }).url !== imageUrl
          )
        );
      } else {
        form.setValue(imageType, null);
      }

      toast.success("Imagen eliminada correctamente ✅");
    } catch (error: any) {
      // console.error("❌ Error al eliminar imagen:", error);
      toast.error(error.message || "No se pudo eliminar la imagen");
    } finally {
      setRemovingImages((prev) => ({
        ...prev,
        [imageType === "galleryImages" ? "gallery" : imageType]:
          imageType === "galleryImages"
            ? { ...prev.gallery, [imageUrl!]: false }
            : false,
      }));

      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    }
  };

  const handleSort = (newList: SortableImage[]) => {
    form.setValue("galleryImages", denormalizeGalleryImages(newList));
  };

  if (loadingScreen) return <FullScreenLoader isLoading={loadingScreen} />;

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            // console.log("📦 Datos a enviar:", data);
            mutation.mutate(data);
          })}
          className="space-y-6"
        >
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar país" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getSupportedCountries().map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <div className="flex items-center space-x-2">
                                <span>{country.flag}</span>
                                <span>{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        País donde se encuentra la escuela
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

                <FormField
                  control={form.control}
                  name="urlVideo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de Video</FormLabel>
                      <FormControl>
                        <Input placeholder="URL de video" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enlace a video de presentación (YouTube, Vimeo, etc.)
                      </FormDescription>
                      <FormMessage />
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
                          onChange={(e) =>
                            handleFileChange(e, field, setLoadingLogo, false)
                          }
                        />
                        <label htmlFor="logo" className="cursor-pointer block">
                          {loadingLogo ? (
                            <div className="flex flex-col items-center gap-2">
                              <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                              <span className="text-sm text-muted-foreground">
                                Optimizando imagen...
                              </span>
                            </div>
                          ) : field.value ? (
                            <div className="relative h-40 w-full">
                              <Image
                                src={
                                  typeof field.value === "string"
                                    ? rewriteToCDN(field.value)
                                    : URL.createObjectURL(field.value)
                                }
                                alt="Logo preview"
                                fill
                                className="object-contain rounded-lg"
                              />
                              <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                Sin compresión
                              </div>
                              <ConfirmDialog
                                title="Eliminar Logo"
                                description="¿Estás seguro de eliminar el logo?"
                                onConfirm={() =>
                                  handleRemoveImage(
                                    "logo",
                                    undefined,
                                    form.getValues("logo") as string
                                  )
                                }
                              >
                                <Button
                                  variant="destructive"
                                  className="absolute top-2 right-2"
                                  disabled={removingImages.logo}
                                >
                                  {removingImages.logo ? (
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
                                Subir logo
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Formatos: JPG, PNG, WEBP, SVG
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
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
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
                                Optimizando imagen...
                              </span>
                            </div>
                          ) : field.value ? (
                            <div className="relative h-40 w-full">
                              <Image
                                src={
                                  typeof field.value === "string"
                                    ? rewriteToCDN(field.value)
                                    : URL.createObjectURL(field.value)
                                }
                                alt="Imagen principal"
                                fill
                                className="object-cover rounded-lg"
                              />
                              <ConfirmDialog
                                title="Eliminar Imagen"
                                description="¿Estás seguro de eliminar esta imagen?"
                                onConfirm={() =>
                                  handleRemoveImage(
                                    "mainImage",
                                    undefined,
                                    form.getValues("mainImage") as string
                                  )
                                }
                              >
                                <Button
                                  variant="destructive"
                                  className="absolute top-2 right-2"
                                  disabled={removingImages.mainImage}
                                >
                                  {removingImages.mainImage ? (
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
                                Subir imagen principal
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Formatos: JPG, PNG, WEBP, SVG
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

          {/* Sección de Galería */}
          <Card>
            <CardHeader>
              <CardTitle>Galería de Imágenes</CardTitle>
              <CardDescription>
                Puedes subir hasta {MAX_GALLERY_IMAGES} imágenes. Arrástralas
                para cambiar el orden.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="galleryImages"
                render={({ field }) => {
                  const normalizedImages = normalizeGalleryImages(
                    field.value || []
                  );

                  return (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition cursor-pointer">
                            <Input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                              multiple
                              onChange={(e) => handleGalleryChange(e, field)}
                              disabled={
                                loadingGallery ||
                                normalizedImages.length >= MAX_GALLERY_IMAGES
                              }
                              className="hidden"
                              id="gallery-upload"
                            />
                            <label
                              htmlFor="gallery-upload"
                              className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                            >
                              <UploadCloud className="h-10 w-10 text-muted-foreground" />
                              <span className="font-medium">
                                {loadingGallery
                                  ? `Procesando... ${uploadProgress.toFixed(
                                      0
                                    )}%`
                                  : normalizedImages.length >=
                                    MAX_GALLERY_IMAGES
                                  ? `Máximo ${MAX_GALLERY_IMAGES} imágenes`
                                  : "Arrastra o selecciona imágenes"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Formatos: JPG, PNG, WEBP, SVG. Se optimizarán
                                automáticamente
                              </span>
                            </label>
                          </div>

                          {loadingGallery && (
                            <Progress value={uploadProgress} className="h-2" />
                          )}

                          <ReactSortable<SortableImage>
                            list={normalizedImages}
                            setList={handleSort}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            animation={200}
                            handle=".handle"
                          >
                            {normalizedImages.map((image) => (
                              <div
                                key={image.id}
                                className="relative aspect-square group"
                              >
                                <Image
                                  src={
                                    image.url.startsWith("blob:")
                                      ? image.url
                                      : rewriteToCDN(image.url)
                                  }
                                  alt={`Imagen ${image.id}`}
                                  fill
                                  className="object-cover rounded-lg"
                                  onLoad={() =>
                                    image.url.startsWith("blob:") &&
                                    URL.revokeObjectURL(image.url)
                                  }
                                />
                                <ConfirmDialog
                                  title="Eliminar Imagen"
                                  description="¿Estás seguro de eliminar esta imagen?"
                                  onConfirm={() =>
                                    handleRemoveImage(
                                      "galleryImages",
                                      image.id,
                                      image.url
                                    )
                                  }
                                >
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    disabled={removingImages.gallery[image.url]}
                                  >
                                    {removingImages.gallery[image.url] ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <FaRegTrashAlt className="h-4 w-4" />
                                    )}
                                  </Button>
                                </ConfirmDialog>
                                {image.isNew && (
                                  <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                    Nuevo
                                  </span>
                                )}
                                <div className="handle absolute top-2 left-2 bg-white/80 rounded p-1 cursor-move">
                                  <GripVertical className="h-4 w-4 text-gray-600" />
                                </div>
                              </div>
                            ))}
                          </ReactSortable>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
                "Actualizar Escuela"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditSchoolPage;
