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

// Legacy (v1) school-domain declarations removed. Canonical types live in
// lib/types/school.ts; re-exported here (type-only) for any residual importer.
export type {
  SchoolDetails,
  Installations,
  Qualities,
  Nationalities,
  SchoolAccommodation,
  AccomodationDetail,
  SchoolDescription,
  SchoolPriceOption,
  SchoolDetailsResponse,
  SchoolDetailsSearchResponse,
} from "@/lib/types/school";

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

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      accessToken: string;
    };
  }

  interface User {
    accessToken: string;
    refreshToken?: string;
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}

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
