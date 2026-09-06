import { Reservation } from "@/types";

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

// School-domain types now live canonically in lib/types/school.ts.
// Re-exported here (type-only) so existing consumers of this path keep resolving.
export type {
  SchoolDetails,
  Installations,
  Qualities,
  Nationalities,
  SchoolAccommodation,
  AccomodationDetail,
  SchoolDescription,
  SchoolPriceOption,
  CursoSeo,
  CountryMetadata,
  SchoolDetailsResponse,
  SchoolDetailsSearchResponse,
} from "@/lib/types/school";

export interface BookingResponse {
  requiresAdvisor?: boolean;
  canBookInstantly?: boolean;
  countryCode?: string;
  advisorContact?: {
    email: string;
    advisorName: string;
  };
  message?: string;
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

export type BookingPannelProps = {
  reservation: Reservation | null;
  error: string;
  loading: boolean;
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
