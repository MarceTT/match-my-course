"use client";

import { useState, useCallback, useEffect } from "react";
import { Grid, List, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuHeart } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { SchoolDetails } from "@/app/types/index";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { usePrefetchSchoolDetails } from "@/app/hooks/usePrefetchSchoolDetails";

interface SchoolListProps {
  isFilterOpen: boolean;
  schools: SchoolDetails[];
  isLoading: boolean;
  isError: boolean;
}

const SchoolSearchList = ({ isFilterOpen, schools, isLoading, isError }: SchoolListProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) setViewType("list");
  }, []);

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError) return <p className="text-red-500 text-sm p-4">Error al cargar las escuelas.</p>;
  if (schools.length === 0) return <p className="text-gray-500 text-sm p-4">No se encontraron resultados.</p>;

  return (
    <div className={`flex-1 flex flex-col ${isFilterOpen ? "mt-0 lg:mt-64" : "mt-0"}`}>
      <div className="flex items-center space-x-4 md:flex-row md:space-x-4">
        <span className="text-sm text-gray-600 hidden md:inline">Vista</span>
        <div className="hidden md:flex items-center space-x-2">
          <Switch checked={viewType === "grid"} onCheckedChange={(checked) => setViewType(checked ? "grid" : "list")} />
          {viewType === "grid" ? <Grid className="text-blue-500 w-4 h-4" /> : <List className="text-gray-500 w-4 h-4" />}
          <span className="text-sm text-gray-600">{viewType === "grid" ? "Cuadrícula" : "Lista"}</span>
        </div>
      </div>

      {viewType === "list" ? (
        <div className="space-y-6 mt-4">
          {schools.map((school) => (
            <SchoolCard key={school._id} school={school} viewType="list" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {schools.map((school) => (
            <SchoolCard key={school._id} school={school} viewType="grid" />
          ))}
        </div>
      )}
    </div>
  );
};

interface SchoolCardProps {
  school: SchoolDetails;
  viewType: "grid" | "list";
}

function SchoolCard({ school, viewType }: SchoolCardProps) {
  const prefetchSchool = usePrefetchSchoolDetails();
  const handlePrefetch = () => {
    //console.log(`🔄 Prefetching details for school: ${_id}`);
    prefetchSchool(school._id);
  };
  const offer = school.prices?.[0]?.horarios?.oferta;
  const hasOffer = offer && offer.trim() !== "" && offer.trim() !== "0";

  return (
    <div className={`relative rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${viewType === "grid" ? "flex flex-col h-[500px] justify-between" : "flex flex-col sm:flex-row"}`}>
      {hasOffer && (
        <div className="absolute top-2 right-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                  <Sparkles className="w-4 h-4 mr-1" /> Oferta: €{offer}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Esta escuela tiene una promoción disponible
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      <div className={`${viewType === "grid" ? "h-48 w-full" : "lg:h-72 lg:w-72 sm:w-56 h-40"} overflow-hidden rounded-lg flex-shrink-0`}>
        <img src={school.mainImage || "/placeholder.svg"} alt={school.name} className="h-full w-full object-cover" />
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
            Antigüedad: {school.description?.añoFundacion ? new Date().getFullYear() - school.description.añoFundacion : ""} años
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
          <Image
            src={school.logo || "/placeholder.svg"}
            alt="Logo"
            className={`object-contain ${viewType === "grid" ? "h-16 w-auto max-w-[150px]" : ""}`}
            width={viewType === "grid" ? 150 : 200}
            height={viewType === "grid" ? 80 : 120}
          />
          <div className="text-center sm:text-right mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <div className="text-lg text-gray-600 font-bold mt-1">Desde</div>
              <div className="text-2xl font-bold">
                €{school.prices?.[0]?.horarios?.precio?.toLocaleString() || "0"}
              </div>
            </div>
            <Link href={`/school-detail/${school._id}`} onMouseEnter={handlePrefetch} onTouchStart={handlePrefetch}>
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
