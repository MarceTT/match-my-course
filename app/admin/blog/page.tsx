"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FullScreenLoader from "../components/FullScreenLoader";

type Post = {
  _id: string;
  title: string;
  slug: string;
  category?: { name?: string; _id?: string } | string | null;
  author?: { name?: string; _id?: string } | string | null;
  createdAt?: string;
  updatedAt?: string;
};

async function fetchAdminPosts(): Promise<Post[]> {
  const { data } = await axiosInstance.get("/blog/post");
  return data.data.posts as Post[];
}

export default function AdminPostsPage() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchAdminPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/blog/post/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  // ---- Estado de tabla ----
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const normalize = (val?: unknown) =>
    (typeof val === "string" ? val : (val as any)?.name || "")
      .toString()
      .toLowerCase();

  const filtered = useMemo(() => {
    if (!posts) return [];
    if (!debouncedSearch) return posts;
    return posts.filter((p) => {
      const title = (p.title ?? "").toLowerCase();
      const slug = (p.slug ?? "").toLowerCase();
      const cat = normalize(p.category);
      const author = normalize(p.author);
      return (
        title.includes(debouncedSearch) ||
        slug.includes(debouncedSearch) ||
        cat.includes(debouncedSearch) ||
        author.includes(debouncedSearch)
      );
    });
  }, [posts, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, pageSize]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, pageCount);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("es-ES") : "—";

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;

  return (
    <div className="w-full p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Buscar por título, slug, categoría o autor…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[320px]"
          />
          <Button asChild>
            <Link href="/admin/blog/create">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Post
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Controles superiores */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium">{paged.length}</span> de{" "}
              <span className="font-medium">{total}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Filas por página:</span>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => setPageSize(Number(v))}
              >
                <SelectTrigger className="w-[90px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50, 100].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[260px]">Título</TableHead>
                  <TableHead className="min-w-[180px]">Slug</TableHead>
                  <TableHead className="min-w-[160px]">Categoría</TableHead>
                  <TableHead className="min-w-[160px]">Autor</TableHead>
                  <TableHead className="min-w-[120px]">Creado</TableHead>
                  <TableHead className="w-[140px] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No se encontraron resultados.
                    </TableCell>
                  </TableRow>
                ) : (
                  paged.map((post) => (
                    <TableRow key={post._id}>
                      <TableCell className="font-medium">
                        <div className="line-clamp-1">{post.title}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="line-clamp-1">{post.slug}</div>
                      </TableCell>
                      <TableCell>
                        {typeof post.category === "string"
                          ? post.category
                          : post.category?.name || "—"}
                      </TableCell>
                      <TableCell>
                        {typeof post.author === "string"
                          ? post.author
                          : post.author?.name || "—"}
                      </TableCell>
                      <TableCell>{formatDate(post.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" asChild size="sm">
                            <Link href={`/admin/blog/${post._id}`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMutation.mutate(post._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginación inferior */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm">
              Página <span className="font-medium">{currentPage}</span> de{" "}
              <span className="font-medium">{pageCount}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={currentPage === pageCount}
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
