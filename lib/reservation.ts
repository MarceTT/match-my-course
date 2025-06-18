import type { 
  ApiReservationResponse,
  Reservation
} from "@/types";
import { Course, courseLabelToIdMap } from "./constants/courses";

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
  const schoolName = searchParams.get("school") ?? "";
  const course = searchParams.get("curso");
  const weeks = searchParams.get("semanas");
  const schedule = searchParams.get("horario");

  if (!schoolId || !course || !weeks || !schedule) return null;

  return {
    schoolId,
    schoolName,
    course,
    weeks: parseInt(weeks, 10),
    schedule,
  };
}

export function createReservationFromApiResponse(data: ApiReservationResponse): Reservation {
  const courseKey: Course | undefined = courseLabelToIdMap[data.course];

  return {
    basePrice: data.basePrice,
    course: data.course,
    courseKey,
    enrollmentFee: data.enrollmentFee,
    insuranceFee: data.insuranceFee,
    materialsFee: data.materialsFee,
    schedule: data.schedule,
    schoolId: data.schoolId || "",
    schoolName: data.schoolName,
    total: Number(data.total),
    weeks: Number(data.weeks),
    logoUrl: data.logoUrl
  };
}
