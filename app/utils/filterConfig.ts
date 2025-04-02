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
  
  const filtersConfig: Record<string, FilterConfig> = {
    course: {
      label: "Tipo de curso",
      options: [
        { id: "ingles-general", label: "Inglés general" },
        { id: "ingles-general-mas-sesiones-individuales", label: "Inglés general más sesiones individuales" },
        { id: "ingles-general-intensivo", label: "Inglés general intensivo" },
        { id: "ingles-general-orientado-a-negocios", label: "Inglés general orientado a negocios" },
        { id: "ingles-vista-de-trabajo", label: "Inglés + visa de trabajo" },
      ],
    },
    cities: {
      label: "Ciudad",
      options: [
        { id: "dublin", label: "Dublín" },
        { id: "cork", label: "Cork" },
        { id: "galway", label: "Galway" },
        { id: "limerick", label: "Limerick" },
        { id: "todos", label: "Todos" },
      ],
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
        { id: "am", label: "Por las mañanas AM" },
        { id: "pm", label: "Por la tardes PM" },
      ],
    },
    hours: {
      label: "Horas de Clases",
      options: [
        { id: "15-horas", label: "15 Horas" },
        { id: "18-horas", label: "18 Horas" },
        { id: "20-horas", label: "20 Horas" },
      ],
    },
    accreditation: {
      label: "Acreditación Educacional",
      options: [
        { id: "equals", label: "Eaquals" },
        { id: "ialc", label: "IALC" },
        { id: "acels", label: "ACELS" },
      ],
    },
    certification: {
      label: "Certificación",
      options: [
        { id: "quality-english", label: "Quality English" },
        { id: "english-education-ireland", label: "English Education Ireland" },
        { id: "select-ireland", label: "Select Ireland" },
      ],
    },
  };
  
  export default filtersConfig;
  