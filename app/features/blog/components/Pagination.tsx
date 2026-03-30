"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  pages: number;
  basePath?: string;
};

export default function Pagination({ page, pages, basePath }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentBasePath = basePath || pathname;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${currentBasePath}?${params.toString()}`);
  };

  // Generar array de páginas a mostrar
  const getPageNumbers = () => {
    const delta = 1; // páginas a mostrar a cada lado de la actual
    const range: (number | string)[] = [];
    
    for (let i = 1; i <= pages; i++) {
      if (
        i === 1 || 
        i === pages || 
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  if (pages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Paginación">
      {/* Botón Anterior */}
      <button
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum, idx) => (
          pageNum === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => changePage(pageNum as number)}
              className={`min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                page === pageNum
                  ? "bg-[#5175FE] text-white shadow-sm"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
              aria-label={`Ir a página ${pageNum}`}
              aria-current={page === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          )
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        disabled={page >= pages}
        onClick={() => changePage(page + 1)}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        aria-label="Página siguiente"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}