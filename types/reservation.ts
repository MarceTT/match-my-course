export interface Reservation {
  schoolId?: string;
  schoolName?: string;
  course: string;
  city?: string;
  weeks: number;
  schedule: string;
  basePrice?: number,
  enrollmentFee?: number,
  materialsFee?: number
  insuranceFee?: number
  total?: number,
  starDate?: string;
  logoUrl?: string;
};
