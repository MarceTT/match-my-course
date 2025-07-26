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
import { sendGTMEvent } from "@/app/lib/gtm";

function slugify(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
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
  const [scrollY, setScrollY] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefetchSchool = usePrefetchSchoolDetails();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
      if (query.trim()) {
        sendGTMEvent("school_search_query", {
          search_term: query.trim(),
          result_count: schools.length,
        });
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading } = useSchoolSearch({ q: debouncedQuery });
  const schools = data?.results || [];
  const courses = schools.flatMap((school: any) =>
    (school.cursos || [])
      .map((curso: any) => {
        const precio = Number(curso.precio?.precioBase);
        const oferta = Number(curso.precio?.precioOferta);
        const precioValido = !isNaN(precio) && precio > 0;
        const ofertaValida = !isNaN(oferta) && oferta > 0;

        return precioValido || ofertaValida
          ? {
              ...curso,
              id: school._id,
              escuela: school.name,
              ciudad: school.city,
              logo: school.logo,
              slug: school.slug ?? slugify(school.name),
              slugCurso: curso.slug,
              precio: precioValido ? precio : null,
              oferta: ofertaValida ? oferta : null,
              courseseo: curso.seo ?? null,
            }
          : null;
      })
      .filter(Boolean)
  );

  useEffect(() => {
    if (open) {
      sendGTMEvent("school_search_opened", {
        timestamp: new Date().toISOString(),
      });
      const last = localStorage.getItem("selected_course");
      if (last) {
        const { query: lastQuery, scroll } = JSON.parse(last);
        setQuery(lastQuery);
        setDebouncedQuery(lastQuery);
        setTimeout(() => {
          if (scrollRef.current && scroll) {
            scrollRef.current.scrollTop = scroll;
          }
        }, 200);
      }

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
          (i) => (i - 1 + Math.max(1, courses.length)) % Math.max(1, courses.length)
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

    sendGTMEvent("school_selected", {
      school_id: schoolId,
      school_name: curso.escuela,
      course_name: curso.nombre,
      city,
      price: curso.oferta ?? curso.precio ?? null,
    });

    localStorage.setItem("selected_course", JSON.stringify({
      id: schoolId,
      slug: curso.slug ?? slugify(curso.nombre),
      query: curso.escuela,
      scroll: scrollRef.current?.scrollTop ?? 0
    }));

    const fullUrl = buildSeoSchoolUrlFromSeoEntry(seoEntry, schoolId.toString(), {
      schoolId: schoolId.toString(),
      curso: courseSlug,
      semanas: weeks,
      ciudad: city,
      horario: schedule,
    });

    prefetchSchool(schoolId.toString());
    setTimeout(() => router.push(fullUrl), 10);
    setOpen(false);
  };

  const selectedCourse = JSON.parse(
    typeof window !== "undefined" ? localStorage.getItem("selected_course") || "{}" : "{}"
  );

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
            const isScrollbarClick = (e.target as HTMLElement).classList.contains("scrollbar");
            if (isScrollbarClick) e.preventDefault();
          }}
        >
          <DialogHeader className="p-4 border-b">
            <VisuallyHidden>
              <DialogTitle>Buscar escuela</DialogTitle>
            </VisuallyHidden>

            <div className="relative w-full max-w-[602px] mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
                    localStorage.removeItem("selected_course");
                    localStorage.removeItem("search_scroll");
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </DialogHeader>

          <div ref={scrollRef} className="p-4 max-h-[60vh] overflow-y-auto" id="search-results">
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
                  <p className="text-sm mt-2">Prueba con otros términos de búsqueda</p>
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
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {courses.map((c: any, i: number) => {
                    const isSelected = selectedCourse?.id === c.id && selectedCourse?.slug === c.slug;
                    return (
                      <motion.div
                        key={`${c.nombre}-${i}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, delay: i * 0.03 }}
                        onClick={() => handleShowSchool(c)}
                        onMouseEnter={() => setHighlightIndex(i)}
                        className={`cursor-pointer border rounded-md p-6 transition-all flex items-center gap-4 hover:bg-gray-50 ${
                          isSelected
                            ? "bg-blue-100 border-blue-400"
                            : i === highlightIndex
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
                          <p className="text-sm font-semibold text-gray-800">{c.escuela}</p>
                          <p className="text-sm text-gray-600 font-semibold">{c.nombre}</p>
                          {c.precio && (
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                              {c.ciudad} —
                              {c.oferta ? (
                                <>
                                  <span className="text-green-700 font-semibold">
                                    {new Intl.NumberFormat("en-IE", {
                                      style: "currency",
                                      currency: "EUR",
                                      minimumFractionDigits: 0,
                                    }).format(c.oferta)}
                                  </span>
                                  <span className="line-through text-gray-400">
                                    {new Intl.NumberFormat("en-IE", {
                                      style: "currency",
                                      currency: "EUR",
                                      minimumFractionDigits: 0,
                                    }).format(c.precio)}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                                    Oferta
                                  </span>
                                </>
                              ) : (
                                <>Desde {new Intl.NumberFormat("en-IE", {
                                  style: "currency",
                                  currency: "EUR",
                                  minimumFractionDigits: 0,
                                }).format(c.precio)}</>
                              )}
                              <span className="ml-1">({c.horario})</span>
                            </p>
                          )}
                        </div>
                        {i === highlightIndex && <Check className="text-blue-600" size={18} />}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
