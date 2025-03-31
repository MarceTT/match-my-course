"use client";

import { useState, useCallback } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuHeart } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { SchoolDetails } from "@/app/types/index";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { FixedSizeList as ListView, FixedSizeGrid as GridView } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Switch } from "@/components/ui/switch";

interface SchoolListProps {
  isFilterOpen: boolean;
  schools: SchoolDetails[];
  isLoading: boolean;
  isError: boolean;
}

const SchoolSearchList = ({ isFilterOpen, schools, isLoading, isError }: SchoolListProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  const ListItem = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <div style={{ ...style, padding: "12px 8px" }}>
        <SchoolCard school={schools[index]} viewType="list" />
      </div>
    ),
    [schools]
  );

  const GridItem = useCallback(
    ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
      const index = rowIndex * 3 + columnIndex;
      if (index >= schools.length) return null;

      return (
        <div style={{ ...style, padding: "12px" }}>
          <SchoolCard school={schools[index]} viewType="grid" />
        </div>
      );
    },
    [schools]
  );

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError) return <p className="text-red-500 text-sm p-4">Error al cargar las escuelas.</p>;
  if (schools.length === 0) return <p className="text-gray-500 text-sm p-4">No se encontraron resultados.</p>;

  return (
    <div className={`flex-1 flex flex-col ${isFilterOpen ? "mt-64" : "mt-0"}`}>
      <div className="hidden sm:flex justify-end space-x-4 mb-2 p-4 items-center">
        <span className="text-sm font-medium text-gray-600">Vista</span>
        <Switch
          checked={viewType === "grid"}
          onCheckedChange={(checked) => setViewType(checked ? "grid" : "list")}
        />
        <span className="text-sm font-medium text-gray-600">{viewType === "grid" ? "Cuadrícula" : "Lista"}</span>
      </div>

      <div className="flex-1 overflow-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <AutoSizer>
          {({ height, width }) =>
            viewType === "list" ? (
              <ListView
                height={height}
                itemCount={schools.length}
                itemSize={340}
                width={width}
                overscanCount={3}
              >
                {ListItem}
              </ListView>
            ) : (
              <GridView
                columnCount={Math.min(3, Math.max(1, Math.floor(width / 320)))}
                columnWidth={Math.min(360, width / Math.min(3, Math.max(1, Math.floor(width / 300))))}
                rowCount={Math.ceil(schools.length / Math.min(3, Math.max(1, Math.floor(width / 300))))}
                rowHeight={500}
                height={height}
                width={width}
                overscanRowCount={2}
              >
                {GridItem}
              </GridView>
            )
          }
        </AutoSizer>
      </div>
    </div>
  );
};

interface SchoolCardProps {
  school: SchoolDetails;
  viewType: "grid" | "list";
}

function SchoolCard({ school, viewType }: SchoolCardProps) {
  return (
    <div
      className={`relative rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${
        viewType === "grid" ? "flex flex-col h-[490px]" : "flex flex-col sm:flex-row"
      }`}
    >
      <div className={`${viewType === "grid" ? "h-48 w-full" : "lg:h-72 lg:w-72 sm:w-56 h-40"} overflow-hidden rounded-lg flex-shrink-0`}>
        <img 
          src={school.mainImage || "/placeholder.svg"} 
          alt={school.name} 
          className="h-full w-full object-cover" 
        />
      </div>

      <div className={`flex flex-1 flex-col justify-between ${viewType === "grid" ? "mt-4" : "sm:ml-4"}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold lg:text-2xl lg:font-bold">{school.name}</h3>
            <div className="mt-1 flex items-center">
              {[...Array(5)].map((_, i) => {
                const rating = Number(school.qualities?.ponderado ?? 0);
                const full = i + 1 <= Math.floor(rating);
                const half = i + 0.5 === Math.round(rating * 2) / 2;
                return (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${full ? "fill-yellow-400 text-yellow-400" : half ? "fill-yellow-200 text-yellow-200" : "fill-gray-200 text-gray-200"}`}
                  />
                );
              })}
              <span className="ml-2 text-sm text-gray-600">
                {parseFloat(String(school.qualities?.ponderado ?? 0)).toFixed(1)}
              </span>
            </div>
          </div>

          <Button className="bg-[#F15368] hover:bg-[#F15368]/90 rounded-full w-8 h-8 p-0">
            <LuHeart className="w-5 h-5 text-white fill-white" />
          </Button>
        </div>

        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p className="font-bold text-lg">Ciudad: {school.city}</p>
          <p className="font-bold text-lg">
            Antigüedad: {school.description?.añoFundacion ? new Date().getFullYear() - school.description?.añoFundacion : ""} años
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
          <Image
            src={school.logo || "/placeholder.svg"}
            alt="Logo"
            className="object-contain"
            width={200}
            height={120}
          />
          <div className="text-center sm:text-right mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <div className="text-lg text-gray-600 font-bold mt-1">Desde</div>
              <div className="text-2xl font-bold">
                €{school.prices?.[0]?.horarios?.precio?.toLocaleString() || '0'}
              </div>
            </div>
            <Link href={`/school-detail/${school._id}`}>
              <Button className="mt-2 bg-[#5371FF] hover:bg-[#4257FF] text-white text-base font-semibold" size="lg">
                Ver escuela
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolSearchList;
