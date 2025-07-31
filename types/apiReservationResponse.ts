export interface ApiReservationResponse {
  basePrice: number;
  city: string;
  course: string;
  enrollmentFee: number;
  insuranceFee: number;
  logoUrl: string;
  materialsFee: number;
  schedule: string;
  schoolId?: string;
  schoolName: string;
  specificSchedule: string;
  total: number;
  weeks: number;
  offer?: number;
  startDate?: string;
  accommodation?: "si" | "no" | "posterior" | null;
  fechaLimiteReserva?: string | null;
  fechaTerminoReserva?: string | null;
  ofertaBruta?: string;
  precioBruto?: string;
}
