import type { 
  ApiReservationResponse,
  Reservation
} from "@/types";
import { CourseKey, courseLabelToIdMap } from "./helpers/courseHelper";

export function buildReservationQuery(reservation: Reservation): string {
  return new URLSearchParams({
    schoolId: reservation.schoolId ?? "",
    curso: reservation.course,
    semanas: reservation.weeks.toString(),
    horario: reservation.schedule,
    city: reservation.city ?? "",
    // horarioEspecifico: reservation.specificSchedule ?? ""
  }).toString();
}

export function parseReservationFromQuery(searchParams: URLSearchParams): Reservation | null {
  const schoolId = searchParams.get("schoolId");
  const schoolName = searchParams.get("school") ?? "";
  const course = searchParams.get("curso");
  const weeks = searchParams.get("semanas");
  const schedule = searchParams.get("horario");
  const city = searchParams.get("city");
  // const specificSchedule = searchParams.get("horarioEspecifico");

  if (!schoolId || !course || !weeks || !schedule || !city) return null;

  return {
    schoolId,
    schoolName,
    course,
    weeks: parseInt(weeks, 10),
    schedule,
    city,
    // specificSchedule
  };
}

export function createReservationFromApiResponse(data: ApiReservationResponse): Reservation {
  let courseKey: CourseKey | undefined = courseLabelToIdMap[data.course];
  if (!courseKey) {
    // Fallback slugify
    const s = data.course
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\+/g, ' mas ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const match = Object.values(CourseKey).find((ck) => ck === s);
    if (match) courseKey = match as CourseKey;
  }

  // console.log("data nueva de prices", data);

  return {
    basePrice: data.basePrice,
    city: data.city,
    course: data.course,
    courseKey,
    enrollmentFee: data.enrollmentFee,
    insuranceFee: data.insuranceFee,
    logoUrl: data.logoUrl,
    materialsFee: data.materialsFee,
    schedule: data.schedule,
    schoolId: data.schoolId,
    schoolName: data.schoolName,
    specificSchedule: data.specificSchedule,
    total: Number(data.total),
    weeks: Number(data.weeks),
    offer: typeof data.offer === "string" ? parseFloat(data.offer) : data.offer,
    startDate: data.startDate,
    accommodation: data.accommodation || null,
    fechaLimiteReserva: data.fechaLimiteReserva || undefined,
    fechaTerminoReserva: data.fechaTerminoReserva || undefined,
    ofertaBruta: data.ofertaBruta || undefined,
    precioBruto: data.precioBruto || undefined,
  };
}
