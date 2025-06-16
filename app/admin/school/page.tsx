"use client";   

import React, { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useSchools } from "@/app/hooks/useSchools";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SchoolPage = () => {
  const { data: schools, isLoading, error } = useSchools();

  useEffect(() => {
    if (error) {
      toast.error("Error al cargar las escuelas");
    }
  }, [error]);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between py-4 px-4">
        <h2 className="text-xl font-bold">Lista de Escuelas</h2>
        <Link href="/admin/school/create">
          <Button className="ml-auto">Agregar Escuela</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, colIndex) => (
                  <th key={col.id || colIndex} className="px-4 py-2 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {columns.map((col, colIndex) => (
                    <td key={col.id || colIndex} className="px-4 py-3">
                      <Skeleton className="h-6 w-full bg-gray-200 rounded-md" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DataTable columns={columns} data={schools || []} />
      )}
    </div>
  );
};

export default SchoolPage;
