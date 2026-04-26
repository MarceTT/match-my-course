"use client";

import { useState } from "react";
import {
  useReferrals,
  useInfluencers,
  useUpdateReferralStatus,
  useMarkCommissionPaid,
} from "../hooks/useAffiliates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { Influencer, Referral } from "../types";

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

const COMMISSION_STATUS_LABELS: Record<string, string> = {
  none: "Sin comisión",
  pending: "Pendiente",
  approved: "Aprobada",
  paid: "Pagada",
} as const;

const SOURCE_LABELS: Record<string, string> = {
  contact_form: "Formulario contacto",
  booking: "Reserva",
  consulting: "Consultoría",
  service_form: "Formulario servicio",
} as const;

function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(7)].map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {[...Array(7)].map((_, colIdx) => (
              <TableCell key={colIdx}>
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getInfluencerName(influencer: Influencer | string): string {
  if (typeof influencer === "string") return influencer;
  return influencer.name ?? "Desconocido";
}

export default function ReferralsPage() {
  const [filters, setFilters] = useState<{
    status?: string;
    influencerId?: string;
    page: number;
  }>({
    page: 1,
  });

  const { data, isLoading } = useReferrals({
    ...filters,
    limit: 20,
  });
  const { data: influencersData } = useInfluencers();
  const updateStatus = useUpdateReferralStatus();
  const markPaid = useMarkCommissionPaid();

  const handleStatusChange = async (referralId: string, newStatus: string) => {
    try {
      await updateStatus.mutateAsync({ id: referralId, status: newStatus });
      toast.success("Estado actualizado");
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  const handleMarkPaid = async (referralId: string) => {
    if (confirm("¿Marcar comisión como pagada?")) {
      try {
        await markPaid.mutateAsync(referralId);
        toast.success("Comisión marcada como pagada");
      } catch {
        toast.error("Error al marcar como pagada");
      }
    }
  };

  const pagination = data?.data?.pagination;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/affiliates"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Referidos</h1>
        <p className="text-gray-500">Gestiona todos los leads referidos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <div className="flex flex-wrap gap-4 mt-4">
            <Select
              value={filters.status ?? "all"}
              onValueChange={(v) =>
                setFilters({
                  ...filters,
                  status: v === "all" ? undefined : v,
                  page: 1,
                })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.influencerId ?? "all"}
              onValueChange={(v) =>
                setFilters({
                  ...filters,
                  influencerId: v === "all" ? undefined : v,
                  page: 1,
                })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Influencer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los influencers</SelectItem>
                {influencersData?.data?.influencers?.map((inf) => (
                  <SelectItem key={inf._id} value={inf._id}>
                    {inf.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton />
          ) : data?.data?.referrals?.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No hay referidos con los filtros seleccionados</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prospecto</TableHead>
                      <TableHead>Influencer</TableHead>
                      <TableHead>Fuente</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Comisión</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.referrals?.map((referral: Referral) => (
                      <TableRow key={referral._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{referral.prospectName}</p>
                            <p className="text-sm text-gray-500">
                              {referral.prospectEmail}
                            </p>
                            {referral.prospectPhone && (
                              <p className="text-sm text-gray-400">
                                {referral.prospectPhone}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getInfluencerName(referral.influencerId)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {SOURCE_LABELS[referral.source] ?? referral.source}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={referral.status}
                            onValueChange={(v) =>
                              handleStatusChange(referral._id, v)
                            }
                          >
                            <SelectTrigger className="w-36">
                              <Badge className={STATUS_COLORS[referral.status]}>
                                {STATUS_LABELS[referral.status]}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                                <SelectItem key={key} value={key}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              referral.commissionStatus === "paid"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {COMMISSION_STATUS_LABELS[referral.commissionStatus]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {referral.commissionAmount != null ? (
                            <span className="font-medium">
                              €{referral.commissionAmount.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {referral.commissionStatus === "approved" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkPaid(referral._id)}
                              disabled={markPaid.isPending}
                            >
                              Marcar pagada
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    Mostrando página {pagination.page} de {pagination.pages} (
                    {pagination.total} referidos)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page <= 1}
                      onClick={() =>
                        setFilters({ ...filters, page: filters.page - 1 })
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page >= pagination.pages}
                      onClick={() =>
                        setFilters({ ...filters, page: filters.page + 1 })
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
