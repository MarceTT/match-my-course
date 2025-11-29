"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cursoSlugToSubcategoria } from "@/lib/courseMap";

interface SchoolBreadcrumbProps {
  slugCurso: string;
  schoolName: string;
}

export default function SchoolBreadcrumb({
  slugCurso,
  schoolName,
}: SchoolBreadcrumbProps) {
  const courseCategory = cursoSlugToSubcategoria[slugCurso] || "Cursos";

  return (
    <nav
      className="bg-white border-b border-gray-200 py-3 mb-8"
      aria-label="breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {/* Home */}
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
              title="Ir a página de inicio"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
          </li>

          {/* Separator */}
          <li className="text-gray-400" aria-hidden="true">
            <ChevronRight className="w-4 h-4" />
          </li>

          {/* Course Category */}
          <li>
            <Link
              href={`/school-search?course=${slugCurso}`}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
              title={`Ver todos los ${courseCategory.toLowerCase()}`}
            >
              {courseCategory}
            </Link>
          </li>

          {/* Separator */}
          <li className="text-gray-400" aria-hidden="true">
            <ChevronRight className="w-4 h-4" />
          </li>

          {/* Current Page - School Name */}
          <li
            className="text-gray-700 font-medium truncate max-w-xs sm:max-w-none"
            aria-current="page"
            title={schoolName}
          >
            {schoolName}
          </li>
        </ol>
      </div>
    </nav>
  );
}
