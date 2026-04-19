"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCreateInfluencer } from "../../hooks/useAffiliates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const influencerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  commissionType: z.enum(["fixed", "percentage"]),
  commissionAmount: z.coerce
    .number()
    .min(0, "El monto debe ser mayor o igual a 0")
    .max(100, "El porcentaje no puede ser mayor a 100"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .optional()
    .or(z.literal("")),
});

type InfluencerFormValues = z.infer<typeof influencerSchema>;

export default function NewInfluencerPage() {
  const router = useRouter();
  const createInfluencer = useCreateInfluencer();

  const form = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      instagram: "",
      commissionType: "fixed",
      commissionAmount: 50,
      password: "",
    },
  });

  const commissionType = form.watch("commissionType");

  const onSubmit = async (data: InfluencerFormValues) => {
    try {
      const result = await createInfluencer.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        instagram: data.instagram || undefined,
        commissionType: data.commissionType,
        commissionAmount: data.commissionAmount,
        password: data.password || undefined,
      });

      toast.success("Influencer creado exitosamente");

      if (result.data?.temporaryPassword) {
        toast.info(`Contraseña temporal: ${result.data.temporaryPassword}`, {
          duration: 10000,
        });
      }

      router.push("/admin/affiliates/influencers");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al crear influencer";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/affiliates/influencers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a influencers
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Nuevo Influencer</CardTitle>
            <CardDescription>
              Crea una cuenta para un nuevo afiliado. Se generará automáticamente
              un código único de referido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Información Personal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Información Personal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="María García"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="maria@ejemplo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Se usará para iniciar sesión en el portal de afiliados
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+34 600 000 000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="@cuenta"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Configuración de Comisión */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configuración de Comisión</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="commissionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Comisión</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fixed">Monto Fijo (€)</SelectItem>
                              <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Define cómo se calculará la comisión por cada conversión
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="commissionAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {commissionType === "fixed" ? "Monto por conversión (€)" : "Porcentaje (%)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max={commissionType === "percentage" ? 100 : undefined}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {commissionType === "fixed"
                              ? "Cantidad fija en euros por cada estudiante que pague"
                              : "Porcentaje del valor del curso que ganará el afiliado"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Credenciales de Acceso */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Credenciales de Acceso</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Dejar vacío para generar automáticamente"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Si no especificas una contraseña, se generará una temporal
                            que deberás compartir con el influencer.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Link href="/admin/affiliates/influencers">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" disabled={createInfluencer.isPending}>
                    {createInfluencer.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      "Crear Influencer"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
