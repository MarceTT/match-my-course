"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateInfluencer } from "../../hooks/useAffiliates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface FormData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  commissionType: "fixed" | "percentage";
  commissionAmount: number;
  password: string;
}

export default function NewInfluencerPage() {
  const router = useRouter();
  const createInfluencer = useCreateInfluencer();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    commissionType: "fixed",
    commissionAmount: 50,
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Nombre y email son requeridos");
      return;
    }

    try {
      const result = await createInfluencer.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        instagram: formData.instagram || undefined,
        commissionType: formData.commissionType,
        commissionAmount: formData.commissionAmount,
        password: formData.password || undefined,
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
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="/admin/affiliates/influencers"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a influencers
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Nuevo Influencer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="Nombre completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="email@ejemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+34 600 000 000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                  placeholder="@cuenta"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="commissionType">Tipo de Comisión</Label>
                <Select
                  value={formData.commissionType}
                  onValueChange={(value: "fixed" | "percentage") =>
                    setFormData({ ...formData, commissionType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Monto Fijo (€)</SelectItem>
                    <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="commissionAmount">
                  {formData.commissionType === "fixed"
                    ? "Monto (€)"
                    : "Porcentaje (%)"}
                </Label>
                <Input
                  id="commissionAmount"
                  type="number"
                  min="0"
                  max={formData.commissionType === "percentage" ? 100 : undefined}
                  value={formData.commissionAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commissionAmount: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña (opcional)</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Dejar vacío para generar automáticamente"
              />
              <p className="text-xs text-gray-500">
                Si no especificas una contraseña, se generará una temporal.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
