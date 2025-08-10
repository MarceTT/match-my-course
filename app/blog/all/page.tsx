"use client";

import { usePosts } from "@/app/hooks/blog/useGetPosts";
import PostCard from "@/app/components/blog/PostCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Filter,
  Grid,
  List,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import Link from "next/link";
import FullScreenLoader from "@/app/admin/components/FullScreenLoader";
import { useRouter } from "next/navigation";

const AllPost = () => {
  const router = useRouter();
  const { data, isLoading, isError } = usePosts(); // Trae hasta 100 posts
  const allPosts = data?.posts || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = Array.from(
    new Set(allPosts.map((p) => p.category?.name).filter(Boolean))
  );
  const allTags = Array.from(
    new Set(allPosts.flatMap((p) => p.tags?.map((t) => t.name)).filter(Boolean))
  );

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || post.category?.name === selectedCategory;
      const matchesTag =
        selectedTag === "all" || post.tags?.some((t) => t.name === selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    });

    filtered.sort((a, b) => {
      const aDate = new Date(a.publishedAt || 0).getTime();
      const bDate = new Date(b.publishedAt || 0).getTime();
      switch (sortBy) {
        case "date-desc":
          return bDate - aDate;
        case "date-asc":
          return aDate - bDate;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allPosts, searchTerm, selectedCategory, selectedTag, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredAndSortedPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTag("all");
    setSortBy("date-desc");
    setCurrentPage(1);
  };

  const readTime = (words: number) => {
    if (!words) return "0 min";
    const readingSpeed = 200; // Palabras por minuto
    const minutes = Math.ceil(words / readingSpeed);
    return `${minutes} min`;
  };

  if (isLoading) return <FullScreenLoader isLoading={isLoading} />;
  if (isError)
    return <p className="text-center py-10">Error al cargar el blog</p>;

  return (
    <>
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Volver */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.push("/blog")}
              className="w-full md:w-fit justify-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 md:w-4 md:h-4" /> Volver atrás
            </Button>
          </div>

          {/* Buscador + Filtros */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6">
            {/* Search (altura y self-center en desktop) */}
            <div className="relative w-full md:w-[420px] lg:w-[520px] md:self-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full h-10"
                aria-label="Buscar artículos"
              />
            </div>

            {/* Filtros (sin wrap en desktop y alturas iguales) */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center md:flex-nowrap md:justify-end gap-3">
              {/* Categoría */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-10 w-full sm:w-48 md:w-44">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat ?? ""}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tag */}
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="h-10 w-full sm:w-40 md:w-36">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag ?? ""}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Orden */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 w-full sm:w-48 md:w-44">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Más recientes</SelectItem>
                  <SelectItem value="date-asc">Más antiguos</SelectItem>
                  <SelectItem value="title-asc">Título A-Z</SelectItem>
                  <SelectItem value="title-desc">Título Z-A</SelectItem>
                </SelectContent>
              </Select>

              {/* Vista */}
              <div className="w-max inline-flex h-10 border rounded-lg overflow-hidden shrink-0 self-center md:self-auto">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-10 px-3 rounded-none w-auto flex-none"
                  aria-label="Vista en cuadrícula"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-10 px-3 rounded-none w-auto flex-none"
                  aria-label="Vista en lista"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chips de filtros activos */}
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Búsqueda: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Categoría: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedTag !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Tag: {selectedTag}
                <button
                  onClick={() => setSelectedTag("all")}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            )}
            {(searchTerm ||
              selectedCategory !== "all" ||
              selectedTag !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Contador de resultados */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Mostrando {paginatedPosts.length} de{" "}
                {filteredAndSortedPosts.length} artículos
              </p>
            </div>
            {/* Posts */}
            {paginatedPosts.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {paginatedPosts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 mb-12">
                    {paginatedPosts.map((post) => (
                      <div
                        key={post.slug}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          <img
                            src={rewriteToCDN(post.coverImage || "")}
                            alt={post.title}
                            className="
                              w-full aspect-[16/9] object-cover rounded-lg
                              sm:w-48 sm:h-48 sm:aspect-auto
                              flex-shrink-0
                            "
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="default">
                                {post.category?.name}
                              </Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {post.publishedAt &&
                                  new Date(post.publishedAt).toLocaleDateString(
                                    "es-ES",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {readTime(post.excerpt?.length || 0)}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
                              <Link href={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-muted-foreground mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-1">
                              {post.tags?.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag.slug}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag.name}
                                </Badge>
                              ))}
                              {post.tags?.length !== undefined &&
                                post.tags?.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags?.length - 3}
                                  </Badge>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Paginación */}
                {/* {totalPages > 1 && (
                  <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )} */}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Filter className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No se encontraron artículos
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    No hay artículos que coincidan con tus filtros actuales.
                  </p>
                  <Button onClick={clearFilters}>Limpiar filtros</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllPost;
