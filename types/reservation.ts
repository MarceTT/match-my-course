export interface Reservation {
  schoolId?: string;
  schoolName?: string;
  course: string;
  courseKey?: string;
  city?: string;
  weeks: number;
  schedule: string;
  basePrice?: number,
  enrollmentFee?: number,
  materialsFee?: number
  insuranceFee?: number
  total?: number,
  startDate?: string;
  logoUrl?: string;
};
