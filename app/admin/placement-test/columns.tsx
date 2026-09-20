"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import type { PlacementResultListItem } from "./types";

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

interface GetColumnsParams {
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function getColumns({
  onView,
  onDelete,
  isDeleting,
}: GetColumnsParams): ColumnDef<PlacementResultListItem>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.email}
        </span>
      ),
    },
    {
      accessorKey: "country",
      header: "País",
      enableSorting: false,
    },
    {
      accessorKey: "nationality",
      header: "Nacionalidad",
      enableSorting: false,
    },
    {
      accessorKey: "level",
      header: "Nivel",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.level}</Badge>
      ),
    },
    {
      accessorKey: "score",
      header: "Puntaje",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.score}/{MAX_SCORE}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      header: "Acciones",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const result = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(result._id)}
            >
              <Eye className="mr-1 h-4 w-4" /> Ver
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  aria-label="Eliminar resultado"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar este resultado?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleting}
                    onClick={() => onDelete(result._id)}
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
}
