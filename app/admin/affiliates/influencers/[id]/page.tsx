"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useInfluencer,
  useUpdateInfluencer,
  useReferrals,
  useResetInfluencerPassword,
} from "../../hooks/useAffiliates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Copy, Check, Loader2, KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  negotiating: "bg-purple-100 text-purple-800",
  booked: "bg-indigo-100 text-indigo-800",
  paid: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
} as const;

const STATUS_LABELS: Record<string, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  negotiating: "En negociación",
  booked: "Reservado",
  paid: "Pagado",
  cancelled: "Cancelado",
} as const;

interface FormData {
  name: string;
  phone: string;
  instagram: string;
  commissionType: "fixed" | "percentage";
  commissionAmount: number;
  status: "active" | "inactive";
}

function PageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-6 w-40" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full mb-3" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EditInfluencerPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: influencerData, isLoading } = useInfluencer(id);
  const { data: referralsData } = useReferrals({ influencerId: id, limit: 10 });
  const updateInfluencer = useUpdateInfluencer();
  const resetPassword = useResetInfluencerPassword();

  const [copied, setCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    instagram: "",
    commissionType: "fixed",
    commissionAmount: 0,
    status: "active",
  });

  useEffect(() => {
    if (influencerData?.data) {
      const inf = influencerData.data;
      setFormData({
        name: inf.name,
        phone: inf.phone ?? "",
        instagram: inf.instagram ?? "",
        commissionType: inf.commissionType,
        commissionAmount: inf.commissionAmount,
        status: inf.status,
      });
    }
  }, [influencerData]);

  const copyLink = () => {
    const code = influencerData?.data?.code;
    if (code) {
      navigator.clipboard.writeText(`https://matchmycourse.com?ref=${code}`);
      setCopied(true);
      toast.success("Link copiado");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyPassword = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword);
      setPasswordCopied(true);
      toast.success("Contraseña copiada");
      setTimeout(() => setPasswordCopied(false), 2000);
    }
  };

  const handleResetPassword = async () => {
    try {
      const result = await resetPassword.mutateAsync(id);
      setNewPassword(result.data.temporaryPassword);
      setShowPasswordModal(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al resetear contraseña";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateInfluencer.mutateAsync({ id, data: formData });
      toast.success("Influencer actualizado");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al actualizar";
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <PageSkeleton />;

  const influencer = influencerData?.data;

  if (!influencer) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Influencer no encontrado</p>
        <Link href="/admin/affiliates/influencers">
          <Button className="mt-4">Volver a influencers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Link
        href="/admin/affiliates/influencers"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a influencers
      </Link>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Código</p>
            <div className="flex items-center gap-2">
              <code className="text-lg font-bold">{influencer.code}</code>
              <button
                onClick={copyLink}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Visitas</p>
            <p className="text-2xl font-bold">{influencer.totalVisits ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Leads</p>
            <p className="text-2xl font-bold">{influencer.totalLeads ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Conversiones</p>
            <p className="text-2xl font-bold">{influencer.totalConversions ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Pendiente</p>
            <p className="text-2xl font-bold text-yellow-600">
              €{(influencer.pendingPayout ?? 0).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Editar Influencer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={influencer.email}
                    disabled
                    className="bg-gray-100 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    placeholder="@cuenta"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tipo Comisión</Label>
                  <Select
                    value={formData.commissionType}
                    onValueChange={(v: "fixed" | "percentage") =>
                      setFormData({ ...formData, commissionType: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fijo (€)</SelectItem>
                      <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Monto</Label>
                  <Input
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
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v: "active" | "inactive") =>
                      setFormData({ ...formData, status: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={updateInfluencer.isPending}>
                  {updateInfluencer.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar cambios"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetPassword}
                  disabled={resetPassword.isPending}
                >
                  {resetPassword.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reseteando...
                    </>
                  ) : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Resetear contraseña
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        <Card>
          <CardHeader>
            <CardTitle>Referidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {referralsData?.data?.referrals?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Sin referidos aún</p>
            ) : (
              <div className="space-y-3">
                {referralsData?.data?.referrals?.map((ref) => (
                  <div
                    key={ref._id}
                    className="p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <p className="font-medium text-sm">{ref.prospectName}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {ref.prospectEmail}
                      </span>
                      <Badge className={`text-xs ${STATUS_COLORS[ref.status]}`}>
                        {STATUS_LABELS[ref.status]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Password Reset Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva contraseña generada</DialogTitle>
            <DialogDescription>
              Copia esta contraseña y envíasela al influencer. No podrás verla de nuevo.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <code className="flex-1 text-lg font-mono font-bold">{newPassword}</code>
              <Button variant="outline" size="sm" onClick={copyPassword}>
                {passwordCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Email: <strong>{influencer?.email}</strong>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
