// Canonical SchoolDetails domain type (wide-optional DTO).
// Base shape derived from the v2 declaration (app/lib/types.ts) with correct
// boolean installations. Backend assembles fields per-endpoint, so all rich
// fields are optional here. See change: unify-school-details-type.

export interface Installations {
  _id: string;
  schoolId: string;
  nombreEscuela: string;
  ciudadEscuela: string;
  biblioteca: boolean;
  computadoresEstudiantes: boolean; // Reemplaza a laboratorioInformatica
  pizarraDigital: boolean; // Cambiado de string a boolean
  television: boolean; // Cambiado de string (tv) a boolean
  dataShow: boolean; // Nuevo campo
  calefaccion: boolean; // Cambiado de string a boolean
  extractoresAire: boolean; // Nuevo campo
  cafeteria: boolean;
  restaurante: boolean;
  salonAlmorzar: boolean; // Similar a cocinaEstudiantes
  microondas: boolean;
  refrigerador: boolean; // Cambiado de nevera
  lavaplatos: boolean; // Nuevo campo
  maquinaCafe: boolean; // Nuevo campo
  maquinaAlimentos: boolean; // Similar a maquinaExpendedora
  dispensadorAgua: boolean;
  impresoraFotocopiadora: boolean;
  freeWifi: boolean;
  bikepark: boolean; // Nuevo campo
  juegosRecreativos: boolean; // Similar a salaJuegosRecreacion
  jardin: boolean;
  terraza: boolean; // Similar a terrazaAzotea
  instalacionDeportiva: boolean; // Similar a zonaDeportiva
  aulasSillaRuedas: boolean; // Similar a accesoSillasRuedas
  wcMinusvalidos: boolean;
  ascensor: boolean; // Similar a elevators
  areaFumadores: boolean; // Nuevo campo
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

export interface SchoolPriceOption {
  horario: "AM" | "PM";
  precio: number;
  horarioEspecifico: string;
  horasSemana: number;
  horasDeClase: number;
  oferta?: number;
  semanas?: number;
}

// Canonical CursoSeo lives in ./seo (unify-seo-entry). Imported for local use
// (SchoolDetails.cursosEos below) and re-exported so consumers importing
// `CursoSeo` from @/lib/types/school keep resolving without changes.
import type { CursoSeo } from './seo';
export type { CursoSeo };

export interface CountryMetadata {
  country?: string;
  countryService?: string;
  serviceMode?: 'legacy' | 'country-service' | 'hybrid';
  features?: Record<string, boolean>;
}

export interface SchoolDetails {
  _id: string;
  name: string;
  city: string;
  logo?: string;
  mainImage?: string | null;
  galleryImages: string[];
  status: boolean;
  urlVideo?: string | null;
  country?: {
    value: string;
    label: string;
    code: string;
    flag: string;
  };
  settings?: {
    allowInstantBooking?: boolean;
    accommodationAvailable?: boolean;
    currency?: 'EUR' | 'NZD' | 'USD';
    contactOnly?: boolean;
  };
  installations?: Installations;
  qualities?: Qualities;
  nationalities?: Nationalities;
  // TODO(unify-school-details): prices are raw backend Price docs, not this flat shape — separate migration.
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
  // list endpoint returns top-level ponderado; detail endpoint nests it under qualities.
  ponderado?: number | string;
  cursosEos?: CursoSeo[];
}

export interface SchoolDetailsResponse {
  message: string;
  data: {
    school: SchoolDetails;
  } & CountryMetadata;
}

export interface SchoolDetailsSearchResponse {
  message: string;
  data: {
    schools: SchoolDetails[];
  } & CountryMetadata;
}
