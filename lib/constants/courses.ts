// lib/constants/courses.ts

/**
 * Enum opcional para usar en lógica interna
 */
export enum Course {
  GENERAL = "ingles-general",
  GENERAL_PLUS = "ingles-general-mas-sesiones-individuales",
  INTENSIVE = "ingles-general-intensivo",
  BUSINESS = "ingles-general-orientado-a-negocios",
  WORK_AND_STUDY = "ingles-visa-de-trabajo",
}

export const courseLabelToIdMap: Record<string, Course> = {
  "Inglés general": Course.GENERAL,
  "Inglés general más sesiones individuales": Course.GENERAL_PLUS,
  "Inglés general intensivo": Course.INTENSIVE,
  "Inglés general orientado a negocios": Course.BUSINESS,
  "Programa de estudios y trabajo (25 semenas)": Course.WORK_AND_STUDY,
};

export const courseToLabelMap: Record<Course, string> = Object.fromEntries(
  Object.entries(courseLabelToIdMap).map(([label, id]) => [id, label])
) as Record<Course, string>;

interface CourseMetadata {
  minDuration: number; // en semanas
  scheduleOptions: ("AM" | "PM")[];
  mode: "presencial" | "online" | "híbrido";
}

export const courseMetadataMap: Record<Course, CourseMetadata> = {
  [Course.GENERAL]: {
    minDuration: 1,
    scheduleOptions: ["AM", "PM"],
    mode: "presencial",
  },
  [Course.GENERAL_PLUS]: {
    minDuration: 2,
    scheduleOptions: ["AM"],
    mode: "presencial",
  },
  [Course.INTENSIVE]: {
    minDuration: 4,
    scheduleOptions: ["AM", "PM"],
    mode: "híbrido",
  },
  [Course.BUSINESS]: {
    minDuration: 6,
    scheduleOptions: ["PM"],
    mode: "online",
  },
  [Course.WORK_AND_STUDY]: {
    minDuration: 25,
    scheduleOptions: ["AM", "PM"],
    mode: "presencial",
  },
};
