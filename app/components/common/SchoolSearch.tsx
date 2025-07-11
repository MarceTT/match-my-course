"use client";

import { useEffect, useRef, useState } from "react";
import { useSchoolSearch } from "../../hooks/useSchoolSearch";
import Image from "next/image";
import { Search, Loader2, X, Check } from "lucide-react";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { buildSeoSchoolUrlFromSeoEntry } from "@/lib/helpers/buildSeoSchoolUrl";
import { useRouter } from "next/navigation";
import { usePrefetchSchoolDetails } from "@/app/hooks/usePrefetchSchoolDetails";
import { subcategoriaToCursoSlug } from "@/lib/courseMap";

function slugify(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

export default function SchoolSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefetchSchool = usePrefetchSchoolDetails();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading } = useSchoolSearch({ q: debouncedQuery });
  const schools = data?.results || [];
  const courses = schools.flatMap((school: any) =>
    (school.cursos || []).map((curso: any) => ({
      ...curso,
      id: school.id,
      escuela: school.name,
      ciudad: school.city,
      logo: school.logo,
      slug: school.slug,
      slugCurso: curso.slug,
    }))
  );

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
        document.body.style.overflow = "hidden";
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => (i + 1) % Math.max(1, courses.length));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex(
          (i) =>
            (i - 1 + Math.max(1, courses.length)) % Math.max(1, courses.length)
        );
      }
      if (e.key === "Enter") {
        const course = courses[highlightIndex];
        if (course?.courseseo) {
          const href = buildSeoSchoolUrlFromSeoEntry(
            course.id,
            course.courseseo,
            {
              semanas: 1,
              ciudad: course.ciudad,
              horario: course.horario,
            }
          );
          window.location.href = href;
          setOpen(false);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [courses, open, highlightIndex]);


  const handleShowSchool = (curso: any) => {
    const schoolId = curso.id || curso._id;
    if (!schoolId) return;
  
    const courseSlug = subcategoriaToCursoSlug[curso.courseseo?.subcategoria] ?? "";
    const weeks = 1;
    const city = curso.ciudad ?? "Dublín";
    const schedule = curso.horario ?? "PM";
  
    const seoEntry = curso.courseseo;
    if (!seoEntry?.url) return;
  
    const fullUrl = buildSeoSchoolUrlFromSeoEntry(seoEntry, schoolId.toString(), {
      schoolId: schoolId.toString(),
      curso: courseSlug,
      semanas: weeks,
      ciudad: city,
      horario: schedule,
    });
  
    prefetchSchool(schoolId.toString());
    setTimeout(() => router.push(fullUrl), 50);
    setOpen(false);
  };
  
  

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="text-sm px-3 py-1.5 text-white border bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:border-[#5272FC] hover:text-white transition-colors"
        aria-label="Buscar escuela"
      >
        <Search className="w-5 h-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl p-0 overflow-hidden shadow-xl rounded-lg"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          onInteractOutside={(e) => {
            const isScrollbarClick = (
              e.target as HTMLElement
            ).classList.contains("scrollbar");
            if (isScrollbarClick) e.preventDefault();
          }}
        >
          <DialogHeader className="p-4 border-b">
            <VisuallyHidden>
              <DialogTitle>Buscar escuela</DialogTitle>
            </VisuallyHidden>

            <div className="relative w-full max-w-[602px] mx-auto">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                ref={inputRef}
                placeholder="Buscar escuela..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlightIndex(0);
                }}
                className="pl-10 pr-10 py-2 text-base"
                aria-autocomplete="list"
                aria-controls="search-results"
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setQuery("");
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </DialogHeader>

          <div className="p-4 max-h-[60vh] overflow-y-auto" id="search-results">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-8"
                >
                  <Loader2 className="animate-spin text-gray-400" size={24} />
                </motion.div>
              ) : query && courses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 text-gray-500"
                >
                  No encontramos resultados para "{query}"
                  <p className="text-sm mt-2">
                    Prueba con otros términos de búsqueda
                  </p>
                </motion.div>
              ) : !query ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8"
                >
                  <div className="text-center text-gray-500 mb-4">
                    Escribe para buscar escuelas y cursos
                  </div>
                  <div className="grid grid-cols-1 gap-4">

                    <div className="p-3 border rounded-lg">
                      <h3 className="font-medium mb-2">Atajos</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Abrir búsqueda</span>
                          <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">
                            ⌘K
                          </kbd>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Navegar resultados</span>
                          <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">
                            ↑↓
                          </kbd>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {courses.map((c: any, i: number) => (
                    <motion.div
                      key={`${c.nombre}-${i}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.1, delay: i * 0.03 }}
                      onClick={() => handleShowSchool(c)}
                      onMouseEnter={() => setHighlightIndex(i)}
                      className={`cursor-pointer border rounded-md p-6 transition-all flex items-center gap-4 hover:bg-gray-50 ${
                        i === highlightIndex
                          ? "bg-blue-50 border-blue-500"
                          : "border-gray-200"
                      }`}
                      role="option"
                      aria-selected={i === highlightIndex}
                    >
                      {c.logo && (
                        <Image
                          src={rewriteToCDN(c.logo)}
                          alt={c.escuela}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {c.escuela}
                        </p>
                        <p className="text-sm text-gray-600 font-semibold">
                          {c.nombre}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          {c.ciudad} —
                          {c.oferta && Number(c.oferta) > 0 ? (
                            <>
                              <span className="text-green-700 font-semibold">
                                {new Intl.NumberFormat("en-IE", {
                                  style: "currency",
                                  currency: "EUR",
                                  minimumFractionDigits: 0,
                                }).format(Number(c.oferta))}
                              </span>
                              <span className="line-through text-gray-400">
                                {new Intl.NumberFormat("en-IE", {
                                  style: "currency",
                                  currency: "EUR",
                                  minimumFractionDigits: 0,
                                }).format(Number(c.precio))}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                                Oferta
                              </span>
                            </>
                          ) : (
                            <>
                              Desde{" "}
                              {new Intl.NumberFormat("en-IE", {
                                style: "currency",
                                currency: "EUR",
                                minimumFractionDigits: 0,
                              }).format(Number(c.precio))}
                            </>
                          )}
                          <span className="ml-1">({c.horario})</span>
                        </p>
                      </div>
                      {i === highlightIndex && (
                        <Check className="text-blue-600" size={18} />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
