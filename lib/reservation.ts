import type { 
  ApiReservationResponse,
  Reservation
} from "@/types";

export function buildReservationQuery(reservation: Reservation): string {
  return new URLSearchParams({
    schoolId: reservation.schoolId ?? "",
    curso: reservation.course,
    semanas: reservation.weeks.toString(),
    horario: reservation.schedule,
  }).toString();
}

export function parseReservationFromQuery(searchParams: URLSearchParams): Reservation | null {
  const schoolId = searchParams.get("schoolId");
  const school = searchParams.get("school") ?? "";
  const course = searchParams.get("curso");
  const weeks = searchParams.get("semanas");
  const schedule = searchParams.get("horario");

  if (!schoolId || !course || !weeks || !schedule) return null;

  return {
    schoolId,
    school,
    course,
    weeks: parseInt(weeks, 10),
    schedule,
  };
}

export function createReservationFromApiResponse(data: ApiReservationResponse): Reservation {
  return {
    course: data.curso,
    school: data.escuela,
    schedule: data.horario,
    price: Number(data.precio),
    weeks: Number(data.semanas),
    schoolId: data.schoolId || "",
  };
}
