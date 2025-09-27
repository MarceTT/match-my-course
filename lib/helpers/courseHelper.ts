/**
 * Enum opcional para usar en lógica interna
 */
export enum CourseKey {
  GENERAL = "ingles-general",
  GENERAL_PLUS = "ingles-general-mas-sesiones-individuales",
  INTENSIVE = "ingles-general-intensivo",
  BUSINESS = "ingles-general-orientado-a-negocios",
  WORK_AND_STUDY = "ingles-visa-de-trabajo",
}

export function isValidCourse(value: string | undefined): value is CourseKey {
  return value !== undefined && Object.values(CourseKey).includes(value as CourseKey);
}

export const courseLabelToIdMap: Record<string, CourseKey> = {
  "Inglés general": CourseKey.GENERAL,
  "Inglés general más sesiones individuales": CourseKey.GENERAL_PLUS,
  "Inglés general intensivo": CourseKey.INTENSIVE,
  "Inglés general orientado a negocios": CourseKey.BUSINESS,
  "Programa de estudios y trabajo (25 semenas)": CourseKey.WORK_AND_STUDY,
  // Sinónimos frecuentes desde backend/SEO
  "Inglés General": CourseKey.GENERAL,
  "Inglés General + Sesiones Individuales": CourseKey.GENERAL_PLUS,
  "Inglés General Intensivo": CourseKey.INTENSIVE,
  "Inglés de Negocios": CourseKey.BUSINESS,
  "Programa Estudio y Trabajo (25 semanas)": CourseKey.WORK_AND_STUDY,
  "Inglés general más trabajo (6 meses)": CourseKey.WORK_AND_STUDY,
};

export const courseToLabelMap: Record<CourseKey, string> = Object.fromEntries(
  Object.entries(courseLabelToIdMap).map(([label, id]) => [id, label])
) as Record<CourseKey, string>;

interface CourseMetadata {
  minDuration: number; // en semanas
  scheduleOptions: ("AM" | "PM")[];
  mode: "presencial" | "online" | "híbrido";
}

export const courseMetadataMap: Record<CourseKey, CourseMetadata> = {
  [CourseKey.GENERAL]: {
    minDuration: 1,
    scheduleOptions: ["AM", "PM"],
    mode: "presencial",
  },
  [CourseKey.GENERAL_PLUS]: {
    minDuration: 2,
    scheduleOptions: ["AM"],
    mode: "presencial",
  },
  [CourseKey.INTENSIVE]: {
    minDuration: 4,
    scheduleOptions: ["AM", "PM"],
    mode: "híbrido",
  },
  [CourseKey.BUSINESS]: {
    minDuration: 6,
    scheduleOptions: ["PM"],
    mode: "online",
  },
  [CourseKey.WORK_AND_STUDY]: {
    minDuration: 25,
    scheduleOptions: ["AM", "PM"],
    mode: "presencial",
  },
};

/**
 * Utilidad para transformar los nombres de curso que llegan del backend (string[])
 * al enum Course[] para lógica interna en el frontend.
 */
function toStringArray(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((v) => String(v));
  if (typeof input === "string") return input.split(",").map((s) => s.trim()).filter(Boolean);
  if (typeof input === "object") return Object.values(input as Record<string, unknown>).map((v) => String(v));
  return [];
}

function slugifyLabel(label: string): string {
  const s = label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar acentos
    .toLowerCase()
    .replace(/\+/g, ' mas ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s;
}

export function parseCoursesFromApi(labels: unknown): CourseKey[] {
  const arr = toStringArray(labels);
  const slugSynonyms: Record<string, CourseKey> = {
    // Sinónimos a slug del enum
    'programa-estudio-y-trabajo-25-semanas': CourseKey.WORK_AND_STUDY,
    'ingles-general-mas-trabajo-6-meses': CourseKey.WORK_AND_STUDY,
  };
  const result: CourseKey[] = [];
  for (const label of arr) {
    let id = courseLabelToIdMap[label];
    if (!id) {
      const slug = slugifyLabel(label);
      const matchExact = Object.values(CourseKey).find((ck) => ck === slug);
      if (matchExact) id = matchExact as CourseKey;
      else if (slugSynonyms[slug]) id = slugSynonyms[slug];
    }
    if (id && !result.includes(id)) result.push(id);
  }
  return result;
}
