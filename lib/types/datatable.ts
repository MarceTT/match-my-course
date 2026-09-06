// Non-school shared types migrated out of the former lib/types.ts file.
// Moving these into the lib/types/ directory lets @/lib/types resolve to the
// barrel (lib/types/index.ts) instead of being shadowed by a sibling file
// under moduleResolution: "bundler". See change: unify-school-details-type (PR2).

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export interface Price {
  _id: string;
  schoolId: string;
  nombreEscuelaAdm: string;
  ciudadEscuela: string;
  descripcionCurso: string;
  inicioClases: string;
  duracion: string;
  requisitoEntrada: string;
  horarios: {
    inicio: string;
    termino: string;
    horasSemana: number;
    lessonsPerWeek?: number;
    horario?: string;
    minutesPerLesson?: number;
    dias?: string;
    precio: string;
    oferta?: string;
    matricula?: string;
    material?: string;
    seguro?: string;
  };
  examenes: Record<string, string>;
}

export interface SchoolCardData {
  _id: string;
  name: string;
  city: string;
  logo: string;
  status: boolean;
  rating?: number;
  age?: number;
  price?: number;
  image?: string;
}

export type GalleryImage = {
  id?: string;
  file?: File;
  url: string;
  isNew?: boolean;
};

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  details: string;
  acceptTerms: boolean;
  acceptPolicy: boolean;
  nationality: string;
  country: string;
};
