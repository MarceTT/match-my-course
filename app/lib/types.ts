import { ReactNode } from "react";

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

export interface SchoolDetailsResponse {
  message: string;
  data: {
    school: SchoolDetails;
  };
}

export interface SchoolDetailsSearchResponse {
  message: string;
  data: {
    schools: SchoolDetails[];
  };
}

export interface SchoolDetails {
  _id: string;
  name: string;
  city: string;
  logo?: string;
  mainImage?: string | null;
  galleryImages: string[];
  status: boolean;
  installations?: Installations;
  qualities?: Qualities;
  nationalities?: Nationalities;
  prices: SchoolPriceOption[];
  description?: SchoolDescription;
  accommodation?: SchoolAccommodation[];
  accomodationDetail?: AccomodationDetail[];
  lowestPrice?: number | null;
  bestPrice?: number | null;
  bestOffer?: number | null;
  originalPrice?: number | null;
  selectedPrice?: number | null;
  hasOffer?: boolean;
  priceSource?: string;
}

export interface Installations {
  _id: string;
  schoolId: string;
  nombreEscuela: string;
  ciudadEscuela: string;
  biblioteca: boolean;
  laboratorioInformatica: boolean;
  areasAutoaprendizaje: boolean;
  tv: string;
  pizarraDigital: string;
  calefaccion: string;
  cafeteria: boolean;
  restaurante: boolean;
  cocinaEstudiantes: boolean;
  salaJuegosRecreacion: boolean;
  jardin: boolean;
  terrazaAzotea: boolean;
  salon: boolean;
  zonaDeportiva: boolean;
  microondas: boolean;
  nevera: boolean;
  maquinaExpendedora: boolean;
  dispensadorAgua: boolean;
  impresoraFotocopiadora: boolean;
  freeWifi: boolean;
  accesoSillasRuedas: boolean;
  wcMinusvalidos: boolean;
  elevators: boolean;
  patrimoniales: boolean;
  disenoImponente: boolean;
  clasicosTradicionales: boolean;
  modernosContemporaneos: boolean;
  aulas: number;
}

export interface Qualities {
  _id: string;
  schoolId: string;
  schoolName: string;
  city: string;
  trayectoria: number;
  ponderado: number | string;
  certifications: Record<string, boolean>;
  accreditations: Record<string, string>;
}

export interface Nationalities {
  _id: string;
  schoolId: string;
  nombreEscuelaAdm: string;
  ciudadEscuela: string;
  edadPromedio: number;
  nacionalidades: Record<string, number>;
  total: number;
  nacionalidadesAnio: number;
  continentes: {
    europa: number;
    asia: number;
    latinoamerica: number;
    africa: number;
    otros: number;
  };
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

export interface SchoolAccommodation {
  _id: string;
  schoolId: string;
  schoolName: string;
  city: string;
  hostFamily: boolean;
  accommodation: boolean;
  residenciaEstudiantes: boolean;
  detalleHostFamily: string;
  detalleAccommodation: string;
  detalleResidencia: string;
}

export interface AccomodationDetail {
  _id: string;
  schoolId: string;
  schoolName: string;
  city: string;
  alojamiento: string;
  semanas: string;
  detalle1: string;
  detalle2: string;
  detalle3: string;
  habitacion: string;
  detalleHabitacion: string;
  bookingFee: string;
  dietaSuplementaria: string;
  detalleSuplemento: string;
  suplementoNavidad: string;
  voucherAlmuerzo: string;
  valorSemanal: string;
  disponible: string;
  suplementoVerano: string;
  suplementoInvierno: string;
  fechasSuplemento: string;
}

export interface SchoolDescription {
  _id: string;
  schoolId: string;
  nombreEscuela: string;
  ciudadEscuela: string;
  calificacion: number;
  añoFundacion: number;
  minutosAlCentro: number;
  detalleEscuela: string;
  tipoEscuela: string;
  descripcion: string;
  direccionEscuela: string;
  tipoEdificio: string;
  institucionVinculada: string;
  cursosInglesSemanas: number;
  cursoInglesEstudioTrabajo: number;
  representacion: number;
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

export interface SchoolPriceOption {
  horario: "AM" | "PM";
  precio: number;
  horarioEspecifico: string;
  horasSemana: number;
  horasDeClase: number;
  oferta?: number;
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
      refreshToken: string;
    };
  }

  interface User {
    accessToken: string;
    refreshToken: string;
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}

export interface Testimonial {
  name: string;
  flag: string;
  originCountry: string,
  destinationCountry: string,
  destinationCity: string,
  image: string,
  text: ReactNode,
}

export interface Partner {
  key: string;
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  rating: number;
  slug: string;
  embed: string;
  thumbnail: string;
  title: string;
}

export type BookingPannelProps = {
  data: Reservation | null;
  error: string;
  loading: boolean;
};

export interface Reservation {
  school: string;
  course: string;
  weeks: number;
  schedule: string;
  price: number;
};
