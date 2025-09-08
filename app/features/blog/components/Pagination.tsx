"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page, pages }: { page: number; pages: number }) {
  const router = useRouter();
  const params = new URLSearchParams(useSearchParams());

  const changePage = (newPage: number) => {
    params.set("page", newPage.toString());
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="px-4 py-2">Página {page} de {pages}</span>
      <button
        disabled={page >= pages}
        onClick={() => changePage(page + 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}