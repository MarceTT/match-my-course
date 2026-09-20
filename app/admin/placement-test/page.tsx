"use client";

import { useState } from "react";
import {
  usePlacementResults,
  usePlacementResult,
  useDeletePlacementResult,
} from "./hooks/usePlacementResults";
import { getColumns } from "./columns";
import { PlacementDataTable } from "./data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { QUESTION_LOOKUP, NO_ANSWER } from "./lib/questionLookup";

const RESULTS_LIMIT = 100;
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
    <div className="space-y-3">
      <Skeleton className="h-10 w-full max-w-sm" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
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
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
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
            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-sm">
                  Nivel {result.level}
                </Badge>
                <span className="text-sm font-medium text-muted-foreground">
                  Puntaje: {result.score}/{MAX_SCORE}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                <DetailField label="Nombre" value={result.name} />
                <DetailField label="Email" value={result.email} />
                <DetailField label="Fecha" value={formatDate(result.createdAt)} />
                <DetailField label="País" value={result.country} />
                <DetailField label="Nacionalidad" value={result.nationality} />
                <DetailField
                  label="Consentimiento"
                  value={result.contactOptIn ? "Sí" : "No"}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">
                Respuestas ({result.answers.length})
              </h3>
              <div className="space-y-2">
                {result.answers.map((answer, index) => {
                  const info = QUESTION_LOOKUP[answer.questionId];
                  const questionText =
                    info?.questionText ?? `Pregunta ${answer.questionId}`;
                  const isCorrect = !!answer.correct;
                  const skipped =
                    !answer.answer || answer.answer === NO_ANSWER;

                  return (
                    <div
                      key={`${answer.questionId}-${index}`}
                      className={cn(
                        "rounded-lg border p-3",
                        isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            {info?.level ? (
                              <Badge variant="outline" className="text-[10px]">
                                {info.level}
                              </Badge>
                            ) : null}
                            <p className="text-sm font-medium">
                              {questionText}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Respuesta:{" "}
                            <span className="font-medium text-foreground">
                              {skipped
                                ? "No respondió / No sé"
                                : answer.answer}
                            </span>
                          </p>
                          {!isCorrect && info ? (
                            <p className="text-sm text-green-700">
                              Respuesta correcta: {info.correctAnswer}
                            </p>
                          ) : null}
                        </div>
                        {isCorrect ? (
                          <span className="flex shrink-0 items-center gap-1 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="text-xs font-medium">Correcta</span>
                          </span>
                        ) : (
                          <span className="flex shrink-0 items-center gap-1 text-red-600">
                            <X className="h-4 w-4" />
                            <span className="text-xs font-medium">
                              Incorrecta
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function PlacementTestPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = usePlacementResults({ page: 1, limit: RESULTS_LIMIT });
  const deleteMutation = useDeletePlacementResult();

  const results = data?.data?.results ?? [];
  const pagination = data?.data?.pagination;

  const columns = getColumns({
    onView: setSelectedId,
    onDelete: (id) => deleteMutation.mutate(id),
    isDeleting: deleteMutation.isPending,
  });

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Resultados del Test de Nivel</h1>
        <p className="text-muted-foreground">
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
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p>No hay resultados todavía</p>
            </div>
          ) : (
            <PlacementDataTable columns={columns} data={results} />
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
