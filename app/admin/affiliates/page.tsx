"use client";

import { useDashboard, useReferrals } from "./hooks/useAffiliates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
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
  );
}

export default function AffiliatesDashboard() {
  const { data: dashboard, isLoading: loadingDashboard } = useDashboard();
  const { data: recentReferrals, isLoading: loadingReferrals } = useReferrals({
    limit: 5,
  });

  if (loadingDashboard) {
    return <DashboardSkeleton />;
  }

  const stats = dashboard?.data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Marketing de Afiliados</h1>
          <p className="text-gray-500">Gestiona influencers y referidos</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/affiliates/influencers">
            <Button variant="outline">Ver Influencers</Button>
          </Link>
          <Link href="/admin/affiliates/influencers/new">
            <Button>+ Nuevo Influencer</Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Influencers Activos
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.influencers.active ?? 0}
            </div>
            <p className="text-xs text-gray-500">
              de {stats?.influencers.total ?? 0} totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Referidos</CardTitle>
            <UserCheck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.referrals.total ?? 0}
            </div>
            <p className="text-xs text-gray-500">
              {stats?.referrals.converted ?? 0} convertidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Comisiones Pendientes
            </CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              €{stats?.commissions.pending?.toFixed(2) ?? "0.00"}
            </div>
            <p className="text-xs text-gray-500">por pagar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Comisiones Pagadas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{stats?.commissions.paid?.toFixed(2) ?? "0.00"}
            </div>
            <p className="text-xs text-gray-500">total histórico</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Referidos Recientes</CardTitle>
          <Link href="/admin/affiliates/referrals">
            <Button variant="ghost" size="sm">
              Ver todos
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loadingReferrals ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : recentReferrals?.data?.referrals?.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hay referidos aún</p>
          ) : (
            <div className="space-y-3">
              {recentReferrals?.data?.referrals?.map((referral) => (
                <div
                  key={referral._id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{referral.prospectName}</p>
                    <p className="text-sm text-gray-500">{referral.prospectEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={STATUS_COLORS[referral.status]}>
                      {STATUS_LABELS[referral.status]}
                    </Badge>
                    <Link href={`/admin/affiliates/referrals/${referral._id}`}>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
