"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";
import {
  createReservationFromApiResponse,
} from "@/lib/reservation";
import { ReservationFormData } from "@/types/reservationForm";
import {
  fetchCourses,
  fetchReservationCalculation,
  fetchSchedulesByCourse
} from "../services/booking.services";
import { Schedule } from "@/lib/types/scheduleInfo";

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

  // const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchReservation = async () => {
      setError(false);
      setErrorMessage("");
      setLoading(true);

      // console.log('schoolId', schoolId)
      // console.log('course', course)
      // console.log('schedule', schedule)
      // console.log('weeks', weeks)

      if (!schoolId || !course || !schedule || weeks <= 0) {
        setReservation(null);
        setError(true);
        setErrorMessage("Parámetros incompletos o inválidos");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchReservationCalculation(schoolId, course, weeks, schedule, signal);

        // await delay(1000);

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

    fetchReservation();
    return () => controller.abort();
  }, [schoolId, course, weeks, schedule]);

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

  useEffect(() => {
    if (!schoolId || !course) return;

    const loadSchedules = async () => {
      try {
        setLoadingSchedules(true);
        const schedules = await fetchSchedulesByCourse(schoolId, course);
        setSchedules(schedules);
      } catch (error) {
        setErrorSchedules(error as Error);
      } finally {
        setLoadingSchedules(false);
      }
    };

    loadSchedules();
  }, [schoolId, course]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchWeeksBySchool = async () => {
      try {
        setLoadingWeeksBySchool(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/semanas/${schoolId}/${course}`);
        const json = await res.json();
        setWeeksBySchool(json.data.semanas || []);
      } catch (error) {
        setErrorWeeksBySchool(error as Error);
      } finally {
        setLoadingWeeksBySchool(false);
      }
    };

    fetchWeeksBySchool();
  }, [schoolId, course]);

  const onFormDataChange = (updated: Partial<ReservationFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const onUpdateReservation = async (updatedFormData: Partial<ReservationFormData>) => {
    // console.log('Recalculando reserva con formData:', formData);
    // console.log('Recalculando reserva con updatedFormData:', updatedFormData);

    const newFormData = { ...formData, ...updatedFormData };
    setFormData(newFormData);

    const course = newFormData.courseType ?? reservation?.courseKey;
    const weeks = newFormData.studyDuration ?? reservation?.weeks;
    const schedule = newFormData.schedule ?? reservation?.schedule;
    // const specificSchedule = newFormData.specificSchedule ?? reservation?.specificSchedule;
    const schoolId = reservation?.schoolId;

    // console.log('schedule', schedule)
    // console.log('specificSchedule', specificSchedule)

    // Solo cargar horarios si cambia el tipo de curso
    if (
      updatedFormData.courseType && 
      updatedFormData.courseType !== formData.courseType &&
      schoolId
    ) {
      const newSchedules = await fetchSchedulesByCourse(schoolId.toString(), updatedFormData.courseType);
      setSchedules(newSchedules);
    }

    if (!schoolId || !course || !weeks || !schedule) {
      console.log('Faltan parámetros para recalcular la reserva');
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
