export interface FilterOption {
  id: string;
  label: string;
  exclusiveGroup?: string;
  lockWeeks?: number;
}

export interface FilterConfig {
  label: string;
  options?: FilterOption[];
  type?: "checkbox" | "slider";
  slider?: {
    min: number;
    max: number;
    step: number;
    default: number | [number, number];
  };
}

// Normaliza general (sin guiones)
const normalize = (str: string, toLower = true) => {
  const normalized = str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\+/g, "-")
    .replace(/--+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

  return toLower ? normalized.toLowerCase() : normalized;
};

// Normaliza para url con guiones
const normalizeUrl = (str: string) =>
  str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\(.*?\)/g, "")
    .replace(/\+/g, "-")
    .replace(/--+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

const filtersConfig: Record<string, FilterConfig> = {
  course: {
    label: "Tipo de curso",
    options: [
      { label: "Inglés general", exclusiveGroup: "general" },
      { label: "Inglés general más sesiones individuales", exclusiveGroup: "general" },
      { label: "Inglés general intensivo", exclusiveGroup: "general" },
      { label: "Inglés general orientado a negocios", exclusiveGroup: "business-or-work" },
      { label: "Inglés + visa de trabajo (6 meses)", exclusiveGroup: "business-or-work", lockWeeks: 25 },
    ].map((opt) => ({
      id: normalizeUrl(opt.label),  // SOLO aquí usamos normalizeUrl
      ...opt,
    })),
  },

  cities: {
    label: "Ciudad",
    options: ["Dublín", "Cork", "Galway", "Limerick", "Todos"].map((label) => ({
      id: normalize(label),
      label,
    })),
  },

  weeks: {
    type: "slider",
    label: "Semanas a estudiar",
    slider: {
      min: 1,
      max: 36,
      step: 1,
      default: 1, // Solo un valor: weeksMin
    }
  },

  // type: {
  //   label: "Tipo de Curso",
  //   options: ["AM", "PM"].map((label) => ({
  //     id: normalize(label, false),
  //     label,
  //   })),
  // },

  // hours: {
  //   label: "Horas de Clases",
  //   options: ["15", "18", "20"].map((label) => ({
  //     id: normalize(label),
  //     label,
  //   })),
  // },

  // accreditation: {
  //   label: "Acreditación Educacional",
  //   options: ["Eaquals", "IALC", "ACELS"].map((label) => ({
  //     id: normalize(label),
  //     label,
  //   })),
  // },

  // certification: {
  //   label: "Certificación",
  //   options: [
  //     "Quality English",
  //     "English Education Ireland",
  //     "Select Ireland",
  //   ].map((label) => ({
  //     id: normalize(label),
  //     label,
  //   })),
  // },

  offers: {
    label: "Cursos en oferta",
    options: [
      {
        id: normalize("Ver promociones"),
        label: "Ver promociones",
      },
    ],
  },
};

export default filtersConfig;
