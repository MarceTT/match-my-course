"use client";

import { useState } from "react";
import { useInfluencers, useDeleteInfluencer } from "../hooks/useAffiliates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Copy, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(9)].map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {[...Array(9)].map((_, colIdx) => (
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

export default function InfluencersPage() {
  const [search, setSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { data, isLoading } = useInfluencers({ search });
  const deleteInfluencer = useDeleteInfluencer();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(`https://matchmycourse.com?ref=${code}`);
    setCopiedCode(code);
    toast.success("Link copiado al portapapeles");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Desactivar a ${name}?`)) {
      try {
        await deleteInfluencer.mutateAsync(id);
        toast.success("Influencer desactivado");
      } catch {
        toast.error("Error al desactivar");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Influencers</h1>
          <p className="text-gray-500">Gestiona los afiliados del programa</p>
        </div>
        <Link href="/admin/affiliates/influencers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Nuevo Influencer
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email o código..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton />
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No hay influencers registrados</p>
              <Link href="/admin/affiliates/influencers/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Crear primer influencer
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Comisión</TableHead>
                    <TableHead className="text-center">Visitas</TableHead>
                    <TableHead className="text-center">Leads</TableHead>
                    <TableHead className="text-center">Conversiones</TableHead>
                    <TableHead className="text-right">Pendiente</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((influencer) => (
                    <TableRow key={influencer._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{influencer.name}</p>
                          <p className="text-sm text-gray-500">
                            {influencer.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                            {influencer.code}
                          </code>
                          <button
                            onClick={() => copyCode(influencer.code)}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded"
                          >
                            {copiedCode === influencer.code ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {influencer.commissionType === "fixed"
                          ? `€${influencer.commissionAmount}`
                          : `${influencer.commissionAmount}%`}
                      </TableCell>
                      <TableCell className="text-center">
                        {influencer.totalVisits}
                      </TableCell>
                      <TableCell className="text-center">
                        {influencer.totalLeads}
                      </TableCell>
                      <TableCell className="text-center">
                        {influencer.totalConversions}
                      </TableCell>
                      <TableCell className="text-right text-yellow-600 font-medium">
                        €{influencer.pendingPayout.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            influencer.status === "active" ? "default" : "secondary"
                          }
                        >
                          {influencer.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/affiliates/influencers/${influencer._id}`}
                          >
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() =>
                              handleDelete(influencer._id, influencer.name)
                            }
                            disabled={deleteInfluencer.isPending}
                          >
                            Desactivar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
