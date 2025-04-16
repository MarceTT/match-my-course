"use client";

import { useState, useEffect } from "react";
import { Grid, List, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SchoolDetails } from "@/app/types/index";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { Switch } from "@/components/ui/switch";
import { usePrefetchSchoolDetails } from "@/app/hooks/usePrefetchSchoolDetails";

interface SchoolListProps {
  isFilterOpen: boolean;
  schools: SchoolDetails[];
  isLoading: boolean;
  isError: boolean;
}

const SchoolSearchList = ({
  isFilterOpen,
  schools,
  isLoading,
  isError,
}: SchoolListProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) setViewType("list");
  }, []);

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError)
    return (
      <p className="text-red-500 text-sm p-4">Error al cargar las escuelas.</p>
    );
  if (schools.length === 0)
    return (
      <p className="text-gray-500 text-sm p-4">No se encontraron resultados.</p>
    );

  return (
    <div
      className={`flex-1 flex flex-col ${
        isFilterOpen ? "mt-0 lg:mt-64" : "mt-0"
      }`}
    >
      <ViewTypeSelector viewType={viewType} setViewType={setViewType} />
      
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

const ViewTypeSelector = ({
  viewType,
  setViewType,
}: {
  viewType: "grid" | "list";
  setViewType: (type: "grid" | "list") => void;
}) => (
  <div className="flex items-center space-x-4 md:flex-row md:space-x-4">
    <span className="text-sm text-gray-600 hidden md:inline">Vista</span>
    <div className="hidden md:flex items-center space-x-2">
      <Switch
        checked={viewType === "grid"}
        onCheckedChange={(checked) => setViewType(checked ? "grid" : "list")}
      />
      {viewType === "grid" ? (
        <Grid className="text-blue-500 w-4 h-4" />
      ) : (
        <List className="text-gray-500 w-4 h-4" />
      )}
      <span className="text-sm text-gray-600">
        {viewType === "grid" ? "Cuadrícula" : "Lista"}
      </span>
    </div>
  </div>
);

interface SchoolCardProps {
  school: SchoolDetails;
  viewType: "grid" | "list";
}

function SchoolCard({ school, viewType }: SchoolCardProps) {
  const prefetchSchool = usePrefetchSchoolDetails();
  const handlePrefetch = () => prefetchSchool(school._id);

  // Lógica universal para obtener precios
  const getPriceInfo = () => {
    // Caso 1: Pipeline de visa trabajo (usa prices.horarios)
    if (school.prices?.[0]?.horarios) {
      const horario = school.prices[0].horarios;
      const offerPrice = parseFloat(horario.oferta || "0");
      const originalPrice = parseFloat(horario.precio || "0");
      
      return {
        bestPrice: offerPrice > 0 ? offerPrice : originalPrice,
        originalPrice,
        hasOffer: offerPrice > 0 && offerPrice < originalPrice
      };
    }
    
    // Caso 2: Pipeline general (usa bestPrice)
    return {
      bestPrice: school.bestPrice || 0,
      originalPrice: school.originalPrice || school.bestPrice || 0,
      hasOffer: (school.bestPrice || 0) < (school.originalPrice || Infinity)
    };
  };

  const { bestPrice, originalPrice, hasOffer } = getPriceInfo();

  return (
    <div
      className={`relative rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${
        viewType === "grid"
          ? "flex flex-col h-[500px] justify-between"
          : "flex flex-col sm:flex-row"
      }`}
    >
      <OfferBadge hasOffer={hasOffer} bestPrice={bestPrice} />
      
      <SchoolImage 
        src={school.mainImage || undefined} 
        alt={school.name} 
        viewType={viewType} 
      />

      <div className={`flex flex-1 flex-col justify-between ${
        viewType === "grid" ? "mt-4" : "sm:ml-4"
      }`}>
        <SchoolHeader 
          name={school.name} 
          rating={Number(school.qualities?.ponderado ?? 0)} 
        />

        <SchoolInfo 
          city={school.city} 
          foundationYear={school.description?.añoFundacion} 
        />

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
          <SchoolLogo 
            logo={school.logo} 
            viewType={viewType} 
          />

          <PriceSection 
            bestPrice={bestPrice}
            originalPrice={originalPrice}
            hasOffer={hasOffer}
            viewType={viewType}
          />

          <ViewSchoolButton schoolId={school._id} onPrefetch={handlePrefetch} />
        </div>
      </div>
    </div>
  );
}

const OfferBadge = ({ hasOffer, bestPrice }: { hasOffer: boolean; bestPrice: number }) => (
  hasOffer && (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-yellow-400 text-yellow-900 text-sm md:text-base font-extrabold px-3 py-1 rounded-full shadow-lg animate-pulse">
        OFERTA €{bestPrice.toLocaleString()}
      </div>
    </div>
  )
);

const SchoolImage = ({ src, alt, viewType }: { src?: string; alt: string; viewType: "grid" | "list" }) => (
  <div className={`${
    viewType === "grid" ? "h-48 w-full" : "lg:h-72 lg:w-72 sm:w-56 h-40"
  } overflow-hidden rounded-lg flex-shrink-0`}>
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className="h-full w-full object-cover"
    />
  </div>
);

const SchoolHeader = ({ name, rating }: { name: string; rating?: number }) => (
  <div className="flex items-start justify-between">
    <div>
      <h3 className="text-xl font-semibold lg:text-2xl lg:font-bold">
        {name}
      </h3>
      <RatingDisplay rating={rating} />
    </div>
  </div>
);

const RatingDisplay = ({ rating }: { rating?: number }) => {
  const numericRating = Number(rating ?? 0);
  
  return (
    <div className="mt-1 flex items-center">
      {[...Array(5)].map((_, i) => {
        const full = i + 1 <= Math.floor(numericRating);
        const half = i + 0.5 === Math.round(numericRating * 2) / 2;
        
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              full
                ? "fill-yellow-400 text-yellow-400"
                : half
                ? "fill-yellow-200 text-yellow-200"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        );
      })}
      <span className="ml-2 text-sm text-gray-600">
        {numericRating.toFixed(1)}
      </span>
    </div>
  );
};

const SchoolInfo = ({ city, foundationYear }: { city?: string; foundationYear?: number }) => (
  <div className="mt-2 flex flex-col gap-2 text-sm text-gray-700">
    {city && (
      <p className="font-semibold text-base">
        Ciudad: <span className="text-gray-900">{city}</span>
      </p>
    )}

    {foundationYear && <AntiquityBadge foundationYear={foundationYear} />}
  </div>
);

const AntiquityBadge = ({ foundationYear }: { foundationYear: number }) => {
  const antiquity = new Date().getFullYear() - foundationYear;
  
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm px-2 py-1 rounded-full w-fit ${
        antiquity < 2
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {antiquity < 2
        ? "Nueva escuela"
        : `${antiquity} años de trayectoria`}
    </span>
  );
};

const SchoolLogo = ({ logo, viewType }: { logo?: string; viewType: "grid" | "list" }) => (
  <Image
    src={logo || "/placeholder.svg"}
    alt="Logo"
    className={`object-contain ${
      viewType === "grid" ? "h-16 w-auto max-w-[150px]" : ""
    }`}
    width={viewType === "grid" ? 150 : 200}
    height={viewType === "grid" ? 80 : 120}
  />
);

const PriceSection = ({
  bestPrice,
  originalPrice,
  hasOffer,
  viewType
}: {
  bestPrice: number;
  originalPrice: number;
  hasOffer: boolean;
  viewType: "grid" | "list";
}) => (
  <div className="text-center sm:text-right mt-4 sm:mt-0">
    <div className="flex flex-col items-center sm:items-end">
      {hasOffer ? (
        <>
          <div className="flex items-center gap-2 text-sm text-gray-500 line-through">
            €{originalPrice.toLocaleString()}
          </div>
          <div className="text-3xl font-extrabold text-green-600">
            €{bestPrice.toLocaleString()}
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold text-gray-800">
          €{bestPrice.toLocaleString()}
        </div>
      )}
    </div>
  </div>
);

const ViewSchoolButton = ({ schoolId, onPrefetch }: { schoolId: string; onPrefetch: () => void }) => (
  <Link
    href={`/school-detail/${schoolId}`}
    onMouseEnter={onPrefetch}
    onTouchStart={onPrefetch}
  >
    <Button
      className="mt-2 bg-[#5371FF] hover:bg-[#4257FF] text-white text-base font-semibold"
      size="lg"
    >
      Ver escuela
    </Button>
  </Link>
);

export default SchoolSearchList;