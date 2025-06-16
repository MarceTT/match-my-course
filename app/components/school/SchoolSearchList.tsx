import { useEffect, useState } from "react";
import { Grid, List, BadgePercent, ArrowUp } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { SchoolDetails } from "@/app/lib/types";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { usePrefetchSchoolDetails } from "@/app/hooks/usePrefetchSchoolDetails";
import { useInView } from "react-intersection-observer";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useScrollTopButton } from "@/hooks/useScrollTopButton";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Reservation } from "@/types";
import { buildReservationQuery } from "@/lib/reservation";

const SkeletonSchoolCard = () => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="rounded-lg bg-gray-200 h-40 sm:h-72 sm:w-56 lg:w-72 w-full" />
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/5" />
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 rounded-full bg-gray-200" />
            ))}
            <Skeleton className="h-4 w-6" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-48 rounded-full" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-6 w-44 rounded-md" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
};

interface SchoolListProps {
  isFilterOpen: boolean;
  schools: SchoolDetails[];
  isLoading: boolean;
  isError: boolean;
  isFetching?: boolean;
  course: string;
}

const SchoolSearchList = ({
  isFilterOpen,
  schools,
  isLoading,
  isError,
  isFetching = false,
  course,
}: SchoolListProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");
  const { ref } = useInView();
  const { visible: showScrollTop, scrollToTop } = useScrollTopButton();
  const [localLoading, setLocalLoading] = useState(false);
  const [prevCourse, setPrevCourse] = useState(course);

  useEffect(() => {
    if (course !== prevCourse) {
      setLocalLoading(true);
      setPrevCourse(course);
    } else if (!isFetching) {
      setLocalLoading(false);
    }
  }, [course, isFetching, prevCourse]);

  if (isLoading || localLoading) {
    const formattedCourse = course
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <div className="mt-6 space-y-4">
        <p className="text-gray-500 text-sm pl-1">
          Cargando resultados para <strong>{formattedCourse}</strong>...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonSchoolCard key={i} />
          ))}
        </div>
      </div>
    );
  }

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
      <div className="flex items-center space-x-4 md:flex-row md:space-x-4">
        <span className="text-sm text-gray-600 hidden md:inline">Vista</span>
        <div className="hidden md:flex items-center space-x-2">
          <Switch
            checked={viewType === "grid"}
            onCheckedChange={(checked) =>
              setViewType(checked ? "grid" : "list")
            }
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

      <div ref={ref} className="flex justify-center items-center mt-10" />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

interface SchoolCardProps {
  school: SchoolDetails;
  viewType: "grid" | "list";
}
function SchoolCard({ school, viewType }: SchoolCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prefetchSchool = usePrefetchSchoolDetails();
  const rating = Number(school.qualities?.ponderado ?? 0);
  const antiguedad = school.description?.añoFundacion
    ? new Date().getFullYear() - school.description.añoFundacion
    : null;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const priceOptions = (school.prices || []).filter(
    (p) => typeof p.precio === "number" && p.precio > 0
  );

  const selected = priceOptions[selectedOptionIndex] ?? null;
  const hasDiscount = selected?.oferta && selected.oferta < selected.precio;

  const isGrid = viewType === "grid";
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleShowSchool = () => {
      const reservation: Reservation = {
        schoolId: school._id.toString(),
        course: searchParams.get("course")?.toString() ?? "",
        weeks: 25, // TODO: WIP
        schedule: "AM", // TODO: WIP
      };
      
      const query = buildReservationQuery(reservation);  
      prefetchSchool(`${school._id}`);
      setTimeout(() => router.push(`school-detail/${school._id}?${query}`), 50);
    }

  useEffect(() => {
    setSelectedOptionIndex(0);
  }, [school._id]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseEnter={() => prefetchSchool(`${school._id}`)}
      className={`relative border bg-white hover:bg-white hover:shadow-md transition-shadow rounded-lg p-4 group ${
        isGrid
          ? "flex flex-col h-full justify-between"
          : "flex flex-col sm:flex-row"
      }`}
    >
      <div
        className={`${
          isGrid ? "h-48 w-full" : "lg:h-72 lg:w-72 sm:w-56 h-40"
        } overflow-hidden rounded-lg relative`}
      >
        {hasDiscount && (
          <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-yellow-900 text-xs sm:text-sm font-extrabold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 animate-pulse">
            <BadgePercent className="w-3 h-3 sm:w-4 sm:h-4" />
            Oferta activa
          </div>
        )}
        <Image
          src={rewriteToCDN(school.mainImage)}
          alt={school.name}
          width={500}
          height={300}
          className="h-full w-full object-cover cursor-pointer"
          loading="lazy"
          placeholder="empty"
          onClick={handleShowSchool}
        />
      </div>

      <div
        className={`flex flex-col justify-between ${
          isGrid ? "mt-4 flex-1" : "sm:ml-4 flex-1"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1
              className="mt-2 text-lg font-bold lg:mt-0 lg:text-lg xl:text-xl cursor-pointer"
              onClick={handleShowSchool}
            >
              {school.name}
            </h1>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => {
                const full = i + 1 <= Math.floor(rating);
                const half = i + 0.5 === Math.round(rating * 2) / 2;
                return (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${
                      full
                        ? "fill-yellow-400"
                        : half
                        ? "fill-yellow-200"
                        : "fill-gray-200"
                    }`}
                  />
                );
              })}
              <span className="ml-2 text-sm text-gray-600">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          {!isGrid && !isMobile && priceOptions.length > 0 && (
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-gray-900 pb-1 text-right">
                Tipos de curso:
              </p>
              <ul className="space-y-2">
                {priceOptions.map((p, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer transition-colors ${
                      selectedOptionIndex === i
                        ? "font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded"
                        : "hover:text-blue-500 hover:bg-gray-50 px-2 py-1 rounded"
                    }`}
                    onClick={() => setSelectedOptionIndex(i)}
                  >
                    Curso {p.horario} - {Math.round(Number(p.horasDeClase))}{" "}
                    horas/semana
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(isGrid || isMobile) && priceOptions.length > 0 && (
          <div className="mt-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Selecciona un tipo de curso:
            </label>
            <Select
              value={String(selectedOptionIndex)}
              onValueChange={(val) => setSelectedOptionIndex(Number(val))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elige una opción" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {priceOptions.map((p, i) => (
                  <SelectItem
                    key={i}
                    value={String(i)}
                    className="flex items-center gap-2 text-sm"
                  >
                    Curso {p.horario} - {Math.round(p.horasDeClase)} h/semana
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="text-sm mt-4 flex flex-row sm:flex-col sm:items-start sm:space-y-1 justify-between w-full lg:mt-0 xl:mt-0">
          {/* Versión para móviles */}
          <p className="block lg:hidden font-semibold text-base sm:text-lg text-gray-700 mb-1 mt-2">
            Ciudad:{" "}
            <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-600 text-md font-bold rounded-lg">
              {school.city}
            </span>
          </p>

          {/* Solo ciudad en pantallas grandes */}
          <p className="hidden lg:block">
            <span className={`inline-block px-2 py-1 bg-yellow-100 text-yellow-600 text-lg font-bold rounded-lg ${isGrid ? "mt-2" : ""
              }`}>
              {school.city}
            </span>
          </p>
          {antiguedad !== null && (
            <span className={`inline-flex items-center text-xs sm:text-sm md:text-base px-3 py-1 rounded-lg bg-gray-100 text-gray-700 ${isGrid ? "mt-2" : ""
              }`}>
              {antiguedad < 2
                ? "Nueva escuela"
                : `${antiguedad} años de trayectoria`}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between lg:mt-0 xl:mt-0">
          {!isMobile ? (
            <Image
              src={rewriteToCDN(school.logo)}
              alt="Logo"
              width={120}
              height={60}
              className="object-contain cursor-pointer"
              loading="lazy"
              placeholder="empty"
              onClick={handleShowSchool}
            />
          ) : null}

          <div className="mt-4 w-full flex flex-col items-center sm:items-end text-center sm:text-right space-y-2">
            <div className="flex flex-col sm:items-end">
              {hasDiscount ? (
                <>
                  <span className="text-xs text-gray-500 line-through">
                    €{selected?.precio?.toLocaleString()}
                  </span>
                  <span className="text-3xl font-extrabold text-green-600 lg:text-3xl xl:text-4xl">
                    €{selected?.oferta?.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-blue-600 lg:text-3xl xl:text-4xl">
                  €{selected?.precio?.toLocaleString()}
                </span>
              )}
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleShowSchool();
              }}
              className="w-full sm:w-auto bg-[#5371FF] hover:bg-[#FCCC02] hover:text-[#5371FF] text-white text-sm font-semibold rounded-md px-4 py-2 transition"
            >
              Ver escuela
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SchoolSearchList;
