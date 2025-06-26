export interface ApiReservationResponse {
  basePrice: number;
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
