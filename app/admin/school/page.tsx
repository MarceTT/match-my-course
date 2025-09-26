"use client";   

import React, { useEffect, useState, useMemo } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useSchools } from "@/app/hooks/useSchools";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSupportedCountries } from "@/app/utils/countryUtils";
import { School } from "@/app/types";

const SchoolPage = () => {
  const { data: schools, isLoading, error } = useSchools();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast.error("Error al cargar las escuelas");
    }
  }, [error]);

  // Filtrar escuelas por país seleccionado
  const filteredSchools = useMemo(() => {
    if (!schools) return [];
    if (!selectedCountry) return schools;
    return schools.filter((school: School) => school.country?.code === selectedCountry);
  }, [schools, selectedCountry]);

  // Calcular estadísticas por país
  const countryStats = useMemo(() => {
    if (!schools) return {};
    
    const stats: Record<string, { count: number; active: number }> = {};
    
    schools.forEach((school: School) => {
      const country = school.country?.code || 'unknown';
      if (!stats[country]) {
        stats[country] = { count: 0, active: 0 };
      }
      stats[country].count++;
      if (school.status) {
        stats[country].active++;
      }
    });
    
    return stats;
  }, [schools]);

  // Obtener lista de países con estadísticas
  const countryList = useMemo(() => {
    return getSupportedCountries().map(country => ({
      ...country,
      stats: countryStats[country.code] || { count: 0, active: 0 }
    }));
  }, [countryStats]);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between py-4 px-4">
        <h2 className="text-xl font-bold">Lista de Escuelas</h2>
        <Link href="/admin/school/create">
          <Button className="ml-auto">Agregar Escuela</Button>
        </Link>
      </div>

      {/* Filtros por país */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Botón para mostrar todas */}
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${
              !selectedCountry ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedCountry(null)}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🌍</div>
                <div className="font-semibold">Todos los países</div>
                <div className="text-sm text-gray-600">
                  {schools?.length || 0} escuelas
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones por país */}
          {countryList.map((country) => (
            <Card 
              key={country.code}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCountry === country.code ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedCountry(country.code)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">{country.flag}</div>
                  <div className="font-semibold">{country.name}</div>
                  <div className="text-sm text-gray-600">
                    {country.stats.count} escuelas
                  </div>
                  {country.stats.count > 0 && (
                    <Badge 
                      variant={country.stats.active > 0 ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {country.stats.active} activas
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCountry && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Mostrando escuelas de:</span>
            <Badge variant="outline">
              {countryList.find(c => c.code === selectedCountry)?.flag}{' '}
              {countryList.find(c => c.code === selectedCountry)?.name}
            </Badge>
          </div>
        )}
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
        <DataTable columns={columns} data={filteredSchools} />
      )}
    </div>
  );
};

export default SchoolPage;
