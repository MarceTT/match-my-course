export const cursoSlugToSubcategoria: Record<string, string> = {
  "ingles-general": "Inglés General",
  "ingles-general-mas-sesiones-individuales": "Inglés General + Sesiones Individuales",
  "ingles-general-intensivo": "Inglés General Intensivo",
  "ingles-general-orientado-a-negocios": "Inglés de Negocios",
  "ingles-visa-de-trabajo": "Programa Estudio y Trabajo (25 semanas)",
};
export const subcategoriaToCursoSlug: Record<string, string> = Object.fromEntries(
  Object.entries(cursoSlugToSubcategoria).map(([slug, subcat]) => [subcat, slug])
);
