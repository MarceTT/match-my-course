export type Schedule = {
  horario: string;
  precioMinimo: number;
};

export type ScheduleInfo = {
  list: Schedule[];
  loading: boolean;
  error: boolean;
};
