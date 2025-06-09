export interface ApiReservationResponse {
  course: string;
  schoolName: string;
  schedule: string;
  weeks: number;
  basePrice: number;
  enrollmentFee: number;
  materialsFee: number;
  insuranceFee: number;
  total: number;
  schoolId?: string;
}
