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
} from "../components/services/booking.services";
import { Schedule } from "@/lib/types/scheduleInfo";
import { BookingResponse } from "@/app/lib/types";

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

        // Check if response indicates advisor contact is required (Nueva Zelanda)
        if (data && typeof data === 'object' && 'requiresAdvisor' in data) {
          setAdvisorInfo(data as BookingResponse);
          setReservation(null);
          setError(false);
          setErrorMessage("");
          return;
        }

        const reservation = createReservationFromApiResponse(data);
        setReservation(reservation);
        setAdvisorInfo(null);
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
        setCourses(coursesData.courses);
      } catch (error) {
        setErrorCourses(error as Error);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, [schoolId]);

  /**
   * Cargar los horarios
   */
  useEffect(() => {
    if (!schoolId || !course) return;

    const loadSchedules = async () => {
      try {
        setLoadingSchedules(true);
        const raw = await fetchSchedulesByCourse(schoolId, course);
        const normalized = Array.isArray(raw)
          ? raw
          : typeof raw === 'object' && raw !== null
          ? Object.values(raw as any)
          : typeof raw === 'string'
          ? raw.split(',').map((s) => ({ horario: s.trim(), precioMinimo: 0 }))
          : [];
        // Asegurar shape { horario, precioMinimo }
        const items = normalized.map((it: any) =>
          typeof it === 'string' ? { horario: it, precioMinimo: 0 } : it
        );
        setSchedules(items);
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
    const schedule = newFormData.schedule ?? reservation?.schedule;
    const schoolId = reservation?.schoolId;

    // Cargar horarios y semanas si cambia el tipo de curso
    if (
      updatedFormData.courseType && 
      updatedFormData.courseType !== formData.courseType &&
      schoolId
    ) {
      // Cargar los horarios cuando cambia el tipo de curso
      const raw = await fetchSchedulesByCourse(schoolId.toString(), updatedFormData.courseType);
      const normalized = Array.isArray(raw)
        ? raw
        : typeof raw === 'object' && raw !== null
        ? Object.values(raw as any)
        : typeof raw === 'string'
        ? raw.split(',').map((s) => ({ horario: s.trim(), precioMinimo: 0 }))
        : [];
      const items = normalized.map((it: any) =>
        typeof it === 'string' ? { horario: it, precioMinimo: 0 } : it
      );
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

      // Check if response indicates advisor contact is required (Nueva Zelanda)
      if (data && typeof data === 'object' && 'requiresAdvisor' in data) {
        setAdvisorInfo(data as BookingResponse);
        setReservation(null);
        setError(false);
        setErrorMessage("");
        return;
      }

      const reservation = createReservationFromApiResponse(data);
      setReservation(reservation);
      setAdvisorInfo(null);
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
      // Cargar los horarios cuando cambia el tipo de curso
      const newSchedules = await fetchSchedulesByCourse(schoolId.toString(), updatedFormData.courseType);
      setSchedules(newSchedules);

      // Carga semanas nuevas al cambiar curso
      const newWeeks = await fetchWeeksBySchool(schoolId.toString(), updatedFormData.courseType);
      setWeeksBySchool(newWeeks);
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

      // Check if response indicates advisor contact is required (Nueva Zelanda)
      if (data && typeof data === 'object' && 'requiresAdvisor' in data) {
        setAdvisorInfo(data as BookingResponse);
        setReservation(null);
        setError(false);
        setErrorMessage("");
        return;
      }

      const reservation = createReservationFromApiResponse(data);

      setFormData((prev) => ({
        ...prev,
        schedule: reservation.specificSchedule, // aquí se selecciona automáticamente el más barato
        studyDuration: reservation.weeks ?? 1
      }));

      setReservation(reservation);
      setAdvisorInfo(null);
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
    // New: advisor contact information for Nueva Zelanda
    advisorInfo,
    requiresAdvisor: !!advisorInfo?.requiresAdvisor,
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
