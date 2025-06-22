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
export function parseCoursesFromApi(labels: string[]): CourseKey[] {
  return labels
    .map(label => courseLabelToIdMap[label])
    .filter((courseId): courseId is CourseKey => Boolean(courseId));
}
