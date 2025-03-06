"use client";

import { ColumnDef } from "@tanstack/react-table";
import { School } from "@/app/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import { toggleSchoolStatus } from "../actions/school";
import React from "react";
import LoadingImage from "../components/LoadTableImage";

export const columns: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <span className="font-semibold">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "city",
    header: "Ciudad",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-md text-sm ${
          row.original.status
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {row.original.status ? "Activo" : "Inactivo"}
      </span>
    ),
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <LoadingImage src={row.original.logo} alt={row.original.name} />
    ),
  },
  {
    accessorKey: "actions",
    id: "actions",
    cell: ({ row }) => {
        const queryClient = useQueryClient();
      const school = row.original;

      const mutation = useMutation({
        mutationFn: () => toggleSchoolStatus(school._id, school.status),
        onSuccess: () => {
          toast.success(`Escuela ${school.status ? "desactivada" : "activada"} con éxito`);
          queryClient.invalidateQueries({ queryKey: ["schools"] });
        },
        onError: () => {
          toast.error("Error al cambiar el estado");
        },
      });
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/admin/school/${row.original._id}`} passHref>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => mutation.mutate()}>
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              {school.status ? "Deshabilitar" : "Habilitar"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
