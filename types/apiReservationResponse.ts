export interface ApiReservationResponse {
  curso: string;
  escuela: string;
  horario: string;
  precio: string | number;
  semanas: string | number;
  schoolId?: string;
}
