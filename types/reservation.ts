export interface Reservation {
  schoolId?: string;
  school?: string;
  course: string;
  weeks: number;
  schedule: string;
  price?: number;
  starDate?: string;
};
