export interface Reservation {
  basePrice?: number,
  city?: string;
  course: string;
  courseKey?: string;
  enrollmentFee?: number,
  insuranceFee?: number
  logoUrl?: string;
  materialsFee?: number
  schedule: string;
  schoolId?: string;
  schoolName?: string;
  specificSchedule?: string;
  startDate?: string;
  total?: number,
  weeks: number;
  offer?: number;
  accommodation?: "si" | "no" | "posterior" | null;
  fechaLimiteReserva?: string;
  fechaTerminoReserva?: string;
  ofertaBruta?: string;
  precioBruto?: string;
};
