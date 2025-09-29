"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";
import {
  createReservationFromApiResponse,
} from "@/lib/reservation";
import { ReservationFormData } from "@/types/reservationForm";
import {
  fetchCheapestCourseBySchool,
  fetchCourses,
  fetchReservationCalculation,
  fetchSchedulesByCourse,
  fetchWeeksBySchool
} from "../services/booking.services";
import { Schedule } from "@/lib/types/scheduleInfo";
import { CourseKey, isValidCourse } from "@/lib/helpers/courseHelper";
import { BookingResponse } from "@/app/lib/types";

/**
 * Normaliza la respuesta del backend de horarios a un arreglo de Schedule
 * tolerante a distintos formatos (string[], objetos con distintas claves, etc.)
 */
function normalizeSchedules(input: any): Schedule[] {
  const arr = Array.isArray(input)
    ? input
    : Array.isArray(input?.data)
      ? input.data
      : Array.isArray(input?.list)
        ? input.list
        : input
  ;

  if (!Array.isArray(arr)) return [];

  const toNumber = (v: any): number => {
    if (v == null) return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  return arr
    .map((it) => {
      if (typeof it === 'string') {
        return { horario: it, precioMinimo: 0 } as Schedule;
      }
      if (typeof it === 'object' && it) {
        const horario = String(
          (it as any).horario ?? (it as any).schedule ?? (it as any).label ?? (it as any).name ?? ''
        ).trim();
        const precioMinimo = toNumber(
          (it as any).precioMinimo ?? (it as any).priceMin ?? (it as any).minPrice ?? (it as any).precio ?? (it as any).price
        );
        const ofertaVal = (it as any).oferta ?? (it as any).offer ?? (it as any).discount;
        const oferta = ofertaVal != null ? toNumber(ofertaVal) : undefined;
        if (!horario) return null;
        return { horario, precioMinimo, ...(oferta != null ? { oferta } : {}) } as Schedule;
      }
      return null;
    })
    .filter(Boolean) as Schedule[];
}

// Datos adicionales que no participan del cálculo de reserva,
// pero sí se envían al backend
type ExtraReservationData = {
  startDate?: Date;
  accommodation?: "si" | "no";
};

type UseReservationParams = {
  schoolId: string;
  course: string | null;
  weeks: number;
  schedule: string | null;
};

export function useBooking({ schoolId, course, weeks, schedule }: UseReservationParams) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // New state for handling advisor contact requirement (Nueva Zelanda)
  const [advisorInfo, setAdvisorInfo] = useState<BookingResponse | null>(null);

  const [courses, setCourses] = useState<string[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorCourses, setErrorCourses] = useState<Error | null>(null);

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [errorSchedules, setErrorSchedules] = useState<Error | null>(null);
  
  const [weeksBySchool, setWeeksBySchool] = useState<string[]>([]);
  const [loadingWeeksBySchool, setLoadingWeeksBySchool] = useState(false);
  const [errorWeeksBySchool, setErrorWeeksBySchool] = useState<Error | null>(null);

  const [formData, setFormData] = useState<Partial<ReservationFormData>>({});
  
  // Normalizador único para cualquier forma que devuelva el backend
  const normalizeSchedules = (raw: any): Schedule[] => {
    const out: Schedule[] = [];
    const pushVal = (val: any) => {
      if (!val) return;
      if (typeof val === 'string') {
        const s = val.trim();
        const forbidden = /^(legacy|country-service|hybrid)$/i.test(s);
        if (!forbidden && s.length > 0) out.push({ horario: s, precioMinimo: 0 });
        return;
      }
      if (Array.isArray(val)) {
        val.forEach(pushVal);
        return;
      }
      if (typeof val === 'object' && val !== null) {
        if ((val as any).horario) {
          out.push({ horario: String((val as any).horario), precioMinimo: Number((val as any).precioMinimo || 0) });
          return;
        }
        if (Array.isArray((val as any).list)) {
          (val as any).list.forEach(pushVal);
          return;
        }
        Object.values(val).forEach(pushVal);
      }
    };
    pushVal(raw);
    const seen = new Set<string>();
    const uniq = out.filter((it) => {
      const k = it.horario.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    return uniq.sort((a,b) => a.horario.localeCompare(b.horario, undefined, { numeric: true }));
  };

  // Helper: auto-seleccionar primer horario válido si el actual no existe y recalcular
  const ensureScheduleAndRecalc = async (items: Schedule[]) => {
    if (!items || items.length === 0) return;
    const available = new Set(items.map((i) => i.horario.toLowerCase()));
    const current = (formData.schedule || reservation?.specificSchedule || reservation?.schedule || '').toLowerCase();
    const hasCurrent = current && available.has(current);
    if (hasCurrent) return;

    const chosen = items[0].horario;
    // Actualiza selección visual
    setFormData((prev) => ({ ...prev, schedule: chosen }));

    // Recalcula reserva con el horario elegido
    try {
      const sid = reservation?.schoolId;
      const courseVal = (formData.courseType || reservation?.courseKey || course) as string;
      const weeksVal = (formData.studyDuration || reservation?.weeks || 1) as number;
      if (!sid || !courseVal || !weeksVal) return;
      setLoading(true);
      const controller = new AbortController();
      const data = await fetchReservationCalculation(String(sid), courseVal, weeksVal, chosen, controller.signal);
      if (data && typeof data === 'object' && 'requiresAdvisor' in data) {
        setAdvisorInfo(data as any);
        setReservation(null);
        setError(false);
        setErrorMessage("");
      } else {
        const r = createReservationFromApiResponse(data);
        setReservation(r);
        setAdvisorInfo(null);
        setError(false);
        setErrorMessage("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Realiza la primera carga del curso más económico.
   */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCheapestCourse = async () => {
      setError(false);
      setErrorMessage("");
      setLoading(true);

      if (!schoolId || !course) {
        setReservation(null);
        setError(true);
        setErrorMessage("Parámetros incompletos o inválidos");
        setLoading(false);
        return;
      }

      try {
        let data = null;

        if (weeks === 1) {
          data = await fetchCheapestCourseBySchool(schoolId, course, signal);

        } else {
          data = await fetchReservationCalculation(schoolId, course, weeks, schedule || 'PM', signal);
        }

        const reservation = createReservationFromApiResponse(data);
        setReservation(reservation);
        setError(false);
        setErrorMessage("");
      } catch (error) {
        console.error(error);
        setReservation(null);
        setError(true);
   
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Error al calcular reserva");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCheapestCourse();
    return () => controller.abort();
  }, [schoolId, course, weeks, schedule]);

  /**
   * Cargar los cursos
   */
  useEffect(() => {
    if (!schoolId) return;

    const loadCourses = async () => {
      try {
        setLoadingCourses(true);
        const coursesData = await fetchCourses(schoolId);
        const list = Array.isArray(coursesData?.courses)
          ? coursesData.courses
          : [];
        setCourses(list);
      } catch (error) {
        setErrorCourses(error as Error);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, [schoolId]);

  // Preseleccionar tipo de curso si viene en la ruta (slug) y aún no hay selección
  useEffect(() => {
    if (course && isValidCourse(course as any) && !formData.courseType) {
      setFormData((prev) => ({ ...prev, courseType: course as CourseKey }));
    }
  }, [course]);

  /**
   * Cargar los horarios
   */
  useEffect(() => {
    if (!schoolId || !course) return;

    const loadSchedules = async () => {
      try {
        setLoadingSchedules(true);
        const raw = await fetchSchedulesByCourse(schoolId, course);
        const items = normalizeSchedules(raw);
        setSchedules(items);
        // Auto seleccionar y recalcular si el horario actual no existe
        await ensureScheduleAndRecalc(items);
      } catch (error) {
        setErrorSchedules(error as Error);
      } finally {
        setLoadingSchedules(false);
      }
    };

    loadSchedules();
  }, [schoolId, course]);

  /**
   * Cargar las semanas
   */
  useEffect(() => {
    if (!schoolId || !course) return;


    const loadWeeks = async () => {
      try {
        setLoadingWeeksBySchool(true);
        const weeks = await fetchWeeksBySchool(schoolId, course);
        setWeeksBySchool(weeks);
        setErrorWeeksBySchool(null);
      } catch (error) {
        setErrorWeeksBySchool(error as Error);
      } finally {
        setLoadingWeeksBySchool(false);
      }
    };

    loadWeeks();
  }, [schoolId, course]);

  const onFormDataChange = (updated: Partial<ReservationFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  /**
   * Actualiza la los datos de la reserva cada vez que se 
   * modifica algún parámetro.
   */
  const onUpdateReservation = async (updatedFormData: Partial<ReservationFormData>) => {
    const newFormData = { ...formData, ...updatedFormData };
    setFormData(newFormData);

    const course = newFormData.courseType ?? reservation?.courseKey;
    const weeks = newFormData.studyDuration ?? reservation?.weeks;
    let schedule = newFormData.schedule ?? reservation?.schedule;
    if (!schedule || /^(legacy|country-service|hybrid)$/i.test(schedule)) {
      schedule = 'PM';
    }
    const schoolId = reservation?.schoolId;

    // Cargar horarios y semanas si cambia el tipo de curso
    if (
      updatedFormData.courseType && 
      updatedFormData.courseType !== formData.courseType &&
      schoolId
    ) {
      // Cargar los horarios cuando cambia el tipo de curso
      const raw = await fetchSchedulesByCourse(schoolId.toString(), updatedFormData.courseType);
      const items = normalizeSchedules(raw);
      setSchedules(items);

      // Carga semanas nuevas al cambiar curso
      const newWeeks = await fetchWeeksBySchool(schoolId.toString(), updatedFormData.courseType);
      setWeeksBySchool(newWeeks);
    }

    if (!schoolId || !course || !weeks || !schedule) {
//       console.log('Faltan parámetros para recalcular la reserva');
      return;
    }

    // console.log('Recalculando reserva con course:', course);
    // console.log('Recalculando reserva con weeks:', weeks);
    // console.log('Recalculando reserva con schedule:', schedule);
    // console.log('Recalculando reserva con schoolId:', schoolId);

    try {
      setLoading(true);

      const controller = new AbortController();
      const signal = controller.signal;
      const data = await fetchReservationCalculation(schoolId, course, weeks, schedule, signal);

      const reservation = createReservationFromApiResponse(data);
      setReservation(reservation);
      setError(false);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setReservation(null);
      setError(true);
      setErrorMessage('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Se usa cuando se cambia el selector de curso, la definición es 
   * traer el curso más barato para 1 semana. Este podría ser AM o
   * PM.
   * @param updatedFormData 
   * @returns 
   */
  const onChangeTypeOfCourse = async (updatedFormData: Partial<ReservationFormData>) => {
    const newFormData = { ...formData, ...updatedFormData };
    setFormData(newFormData);
    
    const schoolId = reservation?.schoolId;
    const course = newFormData.courseType ?? reservation?.courseKey;

    // Cargar horarios y semanas si cambia el tipo de curso
    if (
      updatedFormData.courseType && 
      updatedFormData.courseType !== formData.courseType &&
      schoolId
    ) {
      // Cargar y normalizar horarios cuando cambia el tipo de curso
      const raw = await fetchSchedulesByCourse(schoolId.toString(), updatedFormData.courseType);
      const items = normalizeSchedules(raw);
      setSchedules(items);

      // Cargar semanas nuevas al cambiar curso
      const newWeeks = await fetchWeeksBySchool(schoolId.toString(), updatedFormData.courseType);
      setWeeksBySchool(newWeeks);

      // Asegurar selección válida y coherencia de precio
      await ensureScheduleAndRecalc(items);
    }

    if (!schoolId || !course) {
//       console.log('Faltan parámetros para recalcular la reserva');
      return;
    }

    try {
      setLoading(true);

      const controller = new AbortController();
      const signal = controller.signal;
      const data = await fetchCheapestCourseBySchool(schoolId, course, signal);

      const reservation = createReservationFromApiResponse(data);

      setFormData((prev) => ({
        ...prev,
        schedule: reservation.specificSchedule, // aquí se selecciona automáticamente el más barato
        studyDuration: reservation.weeks ?? 1
      }));

      setReservation(reservation);
      setError(false);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setReservation(null);
      setError(true);
      setErrorMessage('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitReservation = async (formData: ReservationFormData, extras: ExtraReservationData = {}) => {
    if (!reservation) {
      return { success: false, message: "Reserva no inicializada" };
    }

    const reservationData = {
      ...formData,
      ...extras,
      totalPrice: reservation.total,
      city: reservation.city,
      course: reservation.course,
      weeks: reservation.weeks,
      schedule: reservation.schedule,
      schoolName: reservation.schoolName,
      offer: reservation.offer,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/email/reservation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        }
      );

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        return { success: true };
      } else {
        return { success: false, message: result.message || "Error al enviar" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  return {
    reservation,
    loading,
    error,
    errorMessage,
    submitted,
    formData,
    onFormDataChange,
    onUpdateReservation,
    onChangeTypeOfCourse,
    onSubmitReservation,
    courseInfo: {
      list: courses,
      loading: loadingCourses,
      error: !!errorCourses
    },
    scheduleInfo: {
      list: schedules,
      loading: loadingSchedules,
      error: !!errorSchedules
    },
    weeksBySchoolInfo: {
      list: weeksBySchool,
      loading: loadingWeeksBySchool,
      error: !!errorWeeksBySchool
    }
  };
}
