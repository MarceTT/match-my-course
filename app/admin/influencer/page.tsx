"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Eye, Users, TrendingUp, DollarSign, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MyDashboardData {
  profile: {
    code: string;
    totalVisits: number;
    totalLeads: number;
    totalConversions: number;
    totalEarnings: number;
    pendingPayout: number;
  };
  referralsByStatus: Record<string, number>;
  recentReferrals: Array<{
    _id: string;
    prospectName: string;
    prospectEmail: string;
    status: string;
    createdAt: string;
  }>;
}

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

function DashboardSkeleton() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default function InfluencerDashboard() {
  const [copied, setCopied] = useState(false);

  const { data, isLoading, error } = useQuery<{ success: boolean; data: MyDashboardData }>({
    queryKey: ["my-dashboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/affiliates/my-dashboard");
      return res.data;
    },
  });

  const copyLink = () => {
    const code = data?.data?.profile?.code;
    if (code) {
      navigator.clipboard.writeText(`https://matchmycourse.com?ref=${code}`);
      setCopied(true);
      toast.success("¡Link copiado al portapapeles!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-red-500">
              <p className="font-medium">Error al cargar el dashboard</p>
              <p className="text-sm mt-2">Por favor, intenta recargar la página</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = data?.data?.profile;
  const byStatus = data?.data?.referralsByStatus || {};
  const recentReferrals = data?.data?.recentReferrals || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header with referral link */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Mi Dashboard de Afiliado</h1>
        <p className="text-blue-100 mb-4">
          Comparte tu link y gana comisiones por cada estudiante que se inscriba
        </p>

        <div className="bg-white/10 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="overflow-hidden">
            <p className="text-sm text-blue-200">Tu link de referido</p>
            <code className="text-lg font-mono break-all">
              https://matchmycourse.com?ref={profile?.code}
            </code>
          </div>
          <Button
            onClick={copyLink}
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "¡Copiado!" : "Copiar Link"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Visitas
            </CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.totalVisits || 0}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              personas vieron tu link
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Leads
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.totalLeads || 0}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              dejaron sus datos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Conversiones
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {profile?.totalConversions || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              pagaron su curso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Pendiente
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              €{profile?.pendingPayout?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">por cobrar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Ganado
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{profile?.totalEarnings?.toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">histórico</p>
          </CardContent>
        </Card>
      </div>

      {/* Funnel by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de tus Referidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <Badge className={STATUS_COLORS[key]}>{label}</Badge>
                <span className="font-bold">{byStatus[key] || 0}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Referidos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentReferrals.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>Aún no tienes referidos</p>
              <p className="text-sm">¡Comparte tu link para empezar a ganar!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentReferrals.map((ref) => (
                <div
                  key={ref._id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{ref.prospectName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {ref.prospectEmail}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(ref.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge className={STATUS_COLORS[ref.status]}>
                    {STATUS_LABELS[ref.status]}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
