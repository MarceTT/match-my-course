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
}
