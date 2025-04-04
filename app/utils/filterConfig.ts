export interface FilterOption {
    id: string;
    label: string;
  }
  
  export interface FilterConfig {
    label: string;
    options?: FilterOption[];
    type?: "checkbox" | "slider";
    slider?: {
      min: number;
      max: number;
      step: number;
      default: number;
    };
  }
  
  const normalize = (str: string) =>
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
        "Inglés general",
        "Inglés general más sesiones individuales",
        "Inglés general intensivo",
        "Inglés general orientado a negocios",
        "Inglés + visa de trabajo (6 meses)",
      ].map((label) => ({
        id: normalize(label),
        label,
      })),
    },
    cities: {
      label: "Ciudad",
      options: [
        "Dublín",
        "Cork",
        "Galway",
        "Limerick",
        "Todos",
      ].map((label) => ({
        id: normalize(label),
        label,
      })),
    },
    weeks: {
      label: "Semanas a estudiar",
      type: "slider",
      slider: {
        min: 1,
        max: 52,
        step: 1,
        default: 0,
      },
    },
    type: {
      label: "Tipo de Curso",
      options: [
        "Por las mañanas AM",
        "Por la tardes PM",
      ].map((label) => ({
        id: normalize(label),
        label,
      })),
    },
    hours: {
      label: "Horas de Clases",
      options: [
        "15 Horas",
        "18 Horas",
        "20 Horas",
      ].map((label) => ({
        id: normalize(label),
        label,
      })),
    },
    accreditation: {
      label: "Acreditación Educacional",
      options: [
        "Eaquals",
        "IALC",
        "ACELS",
      ].map((label) => ({
        id: normalize(label),
        label,
      })),
    },
    certification: {
      label: "Certificación",
      options: [
        "Quality English",
        "English Education Ireland",
        "Select Ireland",
      ].map((label) => ({
        id: normalize(label),
        label,
      })),
    },
  };
  
  export default filtersConfig;
  