"use client";

import { useState } from "react";
import {
  usePlacementResults,
  usePlacementResult,
} from "./hooks/usePlacementResults";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import type { PlacementResultListItem } from "./types";

const PAGE_SIZE = 20;
const MAX_SCORE = 75;

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

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

function ResultDetailDialog({
  selectedId,
  onClose,
}: {
  selectedId: string | null;
  onClose: () => void;
}) {
  const { data, isLoading } = usePlacementResult(selectedId);
  const result = data?.data?.result;

  return (
    <Dialog open={!!selectedId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalle del resultado</DialogTitle>
          <DialogDescription>
            Datos del lead y respuestas del test de nivel.
          </DialogDescription>
        </DialogHeader>

        {isLoading || !result ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">Nombre</p>
                <p className="font-medium">{result.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{result.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">País</p>
                <p className="font-medium">{result.country}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Nacionalidad</p>
                <p className="font-medium">{result.nationality}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Consentimiento</p>
                <p className="font-medium">
                  {result.contactOptIn ? "Sí" : "No"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Nivel</p>
                <Badge variant="secondary">{result.level}</Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500">Puntaje</p>
                <p className="font-medium">
                  {result.score}/{MAX_SCORE}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fecha</p>
                <p className="font-medium">{formatDate(result.createdAt)}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">
                Respuestas ({result.answers.length})
              </h3>
              <div className="space-y-2">
                {result.answers.map((answer, index) => (
                  <div
                    key={`${answer.questionId}-${index}`}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {answer.questionId}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {answer.answer}
                      </p>
                    </div>
                    {answer.correct ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <Check className="h-4 w-4" />
                        <span className="text-xs font-medium">Correcta</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600">
                        <X className="h-4 w-4" />
                        <span className="text-xs font-medium">Incorrecta</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function PlacementTestPage() {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = usePlacementResults({ page, limit: PAGE_SIZE });

  const results = data?.data?.results;
  const pagination = data?.data?.pagination;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resultados del Test de Nivel</h1>
        <p className="text-gray-500">
          Leads que completaron el test de nivel de inglés
          {pagination ? ` (${pagination.total} en total)` : ""}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton />
          ) : results?.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No hay resultados todavía</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead>Nacionalidad</TableHead>
                      <TableHead>Nivel</TableHead>
                      <TableHead className="text-right">Puntaje</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results?.map((result: PlacementResultListItem) => (
                      <TableRow key={result._id}>
                        <TableCell className="font-medium">
                          {result.name}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {result.email}
                        </TableCell>
                        <TableCell>{result.country}</TableCell>
                        <TableCell>{result.nationality}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{result.level}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {result.score}/{MAX_SCORE}
                        </TableCell>
                        <TableCell>{formatDate(result.createdAt)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedId(result._id)}
                          >
                            <Eye className="h-4 w-4" /> Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    Página {pagination.page} de {pagination.pages} (
                    {pagination.total} resultados)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page <= 1}
                      onClick={() => setPage((prev) => prev - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page >= pagination.pages}
                      onClick={() => setPage((prev) => prev + 1)}
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

      <ResultDetailDialog
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
