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
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { getSupportedCountries } from "@/app/utils/countryUtils";

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
    accessorKey: "country",
    header: "País",
    enableSorting: false,
    cell: ({ row }) => {
      const countryCode = row.original.country?.code;
      if (!countryCode) {
        return (
          <span className="text-gray-400 text-sm">Sin país</span>
        );
      }
      
      const countryInfo = getSupportedCountries().find(c => c.code === countryCode);
      if (!countryInfo) {
        return (
          <span className="text-gray-400 text-sm">{countryCode}</span>
        );
      }
      
      return (
        <div className="flex items-center space-x-2">
          <span className="text-lg">{countryInfo.flag}</span>
          <span className="font-medium">{countryInfo.name}</span>
        </div>
      );
    },
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
    enableSorting: false,
    cell: ({ row }) => (
      <LoadingImage
      src={rewriteToCDN(row.original.logo)}
      alt={row.original.name}
    />
    ),
  },
  {
    accessorKey: "actions",
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => {
        const queryClient = useQueryClient();
      const school = row.original;

      const mutation = useMutation({
        mutationFn: () => toggleSchoolStatus(school._id, school.status),
        onMutate: async () => {
          const newStatus = !school.status;
          await queryClient.cancelQueries({ queryKey: ["schools"] });
          const previous = queryClient.getQueryData<School[]>(["schools"]);
          if (previous) {
            const updated = previous.map((s) =>
              s._id === school._id ? { ...s, status: newStatus } : s
            );
            queryClient.setQueryData(["schools"], updated);
          }
          return { previous };
        },
        onError: (_err, _vars, context) => {
          if (context?.previous) {
            queryClient.setQueryData(["schools"], context.previous);
          }
          toast.error("Error al cambiar el estado");
        },
        onSuccess: () => {
          const toggled = !school.status;
          toast.success(`Escuela ${toggled ? "activada" : "desactivada"} con éxito`);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["schools"] });
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
